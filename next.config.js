const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins([[optimizedImages, {}]], {
  webpack: (config, { isSever }) => {
    // Module not found: Can't resolve 'fs' の対応
    // ref: https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
    if (!isSever) {
      config.node = {
        fs: "empty",
      };
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
