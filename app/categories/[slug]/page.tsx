import { notFound } from 'next/navigation';
import { applyFacetFilters, categories, getCategory, productsByCategory } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { ListingPage } from '@/components/product/ListingPage';

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<'/categories/[slug]'>) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildMetadata({ ...category.seo, path: `/categories/${slug}` });
}

export default async function Page({ params }: PageProps<'/categories/[slug]'>) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  // Filter state is read from query params once facets are declared on the category.
  // With no facets at launch the page stays statically rendered and unfiltered.
  const list = applyFacetFilters(productsByCategory(category.slug), {}, category.slug);
  return <ListingPage eyebrow="Products" title={category.name} intro={category.intro} products={list} />;
}
