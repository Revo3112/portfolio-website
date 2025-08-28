import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/devicons/devicon/icons/**',
      },
    ],
  },
  // Performance optimizations untuk LCP
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@react-three/fiber'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable gzip compression
  compress: true,
  // swcMinify removed - sudah default di Next.js 15
};

export default nextConfig;
