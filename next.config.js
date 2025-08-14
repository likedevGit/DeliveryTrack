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
  
  // Disable telemetry
  telemetry: false,
}

module.exports = nextConfig
