# Arivo Global website

Marketing and catalogue site for Arivo Global Private Limited — refractory ceramic fibre products and foundry consumables.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · hosted on Vercel.
Design and build rules: [`docs/arivo-build-spec.md`](docs/arivo-build-spec.md), [`docs/arivo-design-system.md`](docs/arivo-design-system.md). Product copy: [`docs/arivo-website-content-pack.md`](docs/arivo-website-content-pack.md).

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local development at http://localhost:3000 |
| `npm run build` | Validates content, then builds. **Fails on broken links between products, origin language, or undersized images** |
| `npm start` | Serves the production build |
| `npm run validate` | Content validation only; regenerates [`docs/OUTSTANDING.md`](docs/OUTSTANDING.md) |
| `npm test` | Unit tests (validation, filters, surface rules, enquiry schema) |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm run images:prepare` | Crops, resizes and strips metadata from a photograph for its slot (see below) |

## What is still open

[`docs/OUTSTANDING.md`](docs/OUTSTANDING.md) is regenerated on every build. It lists every `[CONFIRM]` marker (a fact that needs sign-off — these render highlighted on the site until resolved) and every photograph still to supply, with the target file path and a description of the shot.

## Adding photographs

Every image position already renders a grey placeholder at its final shape, so the layout does not move when the photograph arrives.

```bash
npm run images:prepare -- ~/Shoot/IMG_0412.jpg ceramic-fibre-filter-candles hero
npm run images:prepare -- ~/Shoot/IMG_0420.jpg ceramic-fibre-filter-candles detail
npm run images:prepare -- ~/Shoot/IMG_0431.jpg home hero
npm run images:prepare -- ~/Shoot/IMG_0500.jpg og crucibles      # optional share image
```

The script crops to the slot's shape (keeping the product in frame), resizes, removes camera and GPS metadata, and writes the file where the site expects it. Add `--position=centre` if the automatic crop misjudges the subject.

| Slot | Shape | Written at |
|---|---|---|
| `hero` | 4:5 portrait, 1600 × 2000 | `public/images/products/[slug]/hero.jpg` |
| `detail` | 1:1 square, 1400 × 1400 | `public/images/products/[slug]/detail.jpg` |
| `context` | 3:2 landscape, 1800 × 1200 | `public/images/products/[slug]/context.jpg` |
| home `hero` | 16:9 backdrop, 2400 × 1350 | `public/images/home/hero.jpg` — dark process photograph behind the headline (licensed stock acceptable) |
| `og` | 1.91:1, 1200 × 630 | `public/images/og/[key].jpg` — replaces the generated share card |

The build rejects images under 1000 px wide. Product photographs must be of the product Arivo supplies — no stock, AI-generated or competitor images (see design system §9).

## Adding a product

1. Copy a file in `content/products/` and rename it to the new slug.
2. Fill in the fields. The type in `lib/schema.ts` lists them; the build tells you what is missing.
3. Add one import line to `content/products/index.ts`.
4. Optionally add a diagram at `components/diagrams/[slug].tsx` and register it in `components/diagrams/index.tsx`. Until then a placeholder shows in its place and `docs/OUTSTANDING.md` lists it.

No page or component changes are needed. The product appears in navigation, its category, the industry views it is tagged with, the footer, the sitemap and the enquiry form's product list.

## Content rules the build enforces

- **No origin language.** Nothing may state or imply where or by whom products are made. The build fails on "manufactur…", "our plant", "our factory", "we produce", "our production", "produced to our".
- **No published identifiers.** By decision, the site does not show CIN, GSTIN, IEC, the registered address, phone or WhatsApp numbers, or counted market figures, even though the build spec mentions them.

## Enquiry form

The form posts to `app/api/rfq/route.ts`. Attached files upload from the browser straight to Vercel Blob (`app/api/rfq/upload/route.ts`), because Vercel limits request bodies to 4.5 MB and drawings can be 25 MB. Enquiries are emailed to Arivo through Resend, with an acknowledgement to the sender.

Spam protection: Cloudflare Turnstile (Managed mode, no puzzle), a hidden honeypot field, a minimum fill time and a per-connection rate limit.

## Deploying

1. Import the repository into Vercel (framework preset: Next.js).
2. Create a Blob store in the Vercel project (Storage → Blob); this sets `BLOB_READ_WRITE_TOKEN`.
3. Set the remaining variables from [`.env.example`](.env.example):
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` — Cloudflare dashboard → Turnstile → add site, Managed mode
   - `RESEND_API_KEY`, `RFQ_FROM_EMAIL` (on a domain verified in Resend), `RFQ_TO_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` — the canonical domain
4. Enable Web Analytics in the Vercel project.

Without these variables the form accepts submissions in development only; in production it tells the visitor to email instead.
