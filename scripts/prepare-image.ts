/*
 * Prepares a photograph for a slot: crops to the slot's aspect ratio (attention-based, so the
 * product stays in frame), resizes to the target width, strips all metadata (camera, GPS),
 * and writes a quality-90 progressive JPEG where the site expects it.
 *
 *   npm run images:prepare -- <source-file> <product-slug|home|og> <hero|detail|context|og> [--position=centre|attention]
 *
 * Examples
 *   npm run images:prepare -- ~/Shoot/IMG_0412.jpg ceramic-fibre-filter-candles hero
 *   npm run images:prepare -- ~/Shoot/IMG_0431.jpg home hero
 *   npm run images:prepare -- ~/Shoot/IMG_0500.jpg og crucibles
 */
import { mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import sharp from 'sharp';
import { products } from '../content/products';
import { SLOT_TARGET } from '../lib/image-spec';

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const position = process.argv.find((a) => a.startsWith('--position='))?.split('=')[1] === 'centre' ? 'centre' : sharp.strategy.attention;
const [source, target, slotArg] = args;

function fail(message: string): never {
  console.error(`✗ ${message}`);
  process.exit(1);
}

if (!source || !target || !slotArg) fail('Usage: npm run images:prepare -- <source-file> <product-slug|home|og> <hero|detail|context|og-key>');

let out: string;
let slot: keyof typeof SLOT_TARGET;
if (target === 'og') {
  slot = 'og';
  if (!/^[a-z0-9-]+$/.test(slotArg)) fail('OG key must be a route key, e.g. home, products, crucibles');
  out = `public/images/og/${slotArg}.jpg`;
} else if (target === 'home') {
  if (slotArg !== 'hero') fail('The home page has one image slot: hero (a wide, dark backdrop photograph)');
  slot = 'backdrop';
  out = 'public/images/home/hero.jpg';
} else {
  const product = products.find((p) => p.slug === target) ?? fail(`No product with slug "${target}". Slugs: ${products.map((p) => p.slug).join(', ')}`);
  const image = product.images.find((i) => i.slot === slotArg && i.slot !== 'diagram') ?? fail(`"${slotArg}" is not a photo slot. Use hero, detail or context.`);
  slot = image.slot as keyof typeof SLOT_TARGET;
  out = join('public', image.src);
}

const spec = SLOT_TARGET[slot];
const width = spec.width;
const height = Math.round(width / spec.ratio);
const input = sharp(resolve(source.replace(/^~/, process.env.HOME ?? '~'))).rotate(); // honour EXIF orientation, then drop EXIF
const meta = await input.metadata();
if ((meta.width ?? 0) < spec.minWidth) console.warn(`! Source is only ${meta.width}px wide — below the ${spec.minWidth}px minimum; it will be upscaled and look soft.`);

mkdirSync(dirname(out), { recursive: true });
const info = await input
  .resize(width, height, { fit: 'cover', position, withoutEnlargement: false })
  .jpeg({ quality: 90, progressive: true, mozjpeg: true })
  .toFile(out);

console.log(`✓ ${out} — ${info.width}×${info.height}, ${(info.size / 1024).toFixed(0)} kB, metadata stripped`);
