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
    domains: [imageHostname],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: imageHostname,
        pathname: '/api/images/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  },
};

export default nextConfig;
