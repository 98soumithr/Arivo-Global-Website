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
  // Not preloaded: the size-adjusted Times New Roman fallback paints first without layout shift,
  // which takes 50 kB off the critical path. Sans stays preloaded for body text.
  preload: false,
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
  // optional: labels use Consolas/Menlo if the face is not ready at first paint, so the mono
  // face (which has no metric-adjusted fallback) can never shift layout.
  display: 'optional',
  preload: false,
  fallback: ['Consolas', 'Menlo', 'monospace'],
  adjustFontFallback: false,
});
