import type { Metadata } from 'next';
import { site } from '@/content/site';
import type { FaqItem, ProductContent } from './schema';
import { CONFIRM_PATTERN } from './validate';

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  // Share images come from each route's opengraph-image.tsx (lib/og.tsx), which uses a supplied
  // /public/images/og/[key].jpg when present.
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.legalName,
      type: 'website',
      locale: 'en_GB',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/** Strip [CONFIRM] markers from strings bound for structured data. */
const clean = (s: string) => s.replace(CONFIRM_PATTERN, '').replace(/\s{2,}/g, ' ').trim();

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    description: site.description,
  };
}

export function productJsonLd(p: ProductContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: clean(p.seo.description),
    url: absoluteUrl(`/products/${p.slug}`),
    category: p.category,
    brand: { '@type': 'Brand', name: site.name },
    seller: { '@type': 'Organization', name: site.legalName },
  };
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: clean(f.q),
      acceptedAnswer: { '@type': 'Answer', text: clean(f.a) },
    })),
  };
}
