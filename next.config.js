/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for static hosting
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Configure trailing slash
  trailingSlash: false,
  
  // Asset prefix for static hosting
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Environmental variables
  env: {
    PROTECTED_USERNAME: process.env.PROTECTED_USERNAME,
    PROTECTED_PASSWORD: process.env.PROTECTED_PASSWORD
  }
};

module.exports = nextConfig;
