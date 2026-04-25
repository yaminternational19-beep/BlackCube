import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  output: "standalone",

  images: {
    domains: ['blackcube.ae'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blackcube.ae',
      },
    ],
  },
};

export default nextConfig;

