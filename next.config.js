/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.droptocdn.com',
      },
    ],
  },
};

module.exports = nextConfig;
