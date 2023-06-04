const { addons, framework } = require("@demo-libs/storybook/config/main");

module.exports = {
  stories: ["../components/**/*.stories.tsx"],
  addons,
  framework,
};
