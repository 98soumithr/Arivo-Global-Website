import Link from 'next/link';
import { productsGrouped } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Container, Prose } from '@/components/layout/Container';
import { Section, Sections } from '@/components/layout/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EnquiryBand } from '@/components/product/EnquiryBand';

export const metadata = buildMetadata({
  title: 'All products',
  description:
    'All refractory ceramic fibre products and foundry consumables in one view — filter candles, boards, gaskets, burner shapes, pipe sections, feeder sleeves, crucibles, tap-out cones, pouring cups and sampling spoons.',
  path: '/products',
});

/** All products in one view, grouped by category. A buyer should find their part in under five seconds. */
export default function Page() {
  const groups = productsGrouped();
  return (
    <Sections>
      <Section level={1} labelledBy="page-title" className="!pt-(--space-block)">
        <Container>
          <div className="reveal">
            <Eyebrow>Products</Eyebrow>
            <h1 id="page-title" className="t-h1 mt-5 text-navy">
              All products
            </h1>
          </div>
          <Prose className="reveal t-lead mt-5 text-slate" style={{ '--i': 1 } as React.CSSProperties}>
            <p>
              Ten product lines in three families. Most parts are supplied to drawing — if you have a sample, a drawing or the part
              currently in service, that is enough to quote from.
            </p>
          </Prose>
          <nav aria-label="Product families" className="reveal mt-(--space-group) flex flex-wrap gap-x-6 gap-y-2" style={{ '--i': 2 } as React.CSSProperties}>
            {groups.map(({ category, products }) => (
              <a key={category.slug} href={`#${category.slug}`} className="link text-[15px]">
                {category.name} <span className="t-data text-slate">({products.length})</span>
              </a>
            ))}
          </nav>
        </Container>
      </Section>
      <Section level={2}>
        <Container>
          <div className="space-y-(--space-block)">
            {groups.map(({ category, products }) => (
              <div key={category.slug} id={category.slug} className="scroll-mt-8">
                <div data-reveal className="mb-(--space-group) flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="t-h2 text-navy">{category.name}</h2>
                    <p className="t-body mt-2 text-slate">{category.summary}</p>
                  </div>
                  <Link href={`/categories/${category.slug}`} className="link t-small shrink-0">
                    Category overview
                  </Link>
                </div>
                <ProductGrid products={products} />
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <EnquiryBand />
    </Sections>
  );
}
