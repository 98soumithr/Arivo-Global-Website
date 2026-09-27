import { notFound } from 'next/navigation';
import { getProduct, products } from '@/lib/content';
import { buildMetadata, faqJsonLd, productJsonLd } from '@/lib/seo';
import { ProductPage } from '@/components/product/ProductPage';
import { JsonLd } from '@/components/ui/JsonLd';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/products/[slug]'>) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return buildMetadata({ ...product.seo, path: `/products/${slug}` });
}

export default async function Page({ params }: PageProps<'/products/[slug]'>) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return (
    <>
      <ProductPage product={product} />
      <JsonLd data={productJsonLd(product)} />
      <JsonLd data={faqJsonLd(product.faqs)} />
    </>
  );
}
