/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false,
    env: {
        BASE_IMAGE_URL: "https://assets.onedu.ro/",
        BASE_API_URL: "https://api.onedu.ro/",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
        ],
    },
    experimental: {
        workerThreads: false,
        cpus: 1,
    },
};

module.exports = nextConfig;
