import type { MetadataRoute } from 'next';
import { categories, industries, products } from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/products',
    ...products.map((p) => `/products/${p.slug}`),
    ...categories.map((c) => `/categories/${c.slug}`),
    '/industries',
    ...industries.map((i) => `/industries/${i.slug}`),
    '/company',
    '/contact',
    '/privacy',
  ];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/products/') ? 0.8 : 0.6,
  }));
}
