import { getIndustry, industries } from '@/lib/content';
import { renderOg, ogContentType, ogSize } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Arivo Global products by industry';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug)!;
  return renderOg({ key: slug, eyebrow: 'Industries', title: industry.name, subtitle: 'Products for this industry' });
}
