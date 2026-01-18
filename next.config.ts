import type { NextConfig } from "next";

// Extract hostname from API URL for image configuration
const getImageHostname = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
  try {
    const url = new URL(apiUrl);
    return url.hostname;
  } catch {
    return 'localhost';
  }
};

const imageHostname = getImageHostname();

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/api/images/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
};

export default nextConfig;
