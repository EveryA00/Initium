/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disable SWC minification since we're using Babel
  experimental: {
    appDir: false, // Disable app directory since we're using pages
  },
  // Ensure pages directory is properly detected
  pageExtensions: ['js', 'jsx'],
  // Disable image optimization for now
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 