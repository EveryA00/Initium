/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // ✅ Enables proper SSR support
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/api/products',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/index.html',
      },
    ];
  },
};

export default nextConfig;
