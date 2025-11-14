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
}
module.exports = nextConfig