import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lm-backend-omega.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lm-backend-omega.vercel.app',
        pathname: '/api/images/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lm-backend-omega.vercel.app/api',
  },
};

export default nextConfig;
