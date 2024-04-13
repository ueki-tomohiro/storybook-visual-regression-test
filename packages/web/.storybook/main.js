const config = require("@demo-libs/storybook/config/main");

module.exports = {
  ...config,
  stories: ["../src/presentation/**/*.stories.tsx"],
};
