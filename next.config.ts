import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
    proxyClientMaxBodySize: "20mb",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  allowedDevOrigins: ["192.168.31.169", "localhost"],
};

const withNextIntl = createNextIntlPlugin("./i18n/requests.ts");
export default withNextIntl(nextConfig);
