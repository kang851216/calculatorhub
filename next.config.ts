import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Required for Cloudflare Pages
  },
  // Don't use output: 'export' — let @cloudflare/next-on-pages handle it
};

export default nextConfig;
