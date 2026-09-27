import { products } from '@/content/products';
import { categories } from '@/content/categories';
import { industries } from '@/content/industries';
import type { CategorySlug, IndustrySlug, ProductContent } from './schema';

export { products, categories, industries };

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

export function productsByCategory(slug: CategorySlug) {
  return products.filter((p) => p.category === slug);
}

export function productsByIndustry(slug: IndustrySlug) {
  return products.filter((p) => p.industries.includes(slug));
}

export function relatedProducts(product: ProductContent) {
  return product.related.map((s) => getProduct(s)).filter((p): p is ProductContent => Boolean(p));
}

/** All products grouped by category, in category order — the /products view. */
export function productsGrouped() {
  return categories.map((category) => ({ category, products: productsByCategory(category.slug) }));
}

export type SearchParams = Record<string, string | string[] | undefined>;

/**
 * Filter state lives in query params from day one, even though no filter UI ships at launch.
 * Only facets declared on the category are honoured — never a global union of attributes.
 * Example: /categories/thermal-insulation?fibreChemistry=aes-bio-soluble
 */
export function applyFacetFilters(list: ProductContent[], params: SearchParams, categorySlug?: CategorySlug) {
  const facets = categorySlug ? (getCategory(categorySlug)?.facets ?? []) : [];
  return facets.reduce((acc, facet) => {
    const raw = params[facet.key];
    if (raw === undefined) return acc;
    const wanted = Array.isArray(raw) ? raw : raw.split(',');
    return acc.filter((p) => {
      const value = p.attributes[facet.key];
      if (facet.kind === 'boolean') return String(value) === wanted[0];
      if (Array.isArray(value)) return wanted.some((w) => (value as unknown[]).includes(w));
      return value !== undefined && wanted.includes(String(value));
    });
  }, list);
}
