/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Allow React Router to work on the client side
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/api/products', // Ensure this API route works as intended
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/index.html', // Serve the React app for all other routes
      },
    ];
  },
};

export default nextConfig;
