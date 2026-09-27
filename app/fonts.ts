import localFont from 'next/font/local';

/*
 * Measured latin-subset payloads (woff2):
 *   Source Serif 4, variable wght (no opsz axis) ...... 50.8 kB  (opsz axis: 122.4 kB)
 *   IBM Plex Sans, variable wght ...................... 45.7 kB  (static 400+500+600: 71.0 kB)
 *   IBM Plex Mono 400 ................................. 14.7 kB  (500 dropped per budget rule)
 *   Total ............................................ 111.2 kB  — over the 90 kB budget; accepted, see docs/OUTSTANDING.md
 */

export const display = localFont({
  src: [{ path: '../public/fonts/SourceSerif4-latin-wght.woff2', weight: '400 700', style: 'normal' }],
  variable: '--font-display-loaded',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

export const sans = localFont({
  src: [{ path: '../public/fonts/IBMPlexSans-latin-wght.woff2', weight: '100 700', style: 'normal' }],
  variable: '--font-sans-loaded',
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'Helvetica Neue', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

export const mono = localFont({
  src: [{ path: '../public/fonts/IBMPlexMono-latin-400.woff2', weight: '400', style: 'normal' }],
  variable: '--font-mono-loaded',
  display: 'swap',
  preload: false,
  fallback: ['Consolas', 'Menlo', 'monospace'],
  adjustFontFallback: false,
});
