/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
        remotePatterns: [{
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/api/images/**',
        }, ],
    },
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    },
}

module.exports = nextConfig