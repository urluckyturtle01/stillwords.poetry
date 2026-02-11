import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/stillwords.poetry',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
