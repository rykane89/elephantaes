import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML/CSS/JS export — drop the `out/` folder onto any static host.
  output: "export",
  images: {
    // next/image optimization needs a Node server, which static export can't run.
    // Photos are already pre-sized in /public/gallery, so this is fine.
    unoptimized: true,
    // Allow photos served from the Sanity CDN (CMS-managed content).
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
