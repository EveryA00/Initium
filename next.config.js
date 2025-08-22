/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure pages directory is properly detected
  pageExtensions: ['js', 'jsx'],
  // Disable image optimization for now
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 