import type { NextConfig } from "next";
import { syncPrototype } from "./scripts/sync-prototype.mjs";

// Mount the patient-app prototype at /app. Runs on `next dev` and `next build`
// (including Vercel, which invokes `next build` directly), so the marketing
// site and prototype always ship together from a single deployment.
syncPrototype();

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
