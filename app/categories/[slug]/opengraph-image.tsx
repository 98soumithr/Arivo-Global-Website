export const dynamic = "force-static";
import { categories, getCategory } from '@/lib/content';
import { renderOg, ogContentType, ogSize } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Arivo Global product category';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug)!;
  return renderOg({ key: slug, eyebrow: 'Products', title: category.name, subtitle: category.summary });
}
