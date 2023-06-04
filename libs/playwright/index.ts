import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  timeout: 30000,
  globalTimeout: 600000,
  testDir: "./snapshot",
  snapshotDir: "./snapshot/__snapshots__",
  outputDir: "./snapshot/__output__",
  use: {
    viewport: { width: 720, height: 900 },
  },
  reporter: process.env.CI ? "line" : [["html", { outputFolder: "./snapshot/__report__" }]],
};

export default config;
