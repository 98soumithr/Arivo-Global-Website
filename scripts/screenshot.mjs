// Usage: node scripts/screenshot.mjs [baseUrl] [outDir] [...paths]
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const [base = 'http://localhost:3100', out = 'screenshots', ...paths] = process.argv.slice(2);
const routes = paths.length ? paths : ['/', '/products', '/products/ceramic-fibre-filter-candles', '/company', '/contact'];
const widths = [1440, 390];
mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const page = await browser.newPage();
for (const width of widths) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 700));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const name = `${out}/${(route === '/' ? 'home' : route.slice(1).replaceAll('/', '_'))}-${width}.png`;
    await page.screenshot({ path: name, fullPage: true });
    console.log(`${name}${overflow > 0 ? `  ⚠ horizontal overflow ${overflow}px` : ''}`);
  }
}
await browser.close();
