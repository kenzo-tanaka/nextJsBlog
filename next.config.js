/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Module not found: Can't resolve 'fs' の対応
    // ref: https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
    if (!isServer) {
      config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    }
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    // 記事内画像の require() を URL として解決する。
    // 旧 next-optimized-images の代替（最適化は行わず URL 解決のみ）。
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|svg)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash:8][ext]",
      },
    });
    return config;
  },
  // Next 標準の静的画像インポート（{src,height,width} オブジェクトを返す）を無効化し、
  // 上記 webpack ルールで require() が URL 文字列を返すようにする。
  images: {
    disableStaticImages: true,
  },
};
