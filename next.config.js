/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["screendy-cdn.fra1.cdn.digitaloceanspaces.com"],
  },
};

module.exports = nextConfig;
