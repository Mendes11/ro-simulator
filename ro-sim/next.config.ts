import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
