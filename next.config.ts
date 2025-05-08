import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        "@prisma/client",
        "prisma",
      ]
    }
    return config
  },
};

export default nextConfig;
