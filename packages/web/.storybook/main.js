const { addons, framework } = require("@demo-libs/storybook/config/main");

module.exports = {
  stories: ["../src/presentation/**/*.stories.tsx"],
  addons,
  framework,
};
