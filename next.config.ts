import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.PORT === '3001' ? '.next-3001' : '.next',
  async redirects() {
    return [
      { source: '/voice-agent', destination: '/', permanent: false },
      { source: '/solutions', destination: '/#services', permanent: false },
      { source: '/architecture', destination: '/#infrastructure', permanent: false },
      { source: '/sectors', destination: '/#calculator', permanent: false },
      { source: '/methodology', destination: '/#methodology', permanent: false },
      { source: '/audit', destination: '/#pilot', permanent: false },
    ]
  },
};

export default nextConfig;
