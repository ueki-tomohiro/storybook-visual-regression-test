const path = require("path");

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  core: {
    builder: "@storybook/builder-webpack5",
  },
  framework: "@storybook/react-webpack5",
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-themes",
    {
      name: "@storybook/addon-styling-webpack",
      options: {
        rules: [
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.module\.css$/,
            use: [
              "style-loader",
              {
                loader: require.resolve("css-loader"),
                options: {
                  modules: {
                    mode: "local",
                    auto: true,
                    exportGlobals: true,
                    localIdentName: "[path][name]__[local]--[hash:base64:5]",
                    namedExport: true,
                    exportLocalsConvention: "as-is",
                    exportOnlyLocals: false,
                    getJSON: ({ resourcePath, imports, exports, replacements }) => {},
                  },
                },
              },
            ],
          },
        ],
      },
    },
    "@etchteam/storybook-addon-css-variables-theme",
  ],
  webpackFinal(config) {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module?.rules,
          {
            test: /\.(ts|tsx)$/,
            loader: require.resolve("babel-loader"),
            options: {
              presets: [["react-app", { flow: false, typescript: true }]],
              plugins: [
                // use @babel/plugin-proposal-class-properties for class arrow functions
                [require.resolve("@babel/plugin-proposal-class-properties"), { loose: true }],
              ],
            },
          },
        ],
      },
      stats: {
        children: true,
      },
      resolve: {
        ...config.resolve,
        mainFields: ["browser", "module", "main"],
        extensions: [".ts", ".tsx", ".js"],
        fallback: {
          ...config.resolve?.fallback,
          os: require.resolve("os-browserify/browser"),
          tty: require.resolve("tty-browserify"),
        },
        alias: {
          ...config.resolve?.alias,
        },
      },
    };
  },
};

module.exports = config;
