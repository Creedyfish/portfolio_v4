import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      // AWS icon (icons8 fallback)
      { protocol: "https", hostname: "img.icons8.com" },
      // OpenAI favicon
      { protocol: "https", hostname: "openai.com" },
      // Project OG images & screenshots hosted on Vercel
      { protocol: "https", hostname: "*.vercel.app" },
      // Scriblaheim OG image (raw GitHub)
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      // Scriblaheim live site (your own domain)
      { protocol: "https", hostname: "*.ielbanbuena.online" },
      // Mock-up project favicon
      { protocol: "https", hostname: "ie-mockup.netlify.app" },
    ],
  },
};

export default nextConfig;
