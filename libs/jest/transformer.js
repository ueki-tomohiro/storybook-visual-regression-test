const babelJest = require("babel-jest");
const babelOptions = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "current",
        },
        exclude: ["transform-regenerator"],
      },
    ],
    "@babel/preset-typescript",
    "@babel/react",
  ],
  plugins: ["babel-plugin-transform-import-meta"],
  babelrc: false,
};
module.exports = babelJest.createTransformer(babelOptions);
