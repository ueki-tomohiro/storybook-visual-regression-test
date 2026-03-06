"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const {
  getAffectedPackages,
  buildReverseGraph,
  findAffectedFiles,
  extractStoryCandidates,
  selectStories,
} = require("./story-candidates");

test("getAffectedPackages: webのみ変更はwebのみ", () => {
  const result = getAffectedPackages(["packages/web/src/presentation/home/HomeView/HomeView.tsx"]);
  assert.deepEqual(result, ["web"]);
});

test("getAffectedPackages: ui変更はuiとweb", () => {
  const result = getAffectedPackages(["packages/ui/components/Button/Button.tsx"]);
  assert.deepEqual(result.sort(), ["ui", "web"]);
});

test("getAffectedPackages: libs変更はuiとweb", () => {
  const result = getAffectedPackages(["libs/dayjs/index.ts"]);
  assert.deepEqual(result.sort(), ["ui", "web"]);
});

test("getAffectedPackages: lock/package変更はuiとweb", () => {
  const packageJsonResult = getAffectedPackages(["package.json"]);
  assert.deepEqual(packageJsonResult.sort(), ["ui", "web"]);

  const lockResult = getAffectedPackages(["pnpm-lock.yaml"]);
  assert.deepEqual(lockResult.sort(), ["ui", "web"]);
});

test("buildReverseGraph/findAffectedFiles: 逆依存をBFSで辿る", () => {
  const files = [
    "packages/web/src/presentation/home/TodoItem/TodoItem.tsx",
    "packages/web/src/presentation/home/HomeView/HomeView.tsx",
    "packages/web/src/presentation/home/HomeView/HomeView.stories.tsx",
  ];
  const readFile = (file) => {
    if (file.endsWith("HomeView.tsx")) return "import { TodoItem } from '../TodoItem/TodoItem';";
    if (file.endsWith("HomeView.stories.tsx")) return "import { HomeView } from './HomeView';";
    return "";
  };

  const reverseGraph = buildReverseGraph(files, readFile);
  const affected = findAffectedFiles(["packages/web/src/presentation/home/TodoItem/TodoItem.tsx"], reverseGraph);
  assert.ok(affected.has("packages/web/src/presentation/home/HomeView/HomeView.stories.tsx"));
});

test("extractStoryCandidates: web変更で該当storyのみ抽出", () => {
  const changedFiles = ["packages/web/src/presentation/home/TodoItem/TodoItem.tsx"];
  const listFiles = () => [
    "packages/web/src/presentation/home/TodoItem/TodoItem.tsx",
    "packages/web/src/presentation/home/HomeView/HomeView.tsx",
    "packages/web/src/presentation/home/HomeView/HomeView.stories.tsx",
    "packages/web/src/presentation/edit/EditView/EditView.stories.tsx",
  ];
  const readFile = (file) => {
    if (file.endsWith("HomeView.tsx")) return "import { TodoItem } from '../TodoItem/TodoItem';";
    if (file.endsWith("HomeView.stories.tsx")) return "import { HomeView } from './HomeView';";
    return "";
  };

  const result = extractStoryCandidates(changedFiles, listFiles, readFile);
  assert.deepEqual(result, ["packages/web/src/presentation/home/HomeView/HomeView.stories.tsx"]);
});

test("extractStoryCandidates: ui変更はui/webの全storyを採用", () => {
  const changedFiles = ["packages/ui/components/Button/Button.tsx"];
  const listFiles = (dir) => {
    if (dir === "packages/ui") {
      return [
        "packages/ui/components/Button/Button.stories.tsx",
        "packages/ui/components/InputField/InputField.stories.tsx",
      ];
    }
    if (dir === "packages/web") {
      return [
        "packages/web/src/presentation/home/HomeView/HomeView.stories.tsx",
        "packages/web/src/presentation/edit/EditView/EditView.stories.tsx",
      ];
    }
    return [];
  };

  const result = extractStoryCandidates(changedFiles, listFiles, () => "");
  assert.deepEqual(result.sort(), [
    "packages/ui/components/Button/Button.stories.tsx",
    "packages/ui/components/InputField/InputField.stories.tsx",
    "packages/web/src/presentation/edit/EditView/EditView.stories.tsx",
    "packages/web/src/presentation/home/HomeView/HomeView.stories.tsx",
  ]);
});

test("selectStories: story候補0件ならpackages空でスキップ", () => {
  const result = selectStories(["packages/web/src/presentation/unknown/UnknownView/UnknownView.tsx"]);
  assert.equal(result.packages, "");
  assert.deepEqual(result.storyFiles, []);
});
