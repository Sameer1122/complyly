import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer", "pdf-parse", "mammoth", "@prisma/adapter-neon"],
};

export default nextConfig;
