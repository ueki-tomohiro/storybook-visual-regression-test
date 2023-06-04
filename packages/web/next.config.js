loadEnv(process.env.APP_ENV);

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  org: "demo",
  project: "demo-web",

  silent: true, // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true, // Optional build-time configuration options
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "ja",
  },
  transpilePackages: ["@demo/api", "@demo/web", "@demo/ui", "@demo-libs/tailwind"],
};

/**
 * @param {string} appEnv
 */
function loadEnv(appEnv = "local") {
  const env = {
    ...require(`./env/env.${appEnv}.js`),
    APP_ENV: appEnv,
  };

  Object.entries(env).forEach(([key, value]) => {
    process.env[`NEXT_PUBLIC_${key}`] = value;
  });
}
