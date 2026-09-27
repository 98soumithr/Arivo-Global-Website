import type { ProductContent } from '@/lib/schema';
import { Container, Prose } from '@/components/layout/Container';
import { Section, Sections } from '@/components/layout/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Rich } from '@/components/ui/Rich';
import { EnquiryBand } from './EnquiryBand';
import { ProductGrid } from './ProductGrid';

/** Category and industry views: intro paragraph, then the pre-filtered grid. Thin by design. */
export function ListingPage({
  eyebrow,
  title,
  intro,
  products,
  showCategory = false,
}: {
  eyebrow: string;
  title: string;
  intro: string[];
  products: ProductContent[];
  showCategory?: boolean;
}) {
  return (
    <Sections>
      <Section level={1} labelledBy="page-title" className="!pt-(--space-block)">
        <Container>
          <div className="reveal">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id="page-title" className="t-h1 mt-5 text-navy">
              {title}
            </h1>
          </div>
          <Prose className="reveal flow t-lead mt-5 text-slate" >
            {intro.map((p) => (
              <p key={p.slice(0, 32)}>
                <Rich text={p} />
              </p>
            ))}
          </Prose>
        </Container>
      </Section>
      <Section level={2} labelledBy="listing">
        <Container>
          <h2 id="listing" className="t-label mb-(--space-group) text-slate">
            <span className="t-data normal-case">{products.length}</span> {products.length === 1 ? 'product' : 'products'}
          </h2>
          <ProductGrid products={products} showCategory={showCategory} />
        </Container>
      </Section>
      <EnquiryBand />
    </Sections>
  );
}
