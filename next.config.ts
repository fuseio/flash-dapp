import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  // see: https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issuecomment-1487801131
  // TODO: Replace webpack externals with turbopack equivalent
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding", "eccrypto");
    return config;
  },
};

export default nextConfig;
