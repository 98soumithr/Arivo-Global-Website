import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Content-Security-Policy. Next.js inlines bootstrap scripts, so script-src needs 'unsafe-inline'
 * unless every page renders dynamically with a nonce — not worth losing static rendering for.
 * Third parties allowed: Cloudflare Turnstile (script + frame), Vercel Blob client uploads.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  `connect-src 'self' https://challenges.cloudflare.com https://vercel.com https://*.blob.vercel-storage.com${isDev ? ' ws:' : ''}`,
  'frame-src https://challenges.cloudflare.com',
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

const isExport = process.env.NEXT_EXPORT === '1';

const nextConfig: NextConfig = {
  ...(isExport ? { output: 'export', basePath: '/Arivo-Global-Website' } : {}),
  images: {
    ...(isExport
      ? { loader: 'custom', loaderFile: './lib/image-loader.ts' }
      : {}),
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 80, 90],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 14400,
  },
  poweredByHeader: false,
  ...(isExport
    ? {}
    : {
        async headers() {
          return [{ source: '/:path*', headers: securityHeaders }];
        },
      }),
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
