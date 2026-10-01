import path from "node:path";
import type { NextConfig } from "next";

const root = path.resolve(__dirname);

const nextConfig: NextConfig = {
   allowedDevOrigins: ['192.168.68.102'],
  poweredByHeader: false,
  // Pin the workspace root: stray lockfiles in parent folders would otherwise confuse Turbopack.
  turbopack: { root },
  outputFileTracingRoot: root,
  // next/image serves resized WebP variants of the photos in /public/images (default settings).
};

export default nextConfig;
