import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // eslint: { // Uncomment this when want to skip lint in local builds
  //   ignoreDuringBuilds: true,
  // },
  /* config options here */
  outputFileTracingIncludes: {
    '/': ['./src/lib/repositories/local/*.json'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.divine-pride.net',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'static.divine-pride.net',
        port: '',
        pathname: "**"
      }
    ],
  },
};

export default nextConfig;
