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
    // Redirects or rewrites for your frontend routes
    async redirects() {
      return [
        {
          source: '/products',
          destination: '/api/products',
          permanent: false,
        },
      ];
    },
    // Ensuring all non-API routes are served correctly
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
  
