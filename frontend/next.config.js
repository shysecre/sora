/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URL: "http://localhost:443/api",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
