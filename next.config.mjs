/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.wav$/,
      use: {
        loader: "file-loader",
      },
    });
    return config;
  },
};

export default nextConfig;
