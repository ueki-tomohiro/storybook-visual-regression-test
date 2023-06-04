module.exports = {
  extends: ["stylelint-config-recommended", "stylelint-config-recess-order", "stylelint-prettier/recommended"],
  ignoreFiles: [
    ".cache/**/*.css",
    ".cache/**/*.html",
    "coverage/**/*.css",
    "coverage/**/*.html",
    "node_modules/**/*",
    "node_modules/**/*.css",
    "node_modules/**/*.html",
    "public/**/*.css",
    "public/**/*.html",
    "storybook-static/**/*.css",
    "storybook-static/**/*.html",
  ],
  rules: {
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["composes", "-webkit-line-clamp"],
      },
    ],
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "layer", "apply"],
      },
    ],
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme", "screen"],
      },
    ],
  },
};
