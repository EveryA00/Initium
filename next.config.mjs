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
    // Redirects for your frontend routes
    async redirects() {
      return [
        {
          source: '/products',
          destination: '/api/products',
          permanent: false,
        },
      ];
    },
  };
  
  export default nextConfig;
  
