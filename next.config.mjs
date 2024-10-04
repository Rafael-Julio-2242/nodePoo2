/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    }
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: "ignore-loader", // ou outra abordagem para ignorar
    });
    return config;
  },
};

export default nextConfig;
