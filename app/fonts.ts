import localFont from 'next/font/local';

/*
 * Measured latin-subset payloads (woff2):
 *   Fraunces, variable wght+opsz ...................... 67.4 kB
 *   Inter, variable wght .............................. 48.4 kB
 *   IBM Plex Mono 400 ................................. 14.7 kB
 *   Total ............................................ 130.5 kB
 */

export const display = localFont({
  src: [{ path: '../public/fonts/Fraunces-latin-wght.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-display-loaded',
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

export const sans = localFont({
  src: [{ path: '../public/fonts/Inter-latin-wght.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-sans-loaded',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

export const mono = localFont({
  src: [{ path: '../public/fonts/IBMPlexMono-latin-400.woff2', weight: '400', style: 'normal' }],
  variable: '--font-mono-loaded',
  display: 'optional',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
  adjustFontFallback: false,
});
