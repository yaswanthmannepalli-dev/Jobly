import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com" },
    ],
  },
  serverExternalPackages: ["@react-three/rapier"],
  turbopack: {},
};

export default nextConfig;
