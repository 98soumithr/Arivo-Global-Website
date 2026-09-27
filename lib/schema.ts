export type CategorySlug = 'foundry-consumables' | 'hot-gas-filtration' | 'thermal-insulation';

export type IndustrySlug =
  | 'waste-to-energy'
  | 'foundry-and-casting'
  | 'aluminium-and-non-ferrous'
  | 'glass'
  | 'cement-and-lime'
  | 'furnaces-and-process-heat';

/** Typed attribute slots. Render nothing while empty. Present from day one so that
 *  filtering, comparison and spec tables are later additions rather than rewrites. */
export interface ProductAttributes {
  fibreChemistry?: ('alumino-silicate' | 'aes-bio-soluble' | 'polycrystalline')[];
  serviceTempMinC?: number;
  serviceTempMaxC?: number;
  formFactor?: string[]; // board, section, cut part, moulded shape…
  customToDrawing?: boolean;
  [key: string]: unknown; // category-specific attributes
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ImageSlot {
  slot: 'hero' | 'detail' | 'context' | 'diagram';
  src: string;
  ratio: '4:5' | '1:1' | '3:2' | '16:9';
  shot: string; // required — describes the shot for the placeholder
  alt: string;
}

export interface ProductContent {
  slug: string; // canonical; URL is /products/[slug]
  name: string;
  descriptor: string; // one line under the name
  /** Range subtitle for the category-style card, e.g. "Ceramic fibre board — 6 densities, hot face and back-up" */
  range: string;
  category: CategorySlug; // metadata, not path
  industries: IndustrySlug[]; // drives the pre-filtered industry views
  roleInProcess: string[]; // paragraphs — the page's opening section
  whereUsed: string[];
  available: string[]; // paragraphs — capability envelope, ranges not fixed specs
  customNote: string; // "Custom sizes and geometries"
  extraSections?: { heading: string; body: string[] }[]; // e.g. Replacement elements
  faqs: FaqItem[];
  related: string[]; // slugs
  attributes: ProductAttributes;
  images: ImageSlot[];
  seo: { title: string; description: string };
}

/** A filterable facet, declared per category — never a global union of attributes. */
export interface FacetDefinition {
  key: keyof ProductAttributes & string;
  label: string;
  kind: 'multi' | 'range' | 'boolean';
}

export interface CategoryContent {
  slug: CategorySlug;
  name: string;
  /** One-line function, shown on cards and in the nav. */
  summary: string;
  /** Range subtitle for the home category card. */
  range: string;
  intro: string[];
  facets: FacetDefinition[]; // empty at launch
  seo: { title: string; description: string };
}

export interface IndustryContent {
  slug: IndustrySlug;
  name: string;
  intro: string[];
  seo: { title: string; description: string };
}
