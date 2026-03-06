"use strict";

const VRT_PACKAGES = ["ui", "web"];

// changed file prefix -> affected packages
const PACKAGE_DEPS = {
  "packages/ui": ["ui", "web"],
  "packages/web": ["web"],
};

const PACKAGE_DIRS = {
  ui: "packages/ui",
  web: "packages/web",
};

module.exports = {
  VRT_PACKAGES,
  PACKAGE_DEPS,
  PACKAGE_DIRS,
};
