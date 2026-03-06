"use strict";

const fs = require("node:fs");

/**
 * reg-local-publisher-plugin
 *
 * A reg-suit publisher plugin that skips remote fetch/publish
 * and uses pre-placed local files in workingDirs.expectedDir directly.
 *
 * Intended for CI environments where base branch screenshots are
 * already placed in .reg/expected/ before reg-suit runs.
 *
 * Based on reg-publish-github-pages-plugin by Leko:
 * https://github.com/Leko/reg-publish-github-pages-plugin
 */

class LocalPublisherPlugin {
  constructor() {
    this.name = "reg-local-publisher-plugin";
  }

  init(config) {
    this._logger = config.logger;
    this._workingDirs = config.workingDirs;
    this._noEmit = config.noEmit;
    // reportUrl can be set via plugin option or REPORT_URL env var
    this._reportUrl = (config.options && config.options.reportUrl) || process.env.REPORT_URL || "";
  }

  /**
   * fetch: expected files are already in workingDirs.expectedDir,
   * so nothing to do.
   */
  fetch(_key) {
    const { expectedDir } = this._workingDirs;
    if (!fs.existsSync(expectedDir)) {
      return Promise.reject(new Error(`[reg-local-publisher-plugin] expectedDir was not found: ${expectedDir}`));
    }
    this._logger.info(`[reg-local-publisher-plugin] Using pre-placed files in ${expectedDir}`);
    return Promise.resolve();
  }

  /**
   * publish: no remote storage to push to.
   * Returns the GitHub Pages report URL so reg-notify-github-plugin
   * can include it in the PR comment and commit status.
   */
  publish(_key) {
    this._logger.info("[reg-local-publisher-plugin] Skipped publishing (local-only mode)");
    if (this._reportUrl) {
      this._logger.info(`[reg-local-publisher-plugin] Report URL: ${this._reportUrl}`);
    }
    return Promise.resolve({ reportUrl: this._reportUrl });
  }
}

const pluginFactory = () => ({
  publisher: new LocalPublisherPlugin(),
});

module.exports = pluginFactory;
