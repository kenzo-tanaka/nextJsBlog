const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins([[optimizedImages, {}]], {
  webpack: (config, { isServer }) => {
    // Module not found: Can't resolve 'fs' の対応
    // ref: https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
    // ref: https://github.com/vercel/next.js/issues/7755#issuecomment-812805708
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  env: {
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  },
});
