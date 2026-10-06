/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/admin',
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        undici: false,
      };
    }
    return config;
  },
};

export default nextConfig;
