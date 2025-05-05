/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // This will allow React Router to work on the client side
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
  // Redirects for API routes or other routes that you want to handle
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/api/products', // You seem to be using this as an API endpoint
        permanent: false,
      },
    ];
  },
  // Rewrites for non-API routes should use the appropriate method
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/index.html', // Serve the React app for all routes (React Router will handle it)
      },
    ];
  },
  // Enable the use of custom static files or handle custom server settings
  experimental: {
    reactRoot: true, // This enables React 18's concurrent rendering (optional but recommended)
  },
};

export default nextConfig;
