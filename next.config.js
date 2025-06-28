/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    STABILITY_API_KEY: process.env.STABILITY_API_KEY,
  },
};

module.exports = nextConfig;