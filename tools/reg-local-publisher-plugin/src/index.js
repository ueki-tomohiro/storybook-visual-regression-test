"use strict";

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
  }

  /**
   * fetch: expected files are already in workingDirs.expectedDir,
   * so nothing to do.
   */
  fetch(_key) {
    this._logger.info(`[reg-local-publisher-plugin] Using pre-placed files in ${this._workingDirs.expectedDir}`);
    return Promise.resolve();
  }

  /**
   * publish: no remote storage to push to, skip.
   */
  publish(_key) {
    this._logger.info("[reg-local-publisher-plugin] Skipped publishing (local-only mode)");
    return Promise.resolve({ reportUrl: "" });
  }
}

const pluginFactory = () => ({
  publisher: new LocalPublisherPlugin(),
});

module.exports = pluginFactory;
