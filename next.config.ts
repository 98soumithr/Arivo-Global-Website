import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 80, 90], // MUST be declared — allowlist, defaults to [75]
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // 16 dropped by default in v16
    minimumCacheTTL: 14400, // 4h default in v16
  },
  poweredByHeader: false,
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
