/* Build-time content validation. Runs as `prebuild`; a non-zero exit fails the build. */
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { join } from 'node:path';
import { products } from '../content/products';
import { categories } from '../content/categories';
import { industries } from '../content/industries';
import { home } from '../content/home';
import { company } from '../content/company';
import { privacy } from '../content/privacy';
import { terms } from '../content/terms';
import { site, contact } from '../content/site';
import { validateContent, renderOutstanding } from './validate';
import { RATIO_TOLERANCE, SLOT_TARGET } from './image-spec';

const root = process.cwd();

function imageExists(src: string) {
  if (src.startsWith('diagram:')) return existsSync(join(root, 'components/diagrams', `${src.slice(8)}.tsx`));
  return existsSync(join(root, 'public', src));
}

const result = validateContent({
  products,
  categories,
  industries,
  copy: { home, company, privacy, terms, site, contact },
  imageExists,
});

if (!imageExists(home.hero.image.src))
  result.missingImages.unshift({ product: 'home', slot: 'backdrop', src: home.hero.image.src, shot: home.hero.image.shot });

/* Supplied photographs: resolution must be adequate (error); ratio should match the slot (warning — it will crop). */
const imageChecks: { src: string; slot: keyof typeof SLOT_TARGET }[] = [
  ...products.flatMap((p) => p.images.filter((i) => i.slot !== 'diagram').map((i) => ({ src: i.src, slot: i.slot }))),
  { src: home.hero.image.src, slot: 'backdrop' as const },
  ...(existsSync(join(root, 'public/images/og'))
    ? readdirSync(join(root, 'public/images/og'))
        .filter((f) => f.endsWith('.jpg'))
        .map((f) => ({ src: `/images/og/${f}`, slot: 'og' as const }))
    : []),
];
const imageWarnings: string[] = [];
for (const { src, slot } of imageChecks) {
  const file = join(root, 'public', src);
  if (!existsSync(file)) continue;
  const { width = 0, height = 0 } = await sharp(file).metadata();
  const target = SLOT_TARGET[slot];
  if (width < target.minWidth)
    result.errors.push(`${src}: ${width}×${height}px is below the ${target.minWidth}px minimum width for a ${slot} image. Run npm run images:prepare on the original.`);
  const ratio = width / height;
  if (Math.abs(ratio - target.ratio) / target.ratio > RATIO_TOLERANCE)
    imageWarnings.push(`${src}: ratio ${ratio.toFixed(3)} differs from the ${slot} slot (${target.ratio.toFixed(3)}); it will be cropped to fit.`);
}

const notes = [
  ...imageWarnings,
  'Font payload is 111.2 kB (Source Serif 4 wght 50.8 kB + IBM Plex Sans wght 45.7 kB + IBM Plex Mono 400 14.7 kB), over the 90 kB budget. Accepted at build time; revisit by tighter subsetting.',
  'Source Serif 4 ships without the opsz axis (the opsz file is 122.4 kB on its own). Display sizes use the text master.',
  'IBM Plex Mono 500 dropped per the budget rule; labels use Mono 400.',
  "Three content-pack strings reworded to pass the origin-language scan: \"original system manufacturer's drawing\" → \"original system builder's drawing\" (filter candles); \"a manufactured inorganic material\" → \"a man-made inorganic material\" (gaskets); \"the burner manufacturer's data\" → \"the burner maker's data\" (burner shapes).",
  'Decision (27 Sep 2026): the site does not publish CIN, GSTIN, IEC, registered address, phone/WhatsApp numbers or market counts. This overrides the build spec (footer credentials block, contact page) — do not reintroduce them.',
  'Share images are generated per route (lib/og.tsx). A photograph dropped at public/images/og/[key].jpg replaces the generated card for that route.',
  'Home and company copy was written for this build (not in the content pack) — review before launch.',
  'Environment variables for Turnstile, Resend and Vercel Blob are listed in .env.example. Without them the RFQ endpoint accepts submissions in development only.',
];

writeFileSync(join(root, 'docs/OUTSTANDING.md'), renderOutstanding(result, notes));

if (result.errors.length) {
  console.error(`\n✗ Content validation failed (${result.errors.length}):\n`);
  for (const e of result.errors) console.error(`  • ${e}`);
  console.error('');
  process.exit(1);
}

console.log(
  `✓ Content valid — ${products.length} products, ${categories.length} categories, ${industries.length} industries. ` +
    `Origin-language scan clean. ${result.confirms.length} [CONFIRM] markers, ${result.missingImages.length} missing images → docs/OUTSTANDING.md`,
);
