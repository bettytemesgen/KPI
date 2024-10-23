// next.config.js
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig({
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        fs: false,
        path: false,
      };

      config.ignoreWarnings = [
        {
          module: /node_modules\/graceful-fs/,
        },
        {
          module: /node_modules\/fs-extra/,
        },
      ];
    }

    return config;
  },
});
