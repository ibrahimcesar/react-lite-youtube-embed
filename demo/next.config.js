/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  // GitHub Pages uses repository name as base path
  // Set basePath only in production (GitHub Pages)
  basePath: process.env.NODE_ENV === 'production' ? '/react-lite-youtube-embed' : '',
  // Ensure images work with base path
  images: {
    unoptimized: true,
  },
  // Transpile local package to ensure React imports work correctly
  transpilePackages: ['react-lite-youtube-embed'],
}
module.exports = nextConfig