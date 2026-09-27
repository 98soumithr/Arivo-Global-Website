# Arivo Global — Claude Code Build Specification

**This is the single build brief.** It supersedes `arivo-build-prompt.md`.

Read alongside:
- `arivo-website-content-pack.md` — the ten product pages, written to publish
- `arivo-design-brand-system.md` v1.1 — brand identity, palette, typography, surface system, components (authoritative)

Everything below is decided. Where this document and the design system disagree on a
technical detail, this document wins — it carries corrections from research the design
system predates.

---

## 0. What changed from earlier plans, and why

Four earlier decisions were wrong and are reversed here. Flagging them so they are not
reintroduced from older files.

| Earlier decision | Now | Reason |
|---|---|---|
| Static export (`output: 'export'`) | **Not static export.** Next.js on Vercel with full `next/image` | Static export forfeits `next/image` optimisation. Images are the crux of visual quality here, and the RFQ form needs a server endpoint anyway, so static export buys nothing |
| `quality={82}` on images | **Declare `images.qualities` explicitly** | In Next.js 16 `images.qualities` defaults to `[75]` and is an **allowlist**. Any undeclared value is silently coerced to 75 |
| `priority` on the LCP image | **`loading="eager"` + `fetchPriority="high"`** | `priority` is deprecated in Next.js 16 |
| A dedicated Export & Logistics page with Incoterms | **No such page.** Export competence becomes a short section on the company page | Research found no Incoterms-explainer or export-documentation page anywhere in the sector's credible tier. Those pages are a tell of a low-end trader site. Credible suppliers lead with application depth and treat geography as a supporting layer |

---

## 1. The brief in one paragraph

Build a marketing and catalogue website for **Arivo Global Private Limited**, exporting
refractory ceramic fibre products and foundry consumables to Europe, the Gulf and Southeast
Asia. Audience: procurement managers and process engineers, plus distributors. Ten products
at launch, across three categories, **growing to a much wider range later** — the
information architecture and data model must absorb that growth without a rebuild. Visual
quality is the top priority; performance is a design constraint, not a trade-off against it.

**Hard content rule: no origin language anywhere.** Nothing on the site states or implies
where products are made or by whom. No "we manufacture", no "our plant", no "produced to our
specification". The content pack is already written to this rule — do not reintroduce origin
claims when writing homepage or company copy.

---

## 2. The decision that determines whether growth is cheap

From the catalogue research: the 10 → 500 product transition is **not a UX problem, it is a
data-model problem.** The single biggest cheap-versus-expensive fork is whether product
attributes are stored as **typed structured fields** or as free prose in a description field.

So: even though the site publishes no specification tables at launch, the content schema
carries typed attribute slots from day one. They render nothing while empty. When the range
grows and filtering becomes necessary, the facets are already derivable from existing data
rather than requiring every page to be rewritten.

Three more structural decisions that make later expansion cheap:

- **One canonical product URL**, `/products/[slug]`, never nested under category. Category is
  metadata, not path. A product can then appear under several categories, and recategorising
  does not break links or SEO.
- **Filter state in query params**, not component state, from the first implementation — even
  though no filters ship at launch.
- **Category-specific facet definitions**, never a global union of all attributes. Baymard:
  the global-union approach is exactly what breaks at scale.

---

## 3. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16**, App Router | Turbopack is default. `params`, `cookies()`, `headers()` are async-only. `middleware.ts` is now `proxy.ts`. `next lint` is removed — use ESLint directly |
| Language | TypeScript, strict | |
| Styling | **Tailwind CSS v4** | `@theme` in CSS; every token auto-exposed as a CSS custom property |
| Rendering | Server Components by default | Client components only where listed in §7 |
| Hosting | **Vercel** | Chosen for `next/image` optimisation and route handlers. Do not mix with a Cloudflare-Pages-plus-own-pipeline approach |
| Images | `next/image` with AVIF + WebP | ~20% smaller than WebP, ~50% slower to encode — acceptable at build time |
| Fonts | `next/font/local`, self-hosted IBM Plex Sans | Measure actual `.woff2` sizes; do not trust any published figure |
| Forms | Route handler → Resend, file upload to Vercel Blob | See §9 |
| Spam | **Cloudflare Turnstile, Managed mode** | Free, unlimited. WCAG 2.2 criterion 3.3.8 rules out puzzle CAPTCHAs |
| Analytics | Vercel Analytics or Plausible | Both lightweight. Not GA4 |
| Content | Typed TypeScript data files under `/content` | MDX not needed — pages are structured, not prose documents |

**Do not use:** carousel libraries, animation libraries, icon packs, a headless CMS, a search
service, or a component library. Icons are inline SVG at 1.5px stroke.

---

## 4. Information architecture

### Navigation — product-type primary, industry as tags

The research is clear that a dual-axis taxonomy should not present two equal axes. NN/g's
single-canonical-pathway and show-each-choice-once rules mean **product type is the primary
axis**; industry is a tag set that renders pre-filtered views.

```
Products          ▸ Foundry Consumables
                  ▸ Hot Gas Filtration
                  ▸ Thermal Insulation
Industries          (pre-filtered views, not a separate taxonomy)
Company
Contact
                  [ Request a quote ]
```

**Two levels at launch. Simple dropdown, not a mega menu.** The breakpoint for a mega menu is
mechanical: when a panel can no longer show its children without scrolling. At three
categories and ten products, a dropdown is correct and a mega menu is overbuilt. Build the
nav data-driven so the switch is a component swap, not an IA change.

When it does become a mega menu, from NN/g: 0.5s hover-open delay, 0.1s close delay,
top-level items must be clickable links (accessibility), and each choice appears once.

### Sitemap — 19 routes at launch

| Route | Page | Priority |
|---|---|---|
| `/` | Home | P0 |
| `/products` | All products | P0 |
| `/products/[slug]` × 10 | Product pages | P0 (3 of them), P1 (7) |
| `/categories/[slug]` × 3 | Category pages | P1 |
| `/industries/[slug]` × 6 | Pre-filtered industry views | P2 |
| `/company` | Company | P0 |
| `/contact` | Contact and RFQ | P0 |

**P0 launch set: home, all-products, three product pages, company, contact.** Seven pages.
The remaining product pages are data files against an existing template.

### Breadcrumbs

**Not at launch.** NN/g guideline 7: skip breadcrumbs on flat structures. The hierarchy is two
levels deep and the nav already communicates it. Store category in the content model so
breadcrumbs can be switched on when depth justifies them.

### Filters and search

**Neither at launch.** Ten products across three categories need no filtering, and adding it
would be visible scaffolding with nothing to hold. Build so both are cheap later:

- Typed attributes in the content model (§5)
- Filter state read from query params
- Facet definitions declared per category, not globally

Search becomes worthwhile in the low hundreds of products. Client-side over a generated JSON
index will cover that; no search service.

### Listing behaviour, for when the catalogue grows

Baymard ranks **"Load more" plus lazy loading** above pagination, which suppresses browsing,
and above infinite scroll, which produces shallow scanning and an unreachable footer. Note
that over 90% of "Load more" implementations break the back button — if implemented, push
state properly. Page sizes: 50–100 items desktop for spec-driven lists, 15–30 mobile. Never
infinite scroll.

At ten products: render them all, no pagination.

---

## 5. Content model

```ts
// lib/schema.ts

export type CategorySlug = 'foundry-consumables' | 'hot-gas-filtration' | 'thermal-insulation';

/** Typed attribute slots. Render nothing while empty. Present from day one so that
 *  filtering, comparison and spec tables are later additions rather than rewrites. */
export interface ProductAttributes {
  fibreChemistry?: ('alumino-silicate' | 'aes-bio-soluble' | 'polycrystalline')[];
  serviceTempMinC?: number;
  serviceTempMaxC?: number;
  formFactor?: string[];        // board, section, cut part, moulded shape…
  customToDrawing?: boolean;
  [key: string]: unknown;       // category-specific attributes
}

export interface FaqItem { q: string; a: string; }

export interface ImageSlot {
  slot: 'hero' | 'detail' | 'context' | 'diagram';
  src: string;
  ratio: '4:5' | '1:1' | '3:2' | '16:9';
  shot: string;                 // required — describes the shot for the placeholder
  alt: string;
}

export interface ProductContent {
  slug: string;                 // canonical; URL is /products/[slug]
  name: string;
  descriptor: string;           // one line under the name
  category: CategorySlug;       // metadata, not path
  industries: string[];         // slugs — drives the pre-filtered industry views
  roleInProcess: string[];      // paragraphs — the page's opening section
  whereUsed: string[];
  available: string[];          // paragraphs — capability envelope, ranges not fixed specs
  customNote: string;           // "Custom sizes and geometries"
  extraSections?: { heading: string; body: string[] }[];  // e.g. Replacement elements
  faqs: FaqItem[];
  related: string[];            // slugs
  attributes: ProductAttributes;
  images: ImageSlot[];
  seo: { title: string; description: string };
}
```

**Build-time validation** (`lib/validate.ts`), failing the build on:
- a `related` slug that does not resolve
- an `industries` slug that does not resolve
- an `ImageSlot` with no `shot` description
- an empty `faqs` array
- **any occurrence of origin language** in any content string. Scan for `manufactur`,
  `our plant`, `our factory`, `we produce`, `our production`, `produced to our`. This is the
  one content rule worth enforcing mechanically, because it is easy to reintroduce by
  accident when writing homepage copy.

Validation also writes `docs/OUTSTANDING.md` listing every `[CONFIRM]` marker and every
missing image, per product.

---

## 6. Design system

**All design decisions live in `arivo-design-brand-system.md` v1.1** — palette (Coast Navy,
Burgundy action colour), typography (Source Serif 4 headlines, IBM Plex Sans body, IBM Plex
Mono data), four-level surface system, spacing, components, motion and accessibility. That
file carries the Tailwind v4 `@theme` block in oklch. Do not re-derive tokens here.

Three implementation points that belong in this document:

- Fonts are **self-hosted** via `next/font/local`, never the Google Fonts CDN — LCP cost and
  GDPR exposure. Font payload budget: ≤ 90 kB after latin subsetting. Measure actual file
  sizes rather than trusting any published figure.
- Corner radius is **2px everywhere**. Set `--radius-brand: 2px` and use it for buttons,
  cards, inputs and image frames.
- Three font families is a real weight cost. If the budget is exceeded, drop IBM Plex Mono
  500 first.

## 7. Component specification

Everything is a Server Component unless listed as client.

### Layout

**`<Header>`** — 72px, `white`, 1px bottom `border`. Wordmark left, nav centre-left, "Request a
quote" right. Does not shrink, hide or blur on scroll. **Client** (mobile menu state, nav
dropdowns).

Mobile: full-height drawer, category accordions, quote CTA pinned at the bottom of the
drawer. Trap focus; close on Escape and on route change.

**`<Footer>`** — `deep-navy`. Four columns: Products (all ten), Company, Contact, and a
credentials block carrying registered address, CIN, GST, IEC, and ISO marks. Give the
credentials block real space; export-sector research found contact illegibility — no country
code, no address, no timezone — is a top-five reason overseas buyers disengage. Include the
timezone and an office-hours line.

**`<Section level={1|2|3|4}>`** — applies the surface ground, text colours and top rule for
each of the four levels. Enforces in development, throwing on violation: never two
consecutive sections at the same level; at most one level-4 per page.

**`<Container>`** — 1240px max, 32px gutter desktop / 20px mobile. `<Prose>` variant clamps
to 680px.

### Product

**`<ProductPage>`** — renders a `ProductContent`. All ten product pages are this one
component. No per-product page code.

**`<ProductCard>`** — **designed as a category card, not a product card.** This is the single
most important component decision for growth. From the design research: the card carries name,
one-line function, and a range subtitle in the form *"Ceramic fibre board — 6 densities,
hot face and back-up"*. A card built around a single fixed specification has to be redesigned
when the range widens; a card built around a range does not.

`white` ground, 1px `border`, 2px radius, 20px padding. No shadow. On hover the border
moves to `harbour` and the image scales 1.02 inside a fixed frame. That is the whole
interaction.

**`<ProductGrid>`** — 3-up desktop, 2-up tablet, 1-up mobile. CSS Grid, `minmax(0, 1fr)`.

**`<Chip>`** — industry and application tags. `white` ground, 1px `border`, `harbour`
text, 2px radius. Links to the industry view where one exists.

**`<Accordion>`** — the FAQ. Full-width rows on `border` dividers, 200ms height transition.
**Client.** Proper `button` + `aria-expanded` + `aria-controls`; first item open by default.

**`<Figure>`** — placeholder-aware image. While `src` has no file, renders a `mist` panel at
the exact final aspect ratio with the `shot` description in `caption`/`slate` and the target
filename beneath. Layout never shifts when the real image arrives, and no page can ship with
an invisible gap.

**`<Diagram>`** — inline SVG, authored per product, in theme tokens via `currentColor` and CSS
variables. Ten of these. See §8.

### Forms

**`<RfqForm>`** — **Client.** Fields on `white`, 1px `border`, 52px height, label above the
field — never placeholder-as-label. Focus: 2px `harbour` ring.

Fields: name, company, country, email, phone (optional), product (pre-selected on a product
page), message, file upload. Turnstile widget. Submit shows inline pending state, then a
confirmation that states the response-time commitment.

The research on B2B form field counts is entirely agency blogs citing each other with no
disclosed methodology, and they contradict one another — so treat field count as a judgement
call, not an evidence-backed number. The judgement here: eight fields, three of them
optional, with file upload prominent because a drawing is the single most useful thing a buyer
can send.

**`<FileDrop>`** — bordered drop zone, hint text "drawings, specifications, photographs".
Accepts pdf, dwg, dxf, step, stp, igs, jpg, png. 25 MB per file, 3 files.

### Motion

The complete budget, unchanged:

1. One page-load reveal — hero heading, descriptor and first block, fade up 12px over 500ms,
   60ms stagger. Once, on first paint.
2. Hover — 150ms ease-out on border colour, underline weight, 1.02 image scale.
3. Accordion — 200ms height.
4. Form state — pending, then confirmation.

No scroll-triggered section reveals, no parallax, no counting numbers, no marquee logo strips,
no cursor effects. `prefers-reduced-motion: reduce` disables (1) and zeroes the rest.

---

## 8. Pages

### Home

| # | Section | Level | Content |
|---|---|---|---|
| 1 | Hero | 1 | Typographic hero — headline, one-line positioning, two CTAs, one product photograph. Not a carousel: both the award-winning examples and McMaster explicitly reject hero carousels |
| 2 | Three categories | 1 | Three category cards with range subtitles |
| 3 | Industries served | 3 | Chip set linking to the pre-filtered views |
| 4 | What we do | 1 | Three short columns. Product knowledge, range, service. **No origin claims** |
| 5 | Markets and credentials | 2 | Counted presence and certification marks. RATH's pattern: "21 locations", "customers in over 50 countries" — counted, specific, verifiable. `[CONFIRM: Arivo's own figures]` |
| 6 | Enquiry band | 4 | Headline, one line, CTA |

No testimonials until real attributable ones exist. No flag strips — export research found
them a credibility negative.

### `/products`

All ten in one view, grouped by category, each a category-style card. This page must let a
buyer find their part in under five seconds. Above the grid: one short paragraph, no filters.

### `/products/[slug]`

Section order from the content pack, with surface levels:

1. Product name + descriptor — level 1
2. Role in the process — level 1 (the page's opening; leads with expertise)
3. Where it's used — level 3
4. What's available — level 1
5. Extra sections where present (e.g. Replacement elements) — level 1
6. Custom sizes and geometries — level 2
7. Common questions — level 1
8. Related products — level 2
9. Enquiry band — level 4

Images: hero in section 1, detail in section 4, diagram in section 2 or 3, context in 3.

### `/categories/[slug]` × 3

Category intro paragraph, then the product grid for that category. Thin by design — it exists
so the nav has a landing target and so the structure is ready for filters.

### `/industries/[slug]` × 6

Short paragraph on where thermal and filtration problems arise in that industry, then a
pre-filtered product grid. These are the SEO surface: buyers search "filter candles for
waste to energy", not "ceramic fibre".

### `/company`

One page, anchored sections, sticky sub-nav. **No manufacturing section.**

`#about` — who Arivo is, the range, the markets served
`#quality` — how product is inspected and what documentation accompanies an order
`#compliance` — fibre chemistry, REACH and CLP position, SDS downloads, safe handling
`#markets` — markets served, logistics competence, documentation set. Short. **Not an
Incoterms explainer page**

### `/contact`

RFQ form, WhatsApp, phone with country code and office hours, email, full registered address,
CIN, GST, IEC, and a stated response-time commitment. RATH publishes a 24-hour email
commitment; match or better it.

---

## 9. Forms and the server boundary

The form is why this is not a static export.

**Route handler** at `app/api/rfq/route.ts`:
1. Verify the Turnstile token server-side
2. Validate with zod
3. Upload files to Vercel Blob, get URLs
4. Send via Resend to Arivo, with the file URLs
5. Send an acknowledgement to the enquirer stating the response-time commitment
6. Return a typed result

Honeypot field plus a minimum-elapsed-time check in addition to Turnstile. Rate limit by IP.
Never log submitted email addresses in plaintext to a persistent store.

**Netlify Forms is ruled out** — one file per field, 8 MB total, 30s timeout. If Vercel Blob
is not wanted, Basin supports uploads on all tiers with native Turnstile.

---

## 10. Performance budget

| Metric | Target | Boundary |
|---|---|---|
| LCP | < 1.8s on 4G | Good ≤ 2.5s |
| INP | < 100ms | Good ≤ 200ms. INP has replaced FID |
| CLS | 0 | Good ≤ 0.1 |
| JS, first load | < 100 kB gzipped | |
| Fonts | ≤ 4 `.woff2`, latin subset | **Measure actual sizes; do not trust published figures** |
| Lighthouse | 95+ / 100 / 100 / 100 | Perf / A11y / Best practices / SEO |

Note honestly: no Core Web Vitals-to-conversion evidence exists for B2B lead generation —
web.dev's collection is entirely B2C. These targets are engineering discipline and a
credibility signal for European buyers, not a modelled revenue case.

### Images — the crux

```js
// next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  qualities: [70, 80, 90],     // MUST be declared — allowlist, defaults to [75]
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],  // 16 dropped by default in v16
  minimumCacheTTL: 14400,      // 4h default in v16
}
```

- Every `<Image>` gets explicit `width`/`height` or `fill` inside an aspect-ratio box. CLS of
  0 is achievable and is guaranteed by the `<Figure>` component.
- LCP image: `loading="eager"` and `fetchPriority="high"`. **Not `priority`** — deprecated.
- Everything below the fold: default lazy.
- `sizes` set per slot from the grid, never omitted. An omitted `sizes` with `fill` ships the
  largest variant to phones.
- Quality 80 for photography, 90 for the hero only.

### Fonts

`next/font/local` with IBM Plex Sans, weights 400 / 450 / 500 / 600, latin subset, `display:
swap`, preloaded. Set `adjustFontFallback` or an explicit `size-adjust` fallback so the swap
does not shift layout. Compare variable against four static instances by measured bytes and
take the smaller — do not assume variable wins at four weights.

---

## 11. SEO and metadata

- Metadata API per route, from each content file's `seo` block
- JSON-LD: `Organization` sitewide, `Product` on product pages, `FAQPage` where FAQs exist
- `app/sitemap.ts` and `app/robots.ts` generated from the route tree
- One canonical URL per product; category and industry views carry canonical tags pointing at
  themselves, with products linked rather than duplicated
- OG image per route from `/public/images/og/[slug].jpg`, placeholder until supplied
- English only at launch. The widely quoted claim that German B2B buyers reject English-only
  has no traceable methodology and should not drive a localisation decision now. Keep copy in
  data files so a second locale is a translation job, not a rebuild.

---

## 12. Accessibility

**WCAG 2.2 AA as the engineering standard.** EN 301 549 v4.1.1, which incorporates WCAG 2.2,
was published 2 September 2026. Whether a non-transacting B2B catalogue falls within European
Accessibility Act scope could not be resolved from available sources and is a question for
legal review — but building to 2.2 AA removes the question.

Specifics for the components here:
- Focus visible on every interactive element: 2px `harbour` ring, never removed
- Accordion: `button`, `aria-expanded`, `aria-controls`
- Nav dropdowns: keyboard operable, Escape closes, top-level items are real links
- Forms: label elements bound to inputs, errors linked with `aria-describedby`, error summary
  on submit
- **Turnstile Managed mode, not a puzzle CAPTCHA** — WCAG 2.2 criterion 3.3.8 Accessible
  Authentication targets cognitive-test challenges
- Any future data table: real `<table>` with `<th scope>`; locked first column and sticky
  header on mobile

---

## 13. Repository structure

```
arivo-global/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                       home
│   ├── globals.css                    @theme tokens
│   ├── products/page.tsx              all products
│   ├── products/[slug]/page.tsx       10 pages, one component
│   ├── categories/[slug]/page.tsx     3
│   ├── industries/[slug]/page.tsx     6
│   ├── company/page.tsx
│   ├── contact/page.tsx
│   ├── api/rfq/route.ts
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/    Header Footer Section Container Prose MobileNav
│   ├── product/   ProductPage ProductCard ProductGrid Chip RelatedProducts
│   ├── ui/        Button Accordion Figure Diagram Badge
│   └── forms/     RfqForm FileDrop Field Turnstile
├── content/
│   ├── products/  10 typed files
│   ├── categories/ 3
│   ├── industries/ 6
│   ├── company.ts
│   └── site.ts    nav, contact, credentials
├── lib/
│   ├── schema.ts  types
│   ├── validate.ts build-time validation + OUTSTANDING.md
│   └── seo.ts     metadata + JSON-LD helpers
├── public/
│   ├── images/    products/[slug]/  og/  company/
│   └── fonts/
└── docs/
    ├── arivo-design-system.md
    ├── arivo-website-content-pack.md
    └── OUTSTANDING.md                 generated
```

---

## 14. Build order

Stop for review after phase 3.

| Phase | Scope |
|---|---|
| 1 | Scaffold, `@theme` tokens, fonts, `Section`, `Container`, `Header`, `Footer` |
| 2 | `lib/schema.ts`, `lib/validate.ts` including the origin-language scan, one content file wired in |
| 3 | **Filter candles product page, complete.** The reference implementation. Stop and request review |
| 4 | Home, company, contact, RFQ route handler |
| 5 | Two more product pages — confirms the template holds across categories |
| 6 | Remaining seven product pages, three category pages, all-products page |
| 7 | Six industry views |
| 8 | Ten diagrams |
| 9 | SEO, JSON-LD, accessibility audit, Lighthouse, performance pass |

---

## 15. Definition of done

- `npm run build` passes with content validation green and the origin-language scan clean
- Lighthouse 95+ / 100 / 100 / 100 on the filter candles page
- CLS is 0 with every image still a placeholder
- Keyboard-only: full nav, accordion, and form submission, with focus always visible
- Adding an eleventh product requires **one data file and no component changes**
- `docs/OUTSTANDING.md` lists every `[CONFIRM]` marker and every missing image
- Blur test on every page: it is obvious what matters first, second, third
- No occurrence of "manufacture", "our plant" or "we produce" anywhere in rendered output
