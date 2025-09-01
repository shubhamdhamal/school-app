import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "yeqhhhhm7rpnmvge.public.blob.vercel-storage.com", // <-- add this
      "blob.vercel-storage.com" // (optional, for other blobs)
    ],
  },
};

export default nextConfig;
