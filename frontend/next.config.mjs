// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

import dotenv from 'dotenv';

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const url = new URL(backendUrl);
        const origin = `${url.protocol}//${url.host}`;

        return [
            {
                // This matches all routes
                source: '/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: origin, // Use the origin derived from the backend URL
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                    {
                        key: 'Content-Range',
                        value: 'bytes : 0-9/*',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
