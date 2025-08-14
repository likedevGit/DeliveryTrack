/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable SWC for ARM compatibility
  swcMinify: false,
  
  // Experimental features
  experimental: {
    // Disable SWC compiler
    forceSwcTransforms: false,
  },
  
  // Output configuration
  output: 'standalone',
  
  // Disable ESLint during build for ARM compatibility
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
