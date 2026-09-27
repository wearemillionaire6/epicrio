import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  distDir: process.env.PORT === '3001' ? '.next-3001' : '.next',
  async redirects() {
    return [
      { source: '/voice-agent', destination: '/', permanent: false },
      { source: '/solutions', destination: '/#suite', permanent: false },
      { source: '/architecture', destination: '/#suite', permanent: false },
      { source: '/sectors', destination: '/#suite', permanent: false },
      { source: '/methodology', destination: '/#voice-receptionist', permanent: false },
      { source: '/audit', destination: '/#pilot', permanent: false },
    ]
  },
};

export default nextConfig;
