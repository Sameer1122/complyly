import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer", "pdf-parse", "mammoth", "@prisma/adapter-neon", "@neondatabase/serverless", "ws"],
};

export default nextConfig;
