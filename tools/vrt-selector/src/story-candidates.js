"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { PACKAGE_DEPS, VRT_PACKAGES, PACKAGE_DIRS } = require("./constants");

function normalizePath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function getStem(filePath) {
  return path
    .basename(filePath)
    .replace(/\.module\.css$/, "")
    .replace(/\.(tsx?|css)$/, "");
}

function walkFiles(dir) {
  const normalizedDir = normalizePath(dir);
  if (!fs.existsSync(normalizedDir)) return [];

  const results = [];
  const entries = fs.readdirSync(normalizedDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = normalizePath(path.join(normalizedDir, entry.name));
    if (entry.isDirectory()) {
      results.push(...walkFiles(fullPath));
      continue;
    }
    results.push(fullPath);
  }
  return results;
}

function listSourceFiles(dir) {
  return walkFiles(dir).filter((file) => /\.(ts|tsx|css)$/.test(file));
}

function getAffectedPackages(changedFiles) {
  const affectedPackages = new Set();

  for (const rawFile of changedFiles) {
    const file = normalizePath(rawFile);

    if (file === "package.json" || file === "yarn.lock" || file.startsWith("libs/")) {
      VRT_PACKAGES.forEach((pkg) => affectedPackages.add(pkg));
      continue;
    }

    for (const [prefix, targets] of Object.entries(PACKAGE_DEPS)) {
      if (file.startsWith(`${prefix}/`)) {
        targets.forEach((target) => affectedPackages.add(target));
      }
    }
  }

  return VRT_PACKAGES.filter((pkg) => affectedPackages.has(pkg));
}

function getFullScopePackages(changedFiles) {
  const fullScopePackages = new Set();

  for (const rawFile of changedFiles) {
    const file = normalizePath(rawFile);
    if (file === "package.json" || file === "yarn.lock" || file.startsWith("libs/")) {
      VRT_PACKAGES.forEach((pkg) => fullScopePackages.add(pkg));
      continue;
    }
    if (file.startsWith("packages/ui/")) {
      fullScopePackages.add("ui");
      fullScopePackages.add("web");
    }
  }

  return fullScopePackages;
}

function buildReverseGraph(allFiles, readFile = (filePath) => fs.readFileSync(filePath, "utf8")) {
  const reverseGraph = new Map();

  for (const file of allFiles) {
    try {
      const content = readFile(file);
      const importPaths = new Set();
      for (const match of content.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
        importPaths.add(match[1]);
      }
      for (const match of content.matchAll(/import\s+['"]([^'"]+)['"]/g)) {
        importPaths.add(match[1]);
      }

      for (const importPath of importPaths) {
        if (!importPath.startsWith(".")) continue;

        const stem = getStem(importPath);
        if (!stem || stem === "index") continue;

        if (!reverseGraph.has(stem)) {
          reverseGraph.set(stem, new Set());
        }
        reverseGraph.get(stem).add(file);
      }
    } catch {
      // skip unreadable files
    }
  }

  return reverseGraph;
}

function findAffectedFiles(changedFiles, reverseGraph) {
  const affected = new Set(changedFiles.map(normalizePath));
  const queue = [...affected];
  let queueIndex = 0;

  while (queueIndex < queue.length) {
    const current = queue[queueIndex++];
    const stem = getStem(current);
    if (!stem || stem === "index" || stem === "styles" || stem === "common") continue;

    const dependents = reverseGraph.get(stem) ?? new Set();
    for (const dependent of dependents) {
      const normalizedDependent = normalizePath(dependent);
      if (affected.has(normalizedDependent)) continue;
      affected.add(normalizedDependent);
      queue.push(normalizedDependent);
    }
  }

  return affected;
}

function extractStoryCandidates(
  changedFiles,
  listFiles = (dir) => listSourceFiles(dir),
  readFile = (filePath) => fs.readFileSync(filePath, "utf8")
) {
  const normalizedChangedFiles = changedFiles.map(normalizePath);
  const packages = getAffectedPackages(normalizedChangedFiles);
  if (packages.length === 0) return [];

  const fullScopePackages = getFullScopePackages(normalizedChangedFiles);
  const result = new Set();

  for (const pkg of packages) {
    const packageDir = PACKAGE_DIRS[pkg];
    const allFiles = listFiles(packageDir).map(normalizePath);
    const storyFiles = allFiles.filter((file) => file.endsWith(".stories.tsx"));

    if (fullScopePackages.has(pkg)) {
      storyFiles.forEach((file) => result.add(file));
      continue;
    }

    const packageChangedFiles = normalizedChangedFiles.filter((file) => file.startsWith(`${packageDir}/`));
    if (packageChangedFiles.length === 0) continue;

    const reverseGraph = buildReverseGraph(allFiles, readFile);
    const affectedFiles = findAffectedFiles(packageChangedFiles, reverseGraph);
    for (const file of affectedFiles) {
      if (file.endsWith(".stories.tsx")) {
        result.add(file);
      }
    }
  }

  return [...result].sort();
}

function selectStories(changedFiles) {
  const normalizedChangedFiles = changedFiles.map(normalizePath);
  const packages = getAffectedPackages(normalizedChangedFiles);
  if (packages.length === 0) {
    return {
      packages: "",
      storyFiles: [],
      reason: "VRT対象の変更がないためスキップ",
    };
  }

  const storyFiles = extractStoryCandidates(normalizedChangedFiles);
  if (storyFiles.length === 0) {
    return {
      packages: "",
      storyFiles: [],
      reason: "対象storyが見つからないためスキップ",
    };
  }

  return {
    packages: packages.join(","),
    storyFiles,
    reason: "差分ベースでstoryを抽出",
  };
}

module.exports = {
  getAffectedPackages,
  getFullScopePackages,
  buildReverseGraph,
  findAffectedFiles,
  extractStoryCandidates,
  selectStories,
};

if (require.main === module) {
  const changedFiles = (process.env.CHANGED_FILES || "")
    .split(/\r?\n/)
    .map((file) => file.trim())
    .filter(Boolean);

  const result = selectStories(changedFiles);
  console.log(JSON.stringify(result));
}
