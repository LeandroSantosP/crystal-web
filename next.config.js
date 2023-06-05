/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "storage.googleapis.com",
      "localhost"
    ]
  }
};

module.exports = nextConfig;
