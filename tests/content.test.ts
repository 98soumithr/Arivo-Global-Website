import { test } from 'node:test';
import assert from 'node:assert/strict';
import { products } from '../content/products';
import { categories } from '../content/categories';
import { industries } from '../content/industries';
import { applyFacetFilters, productsByIndustry } from '../lib/content';
import { validateContent, ORIGIN_PATTERN } from '../lib/validate';
import type { CategoryContent, ProductContent } from '../lib/schema';

const base = { products, categories, industries, copy: {}, imageExists: () => true };
const clone = <T>(v: T): T => structuredClone(v);

test('shipped content validates clean', () => {
  const r = validateContent(base);
  assert.deepEqual(r.errors, []);
});

test('origin language is caught anywhere in a product, including nested FAQ answers', () => {
  const p = clone(products[0]!);
  p.faqs[2]!.a = 'All elements are made in our factory under strict control.';
  const r = validateContent({ ...base, products: [p, ...products.slice(1)] });
  assert.ok(r.errors.some((e) => e.includes('our factory') && e.includes('faqs[2].a')));
});

test('origin language in page copy (home, company) is caught', () => {
  const r = validateContent({ ...base, copy: { home: { hero: { standfirst: 'We manufacture every part.' } } } });
  assert.equal(r.errors.length, 1);
});

test('origin pattern covers the spec list and ignores normal commercial voice', () => {
  for (const s of ['manufacturer', 'Manufactured', 'our plant', 'our factory', 'we produce', 'our production', 'produced to our spec'])
    assert.match(s, ORIGIN_PATTERN, s);
  for (const s of ['we supply', 'we will advise', 'made to drawing', 'plant operators', 'the tooling is held'])
    assert.doesNotMatch(s, ORIGIN_PATTERN, s);
});

test('broken related and industry slugs, empty FAQs and missing shots fail validation', () => {
  const p = clone(products[0]!) as ProductContent;
  p.related = ['no-such-product'];
  (p.industries as string[]) = ['no-such-industry'];
  p.faqs = [];
  p.images[0]!.shot = '';
  const r = validateContent({ ...base, products: [p, ...products.slice(1)] });
  for (const needle of ['related slug "no-such-product"', 'industry slug "no-such-industry"', 'faqs is empty', 'no shot description'])
    assert.ok(r.errors.some((e) => e.includes(needle)), needle);
});

test('[CONFIRM] markers are collected with their text', () => {
  const r = validateContent(base);
  assert.ok(r.confirms.some((c) => c.where === 'products/ceramic-fibre-filter-candles' && c.text === 'maximum single-piece length'));
});

test('missing images are reported, not failed', () => {
  const r = validateContent({ ...base, imageExists: (src) => src.startsWith('diagram:') });
  assert.deepEqual(r.errors, []);
  assert.equal(r.missingImages.length, products.length * 3);
});

test('every industry view has at least one product', () => {
  for (const i of industries) assert.ok(productsByIndustry(i.slug).length > 0, i.slug);
});

test('facet filters honour only facets declared on the category', () => {
  const list = products.filter((p) => p.category === 'thermal-insulation');
  // No facets declared at launch: params are ignored.
  assert.equal(applyFacetFilters(list, { fibreChemistry: 'aes-bio-soluble' }, 'thermal-insulation').length, list.length);

  const withFacet = clone(categories) as CategoryContent[];
  withFacet.find((c) => c.slug === 'thermal-insulation')!.facets = [{ key: 'fibreChemistry', label: 'Fibre', kind: 'multi' }];
  const cat = categories.find((c) => c.slug === 'thermal-insulation')!;
  const original = cat.facets;
  cat.facets = withFacet.find((c) => c.slug === 'thermal-insulation')!.facets;
  try {
    const aes = applyFacetFilters(list, { fibreChemistry: 'aes-bio-soluble' }, 'thermal-insulation');
    assert.ok(aes.length > 0 && aes.length < list.length);
    assert.ok(aes.every((p) => (p.attributes.fibreChemistry ?? []).includes('aes-bio-soluble')));
    // Undeclared keys are still ignored.
    assert.equal(applyFacetFilters(list, { customToDrawing: 'false' }, 'thermal-insulation').length, list.length);
  } finally {
    cat.facets = original;
  }
});
