import { getCategory, getProduct, products } from '@/lib/content';
import { renderOg, ogContentType, ogSize } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Arivo Global product';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug)!;
  return renderOg({
    key: slug,
    eyebrow: getCategory(product.category)?.name ?? 'Products',
    title: product.name,
    subtitle: product.descriptor,
  });
}
