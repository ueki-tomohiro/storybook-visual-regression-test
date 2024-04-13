const path = require("path");

/** @type { import('@storybook/types').StorybookConfig } */
module.exports = {
  core: {
    builder: "@storybook/builder-webpack5",
  },
  framework: "@storybook/react-webpack5",
  staticDirs: ["../packages/user/static", "./static"],
  addons: [
    "@storybook/addon-a11y",
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
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader");

    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options = {};
    config.module.rules[0].use[0].options.presets = [
      require.resolve("babel-preset-gatsby-package"),
      require.resolve("@babel/preset-react"),
      [require.resolve("@babel/preset-env"), { loose: true }],
    ];

    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      [require.resolve("@babel/plugin-proposal-class-properties"), { loose: true }],
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve("babel-plugin-remove-graphql-queries"),
    ];

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"];

    // Support typescript
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
        plugins: [
          // use @babel/plugin-proposal-class-properties for class arrow functions
          [require.resolve("@babel/plugin-proposal-class-properties"), { loose: true }],
          // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
          require.resolve("babel-plugin-remove-graphql-queries"),
        ],
      },
    });

    config.stats.children = true;
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { os: require.resolve("os-browserify/browser"), tty: require.resolve("tty-browserify") };
    config.resolve.alias = {
      "@storybook/addon-actions$": path.resolve(
        __dirname,
        "../../node_modules/@storybook/addon-actions/dist/index.mjs"
      ),
    };
    return config;
  },
};
