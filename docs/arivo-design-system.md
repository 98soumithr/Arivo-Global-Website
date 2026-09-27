# Arivo Global Private Limited — Design & Build System

**Base system v1.1 · September 2026**

Supersedes `arivo-brand-guidelines.md` v1.0 and `arivo-design-system.md`. This is the single
design source of truth. Hand this file, `arivo-website-content-pack.md` and
`arivo-build-spec.md` to Claude Code — nothing in the three conflicts.

**What changed from brand guidelines v1.0.** The brand identity — palette, typography,
wordmark, principles — is unchanged and remains authoritative. Added: the surface system,
spacing scale, grid, component specs beyond buttons, motion budget, accessibility floor, and
Tailwind v4 tokens. Four corrections, each marked **[v1.1]** where it appears:

| # | Correction | Reason |
|---|---|---|
| 1 | Fonts self-hosted, not Google Fonts CDN | Costs LCP (two extra origins before text renders) and creates a GDPR exposure — German courts have fined operators for Google Fonts CDN loading EU visitors' IPs |
| 2 | "Plant photos" removed from the trust and photography rules | Contradicts the site's content rule: no origin language anywhere. Packing and port photography stays |
| 3 | Shipping terms and Incoterms lose prominence, keep the mono treatment | Research across the sector found Incoterms-explainer content absent from every credible supplier and characteristic of low-tier trader sites |
| 4 | Palette expressed in `oklch` for Tailwind v4 | v4's own palette is oklch; mixing colour spaces causes drift. Hex remains the source of truth |

---

## 1. Brand principles

| Principle | What it means in design |
|---|---|
| **Power → Scale** | Large, confident headlines. Full-width navy sections. Few elements, each big enough to matter. |
| **Trust → Evidence** | Show specifications, certifications, packing and documentation up front. Numbers in the data font, never hidden. **[v1.1: "plant photos" removed — see correction 2]** |
| **Professionalism → Consistency** | One grid, one type scale, one action colour. The same rules on the website, quotations, packing lists and LinkedIn. |
| **Premium → Restraint** | Burgundy under 5% of any layout. Generous whitespace. No gold, no gradients, no stock handshakes, no clip-art globes. |

---

## 2. Colour

### 2.1 Core palette (American Coast)

| Colour | HEX | RGB | CMYK (approx.) | Role | Share |
|---|---|---|---|---|---|
| **Coast Navy** | `#192E5D` | 25 46 93 | 73 51 0 64 | Primary. Hero, header, footer, headlines on light | ~30% |
| **Harbour Blue** | `#4065A2` | 64 101 162 | 60 38 0 36 | Secondary. Links, outline buttons, icons, data highlights | ~8% |
| **Steel Blue** | `#6B93B4` | 107 147 180 | 41 18 0 29 | Graphics only. Patterns, dividers, chart fills. Never small text | ~4% |
| **Mist Grey** | `#E2E1E0` | 226 225 224 | 0 0 1 11 | Neutral. Section backgrounds, evidence strips, buttons on navy | ~15% |
| **Burgundy** | `#7E0827` | 126 8 39 | 0 94 69 51 | Action. One primary button per screen, small category labels | ≤5% |

White and Paper make up the remaining ~38%. CMYK values are reference conversions — confirm
against a printed proof.

### 2.2 Supporting tones

| Colour | HEX | Use |
|---|---|---|
| **Ink** | `#141A26` | Body text on light backgrounds |
| **Slate** | `#5B6475` | Secondary text, captions, form hints |
| **Light Steel** | `#9DB8CF` | Small text and labels on navy |
| **Deep Navy** | `#0F1C3A` | Dark sections, top utility bar, footer |
| **Paper** | `#F4F4F3` | Alternate section background, form panels |
| **White** | `#FFFFFF` | Page base, cards |
| **Burgundy hover** | `#5E061D` | Hover state for burgundy buttons |
| **Border** | `#DDDFE3` | Card borders, table rules, input outlines |

### 2.3 Verified contrast

Measured to WCAG 2.1. All v1.0 figures verified within rounding.

| Foreground | Background | Measured | Verdict | Use for |
|---|---|---|---|---|
| Coast Navy | White | 13.2 : 1 | AAA | Headlines, body, everything |
| Ink | Paper | 15.8 : 1 | AAA | Body text on alternate sections |
| Mist Grey | Coast Navy | 10.1 : 1 | AAA | Text and buttons on navy |
| White | Burgundy | 10.8 : 1 | AAA | Primary button on light |
| Burgundy | Mist Grey | 8.2 : 1 | AAA | Labels on grey sections |
| Light Steel | Coast Navy | 6.4 : 1 | AA | Small text, eyebrows on navy |
| Harbour Blue | White | 5.8 : 1 | AA | Links, outline buttons |
| Slate | White | 6.0 : 1 | AA | Secondary text |
| Slate | Paper | 5.4 : 1 | AA | Secondary text on alternate sections |
| Harbour Blue | Mist Grey | **4.47 : 1** | Large only | 18px and above only — measured marginally under 4.5 |
| Steel Blue | Coast Navy | 4.1 : 1 | Large only | Prefer Light Steel |
| Steel Blue | White | 3.3 : 1 | Never for text | Graphics only |
| Burgundy | Coast Navy | 1.2 : 1 | Never | Do not combine |

### 2.4 Colour rules

1. **Burgundy is the action colour.** "Request a quotation", the one primary button per
   screen, and small markers like category labels. Under 5% of any layout. A deep wine red,
   not an alarm red — safe in markets where bright red signals danger.
2. **Never put burgundy on navy.** Almost identical darkness (1.2 : 1). On navy, the primary
   button switches to Mist Grey with navy text.
3. **Steel Blue is for graphics.** Pattern lines, icons, dividers, chart fills. For small
   text on navy use Light Steel `#9DB8CF`.
4. **Off-white, not pure white, for large backgrounds** where possible (Paper `#F4F4F3`).
   Pure white is a mourning colour in parts of Asia; fine for cards and page base.
5. **One palette across all product categories.** Refractory, foundry and future divisions
   share these colours. Differentiate categories with photography and a small label, never
   new colours.
6. **Charts and diagrams**: Navy → Harbour Blue → Steel Blue → Mist Grey. Burgundy only to
   highlight one data point.

### 2.5 Tailwind v4 tokens **[v1.1]**

Author in `oklch`. Hex stays the source of truth in comments.

```css
@import "tailwindcss";

@theme {
  /* Core */
  --color-navy: oklch(31.2% 0.088 263.9);            /* #192E5D */
  --color-harbour: oklch(50.8% 0.106 259.9);         /* #4065A2 */
  --color-steel: oklch(64.6% 0.066 244.0);           /* #6B93B4 */
  --color-mist: oklch(91.0% 0.002 67.8);             /* #E2E1E0 */
  --color-burgundy: oklch(38.1% 0.146 15.7);         /* #7E0827 */

  /* Supporting */
  --color-burgundy-hover: oklch(31.1% 0.118 14.6);   /* #5E061D */
  --color-ink: oklch(21.8% 0.025 263.8);             /* #141A26 */
  --color-slate: oklch(50.2% 0.029 263.2);           /* #5B6475 */
  --color-light-steel: oklch(77.0% 0.044 244.1);     /* #9DB8CF */
  --color-deep-navy: oklch(23.3% 0.061 264.5);       /* #0F1C3A */
  --color-paper: oklch(96.7% 0.001 106.4);           /* #F4F4F3 */
  --color-white: oklch(100% 0 0);                    /* #FFFFFF */
  --color-border: oklch(90.3% 0.006 264.5);          /* #DDDFE3 */
  --color-navy-section: oklch(26.7% 0.076 264.9);    /* #13234A */
  --color-navy-border: oklch(35.7% 0.084 264.8);     /* #263A68 */
  --color-on-navy: oklch(94.2% 0.007 260.7);         /* #E9ECF1 */

  /* Type */
  --font-display: "Source Serif 4", Georgia, "Times New Roman", serif;
  --font-sans: "IBM Plex Sans", Arial, "Helvetica Neue", sans-serif;
  --font-mono: "IBM Plex Mono", Consolas, Menlo, monospace;

  /* Radius */
  --radius-brand: 2px;
}
```

**Pairing contract.** Every fill token ships with its hover and its legible text colour, so
a component never guesses:

```css
@theme {
  --color-burgundy-font: var(--color-white);
  --color-navy-font: var(--color-mist);
  --color-navy-hover: oklch(26.7% 0.076 264.9);      /* Deep-section navy */
  --color-mist-font: var(--color-navy);
  --color-paper-font: var(--color-ink);
  --color-harbour-hover: var(--color-navy);
}
```

---

## 3. Surface system **[v1.1 — new]**

Four grounds, used in sequence down a page. Each change is a visual breath; this is what
gives a long page rhythm without decoration.

| Level | Ground | Text | Content type |
|---|---|---|---|
| 1 | White `#FFFFFF` | Ink | Primary content — hero, product detail, prose |
| 2 | Paper `#F4F4F3` | Ink | Structured comparison — ranges, cards, grouped content |
| 3 | Mist Grey `#E2E1E0` | Ink | Context and evidence — applications, certifications, industries |
| 4 | Coast Navy `#192E5D` | Mist Grey | Call to action. **Maximum one per page**, immediately before the footer |

Cards inside levels 2 and 3 sit on **White** with a 1px `Border` — that is what makes them
read as raised. Never a shadow.

**Rules.** Never two consecutive sections on the same level. Never level 4 anywhere but the
final section before the footer. The footer is Deep Navy `#0F1C3A`, distinct from the level-4
band above it.

On level 4, the primary button inverts to Mist Grey with navy text (colour rule 2).

---

## 4. Typography

### 4.1 Typefaces

| Role | Typeface | Weights |
|---|---|---|
| **Headlines (voice)** | **Source Serif 4** | 600, 400, 400 italic; optical size 8–60 |
| **Body and UI (workhorse)** | **IBM Plex Sans** | 400, 500, 600 |
| **Data (evidence)** | **IBM Plex Mono** | 400, 500 |

Source Serif 4 is a transitional serif in the tradition of long-established institutions —
authority and permanence — with optical sizing that stays sharp at 60px and sturdy at 20px,
covering Latin, Cyrillic, Greek and Vietnamese. IBM Plex Sans is built for enterprise:
neutral, technical, with a clear 1 / l / I distinction for specs and part numbers, and
matching Arabic, Devanagari, Thai, Japanese and Korean families for localised pages. IBM Plex
Mono shares Plex Sans's skeleton, so data sits naturally beside body text.

All three are SIL Open Font License. No licence fees per site or per market.

### 4.2 Self-hosting **[v1.1 — correction 1]**

**Do not use the Google Fonts CDN.** Self-host via `next/font/local`.

```ts
// app/fonts.ts
import localFont from 'next/font/local';

export const display = localFont({
  src: [{ path: '../public/fonts/SourceSerif4-VF.woff2', style: 'normal' }],
  variable: '--font-display-loaded',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
});
```

Requirements:
- Latin subset only for the English site. Cyrillic, Greek and Vietnamese subsets load only
  on localised routes, when those exist.
- Source Serif 4 as the variable font with the `opsz` axis; Plex Sans and Plex Mono compared
  variable-versus-static by **measured** bytes, smaller wins. Do not assume.
- `display: swap`, preload the two faces used above the fold (display + sans). Mono is
  below-fold on most pages and need not preload.
- `adjustFontFallback` or an explicit `size-adjust` so the swap does not shift layout.
- **Measure the actual `.woff2` sizes.** No published figure for these files was verifiable;
  treat any number you have not measured as unknown.

Three families is a real weight cost on a site where speed is a credibility signal. Budget:
**≤ 90 kB total font payload** after subsetting. If it exceeds that, drop Plex Mono 500
before dropping anything else.

Fallbacks for email and Office documents: Georgia / Arial / Consolas as listed in §2.5.

### 4.3 Type scale

| Style | Font · weight | Desktop | Mobile | Tracking |
|---|---|---|---|---|
| **Display** | Source Serif 4 · 600 · opsz 60 | 64 / 68 | 40 / 44 | −1% |
| **H1** | Source Serif 4 · 600 | 48 / 54 | 34 / 40 | −1% |
| **H2** | Source Serif 4 · 600 | 36 / 42 | 28 / 34 | −0.5% |
| **H3** | Source Serif 4 · 600 | 26 / 32 | 22 / 28 | 0 |
| **H4** | IBM Plex Sans · 600 | 20 / 28 | 18 / 26 | 0 |
| **Body large** | IBM Plex Sans · 400 | 19 / 30 | 17 / 28 | 0 |
| **Body** | IBM Plex Sans · 400 | 17 / 28 | 16 / 26 | 0 |
| **Small** | IBM Plex Sans · 400 | 14 / 22 | 14 / 22 | 0 |
| **Label** | IBM Plex Mono · 500 · ALL CAPS | 12 / 16 | 11 / 16 | +14% |
| **Data** | IBM Plex Mono · 400 | 14 / 22 | 13 / 20 | 0 |
| **Button** | IBM Plex Sans · 600 | 16 | 15 | 0 |

Sizes in pixels.

### 4.4 Typography rules

1. **Two fonts plus one for data. Never add a fourth.**
2. **Headlines in Source Serif 4 Semibold.** Italic for one emphasised phrase at most.
3. **Body text 60–75 characters per line.** Clamp prose containers to 680px.
4. **Every spec number goes in IBM Plex Mono:** densities, temperatures, dimensions, HS
   codes, lead times, certificate numbers, IEC/GSTIN. **[v1.1: Incoterms and MOQ keep the
   mono treatment where they appear, but see correction 3 — they are not given prominence]**
5. **Labels and eyebrows** are IBM Plex Mono Medium, all caps, +14% tracking, preceded by a
   28 × 2px burgundy rule (Steel Blue on navy). One per section at most.
6. **Sentence case** for headlines and buttons.
7. **Plain English.** Written for a procurement manager reading in a second language: short
   sentences, specific numbers over adjectives, no idioms.

### 4.5 Localised pages

| Market | Headlines | Body |
|---|---|---|
| English, European languages | Source Serif 4 | IBM Plex Sans |
| Russian / CIS, Greek, Vietnamese | Source Serif 4 | IBM Plex Sans |
| Arabic | IBM Plex Sans Arabic | IBM Plex Sans Arabic |
| Hindi (Devanagari) | IBM Plex Sans Devanagari | IBM Plex Sans Devanagari |
| Thai | IBM Plex Sans Thai | IBM Plex Sans Thai |

English only at launch. Keep all copy in typed data files so a second locale is a translation
job, not a rebuild.

### 4.6 Fonts considered and rejected

Marcellus — one weight, no Cyrillic. Newsreader — no Cyrillic, more editorial than corporate.
Playfair Display — overused, thin strokes break at small sizes. Montserrat / Poppins — generic
and common on template exporter sites. Inter — excellent but ubiquitous. Söhne, GT Sectra —
licence cost per site and market; revisit once established.

---

## 5. Space and grid **[v1.1 — new]**

4px base. Generous section rhythm is where the premium feel lives.

| Token | Desktop | Mobile |
|---|---|---|
| `section` | 128px | 72px |
| `block` | 80px | 48px |
| `group` | 40px | 28px |
| `element` | 20px | 16px |
| `tight` | 12px | 12px |

**Vertical space between two sections is always `section`.** No exceptions. Inconsistent
section padding is the commonest reason a page reads as cheap, and it is invisible until you
scroll past three sections in a row.

12 columns, 24px gutters, **left-aligned throughout**. No centred body text — it undoes the
authority the serif is buying. Content column max 1240px; prose 680px. Page gutter 32px
desktop, 20px mobile.

Product pages repeat one asymmetric split: **7 columns content, 5 columns image.** The
repetition creates rhythm; alternating layout every section reads as restless.

---

## 6. Components

### 6.1 Buttons

| Button | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary (on light) | Burgundy | White | none | "Request a quotation" — one per screen |
| Primary hover | `#5E061D` | White | none | |
| Primary (on navy) | Mist Grey | Coast Navy | none | Main action in navy sections |
| Secondary | Coast Navy | White | none | "Download catalogue" |
| Tertiary / outline | White | Harbour Blue | 1px Harbour Blue | "View products" |
| Ghost (on navy) | Transparent | Paper | 1px `rgba(244,244,243,0.4)` | Secondary action on navy |

Padding 14px / 28px. **Corner radius 2px everywhere** — buttons, cards, inputs, image frames.

### 6.2 Cards **[v1.1 — new]**

**Built as category cards, not product cards.** This is the most important component decision
for growth: the card carries name, one-line function, and a **range** subtitle — *"Ceramic
fibre board — 6 densities, hot face and back-up"*. A card designed around one fixed
specification has to be redesigned when the range widens; a card designed around a range does
not.

White ground, 1px `Border`, 2px radius, 20px padding. No shadow, no hover lift. On hover the
border moves to Harbour Blue and the image scales 1.02 inside a fixed frame. That is the whole
interaction.

Grid: 3-up desktop, 2-up tablet, 1-up mobile. CSS Grid with `minmax(0, 1fr)`.

### 6.3 Header and footer **[v1.1 — new]**

**Header** — 72px, White, 1px bottom `Border`. Wordmark left, nav centre-left, "Request a
quotation" right. Does not shrink, hide or blur on scroll. Client component for menu state.

Mobile: full-height drawer, category accordions, quote CTA pinned at the drawer foot. Focus
trapped; closes on Escape and on route change.

**Footer** — Deep Navy `#0F1C3A`. Four columns: Products, Company, Contact, and a credentials
block carrying registered address, CIN, GST, IEC and ISO marks. Give the credentials block
real space — export research found contact illegibility (no country code, no address, no
timezone) among the top reasons overseas buyers disengage. Include timezone and office hours.

### 6.4 Chips, accordion, figure **[v1.1 — new]**

**Chip** (industries, applications) — White ground, 1px `Border`, Harbour Blue text, 2px
radius, 8px / 14px padding. Links where a target exists.

**Accordion** (FAQ) — full-width rows on `Border` dividers, 200ms height transition. Real
`button` with `aria-expanded` and `aria-controls`. First item open.

**Figure** — placeholder-aware. While no file exists at `src`, renders a Mist Grey panel at
the exact final aspect ratio with the required shot described in Small / Slate and the target
filename beneath. Layout never shifts when the real image lands, and no page ships with an
invisible gap.

### 6.5 Forms **[v1.1 — new]**

Fields on White, 1px `Border`, 2px radius, 52px height, label above the field — never
placeholder-as-label. Focus: 2px Harbour Blue ring, never removed.

File upload is a bordered drop zone hinting "drawings, specifications, photographs". It is the
most important field on the site and should look like it.

Spam protection: **Cloudflare Turnstile, Managed mode** — WCAG 2.2 criterion 3.3.8 rules out
puzzle CAPTCHAs. Plus a honeypot and a minimum-elapsed-time check.

### 6.6 Data tables

Real `<table>` with `<th scope>`. Values in Data (Plex Mono 400) right-aligned on a consistent
axis so digits stack. Header row in Label with a 1px Navy underline. Row separator 1px
`Border`. Alternate row fill Paper on tables over eight rows. Mobile: locked first column,
horizontal scroll with a fade mask and an arrow affordance.

---

## 7. Motion **[v1.1 — new]**

The complete budget for the site:

1. **One page-load reveal.** Hero headline, standfirst and first block fade up 12px over
   500ms with a 60ms stagger. Once, on first paint. Never repeated on scroll.
2. **Hover.** 150ms ease-out on border colour, underline weight, and the 1.02 image scale.
3. **Accordion.** 200ms height.
4. **Form state.** Pending, then confirmation.

That is the list. No scroll-triggered section reveals, no parallax, no counting numbers, no
marquee logo strips, no cursor effects. Per-section fade-and-slide entrances are the clearest
generated-page signature and make long pages tiring to re-read.

`prefers-reduced-motion: reduce` disables (1) and zeroes the rest.

---

## 8. Wordmark

Until a logo is designed.

| Element | Setting |
|---|---|
| **ARIVO** | Source Serif 4 Semibold, ALL CAPS, letter-spacing 0.16em |
| **Rule** | 2px line, ~1.1× the height of the "A" wide. Burgundy on light, Steel Blue on navy |
| **GLOBAL PRIVATE LIMITED** | IBM Plex Sans Medium, 20% of ARIVO's size, letter-spacing 0.38em |
| **Horizontal (header)** | ARIVO · thin vertical divider · "GLOBAL / PRIVATE LIMITED" on two lines |
| **Clear space** | Equal to the height of the "A" on all sides |
| **Minimum size** | ARIVO 18px tall on screen, 6mm in print. Below that, "ARIVO GLOBAL" on one line |
| **Colours** | Navy on White or Mist Grey. White or Mist on Navy |

**Don't** stretch or squash it, set it in burgundy on navy, retype it in another font, or add
shadows, outlines or effects.

---

## 9. Graphics and photography

- **Meridian lines** — hairline longitude arcs and latitude lines in Steel Blue at 25–40%
  opacity, cropped off one edge. Heroes, section breaks, presentation covers, the back of
  business cards. Never behind body text.
- **Burgundy rule** — 28 × 2px, before section labels and under the wordmark. Once per section
  at most.
- **Photography** **[v1.1 — correction 2]** — product, packing and ports. Cool, slightly
  desaturated grade with deep shadows, consistent across all categories. No stock handshakes,
  globes or skyscrapers. **No plant, kiln or QC-lab imagery** — it implies production origin,
  which the site's content rule excludes.
- **Product shot direction** — plain seamless off-white ground close to Paper, one large soft
  key light from above left, close enough that surface texture reads. No people in product
  shots. Keep registers separate: product is clean studio, context is industrial. Never mix
  them in one frame.
- **Nothing AI-generated, nothing from a stock library, for product shots.** Using a
  competitor's product photograph is litigated, not theoretical — *Flowserve v. Hallmark Pump*
  produced an injunction, $20,000 statutory damages at $10,000 per image, and $75,000 in fees,
  brought as copyright **and** Lanham Act false advertising. Licensed stock is acceptable for
  context and environment shots only.

---

## 10. Accessibility **[v1.1 — new]**

**WCAG 2.2 AA as the engineering standard.** EN 301 549 v4.1.1, incorporating WCAG 2.2, was
published 2 September 2026. Whether a non-transacting B2B catalogue falls within European
Accessibility Act scope is a question for legal review — building to 2.2 AA removes it.

Not announced anywhere on the site, simply true: 2px Harbour Blue focus ring on every
interactive element and never removed; full keyboard operability; correct heading order; alt
text on every figure; labels bound to inputs with errors linked by `aria-describedby`; nav
dropdowns keyboard-operable with Escape to close and clickable top-level links; Turnstile
Managed mode rather than a puzzle challenge.

Respect the contrast table in §2.3 as a hard constraint, particularly the three "never for
text" and "large only" rows.

---

## 11. Pre-ship check **[v1.1 — new]**

- Blur the page. Is it obvious what matters first, second, third? If everything has the same
  weight, the hierarchy is undecided.
- Is burgundy above 5% of the layout anywhere? Is there more than one primary button per
  screen?
- Is burgundy ever on navy? Is Steel Blue ever used for small text?
- Are two consecutive sections on the same surface level? Is there more than one level-4 band?
- Is section spacing identical between every pair of sections? Measure, don't eyeball.
- Do all data values in a column align on one vertical axis?
- Is anything animating that the user did not trigger?
- Does any rendered text imply where product is made?
- Remove one element. If the page is not worse, leave it removed.

---

## 12. Quick reference

```
COLOURS                                  FONTS
Coast Navy     #192E5D  primary          Headlines  Source Serif 4 · 600
Harbour Blue   #4065A2  links, focus     Body / UI  IBM Plex Sans · 400/500/600
Steel Blue     #6B93B4  graphics only    Data       IBM Plex Mono · 400/500
Mist Grey      #E2E1E0  sections L3
Burgundy       #7E0827  action ≤5%       Radius 2px · Sentence case
Paper          #F4F4F3  sections L2      Left-aligned · 680px prose
Ink            #141A26  body text
Slate          #5B6475  secondary        Never burgundy on navy
Light Steel    #9DB8CF  text on navy     Never Steel Blue for small text
Deep Navy      #0F1C3A  footer           Fonts self-hosted, never CDN

SURFACES            SPACE              MOTION
L1 White            section  128 / 72   1 page-load reveal
L2 Paper            block     80 / 48   2 hover 150ms
L3 Mist Grey        group     40 / 28   3 accordion 200ms
L4 Navy (one max)   element   20 / 16   4 form state
```

*Arivo Global Private Limited · Design & build system · v1.1*
