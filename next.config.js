/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_IMAGE_URL: "https://assets.onedu.ro/",
        BASE_API_URL: "http://localhost:5000/",
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
