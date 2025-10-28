import type { NextConfig } from "next";

// Extract hostname from API URL for image configuration
const getImageHostname = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lm-backend-omega.vercel.app/api';
  try {
    const url = new URL(apiUrl);
    return url.hostname;
  } catch {
    return 'lm-backend-omega.vercel.app';
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
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lm-backend-omega.vercel.app/api',
  },
};

export default nextConfig;
