import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages:['three'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

export default nextConfig;
