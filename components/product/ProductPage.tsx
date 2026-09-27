import Link from 'next/link';
import type { ProductContent } from '@/lib/schema';
import { getCategory, getIndustry, relatedProducts } from '@/lib/content';
import { Container, Prose } from '@/components/layout/Container';
import { Section, Sections } from '@/components/layout/Section';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Figure } from '@/components/ui/Figure';
import { Rich } from '@/components/ui/Rich';
import { Chip } from './Chip';
import { EnquiryBand } from './EnquiryBand';
import { ProductGrid } from './ProductGrid';
import { SectionHeading } from './SectionHeading';

/**
 * Renders any ProductContent. All product pages are this one component — no per-product code.
 * Surface sequence: 1 · 3 · 1 · 2 · 1 · 2 · 4. The spec's name block and role-in-process are merged
 * into one level-1 opening (as are "What's available" and extra sections) so no two consecutive
 * sections share a level.
 */
export function ProductPage({ product }: { product: ProductContent }) {
  const category = getCategory(product.category);
  const img = (slot: string) => product.images.find((i) => i.slot === slot);
  const hero = img('hero');
  const detail = img('detail');
  const context = img('context');
  const diagram = img('diagram');
  const related = relatedProducts(product);
  const enquireHref = `/contact?product=${product.slug}#rfq`;

  return (
    <Sections>
      {/* 1–2 · Name, descriptor and role in the process */}
      <Section level={1} labelledBy="product-name" className="!pt-(--space-block)">
        <Container>
          <div className="grid gap-(--space-block) lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
            <div className="lg:col-span-7 lg:pr-10">
              <div className="reveal" style={{ '--i': 0 } as React.CSSProperties}>
                {category && (
                  <Eyebrow>
                    <Link href={`/categories/${category.slug}`} className="hover:underline hover:underline-offset-4">
                      {category.name}
                    </Link>
                  </Eyebrow>
                )}
                <h1 id="product-name" className="t-display mt-5 text-navy">
                  {product.name}
                </h1>
              </div>
              <p className="reveal t-lead mt-5 text-slate" style={{ '--i': 1 } as React.CSSProperties}>
                {product.descriptor}
              </p>
              <div className="reveal mt-(--space-group) flex flex-wrap gap-3" style={{ '--i': 2 } as React.CSSProperties}>
                <Button href={enquireHref} variant="secondary">
                  Send a drawing or sample
                </Button>
                <Button href="#questions" variant="outline">
                  Common questions
                </Button>
              </div>
            </div>

            {/* Image follows the name on phones; on desktop it spans both rows of the 7/5 split */}
            {hero && (
              <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
                <div className="lg:sticky lg:top-8">
                  <Figure image={hero} eager sizes="(min-width: 1024px) 490px, calc(100vw - 40px)" />
                </div>
              </div>
            )}

            <div
              className="reveal border-t border-border pt-(--space-group) lg:col-span-7 lg:mt-(--space-block) lg:pr-10"
              style={{ '--i': 3 } as React.CSSProperties}
            >
              <h2 className="t-h3 text-navy">Role in the process</h2>
              <Prose className="flow t-body mt-5 text-ink">
                {product.roleInProcess.map((p) => (
                  <p key={p.slice(0, 32)}>
                    <Rich text={p} />
                  </p>
                ))}
              </Prose>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3 · Where it's used — context and evidence */}
      <Section level={3} labelledBy="where-used">
        <Container>
          <div className="grid gap-(--space-group) lg:grid-cols-12 lg:gap-6">
            <div data-reveal className="lg:col-span-7 lg:pr-10">
              <SectionHeading id="where-used" eyebrow="Applications">
                Where it’s used
              </SectionHeading>
              <ul className="mt-(--space-group) border-t border-steel/40">
                {product.whereUsed.map((w) => (
                  <li key={w} className="t-body flex gap-4 border-b border-steel/40 py-3.5 text-ink">
                    <span aria-hidden className="mt-[13px] h-px w-4 shrink-0 bg-navy" />
                    {w}
                  </li>
                ))}
              </ul>
              <div className="mt-(--space-group)">
                <h3 className="t-label text-slate">Industries</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.industries.map((slug) => {
                    const industry = getIndustry(slug);
                    return industry ? (
                      <li key={slug}>
                        <Chip href={`/industries/${slug}`}>{industry.name}</Chip>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
            {context && (
              <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="lg:col-span-5">
                <Figure image={context} sizes="(min-width: 1024px) 490px, calc(100vw - 40px)" />
              </div>
            )}
          </div>
          {diagram && (
            <div data-reveal className="mt-(--space-block)">
              <h3 className="t-h4 mb-5 text-navy">How it fits the process</h3>
              <Figure image={diagram} sizes="100vw" caption={diagram.shot} />
            </div>
          )}
        </Container>
      </Section>

      {/* 4–5 · What's available, plus extra sections */}
      <Section level={1} labelledBy="available">
        <Container>
          <div className="grid gap-(--space-group) lg:grid-cols-12 lg:gap-6">
            <div data-reveal className="lg:col-span-7 lg:pr-10">
              <SectionHeading id="available" eyebrow="Range">
                What’s available
              </SectionHeading>
              <Prose className="flow t-body mt-(--space-group) text-ink">
                {product.available.map((p) => (
                  <p key={p.slice(0, 32)}>
                    <Rich text={p} />
                  </p>
                ))}
              </Prose>
              {product.extraSections?.map((s) => (
                <div key={s.heading} className="mt-(--space-block) border-t border-border pt-(--space-group)">
                  <h2 className="t-h3 text-navy">{s.heading}</h2>
                  <Prose className="flow t-body mt-5 text-ink">
                    {s.body.map((p) => (
                      <p key={p.slice(0, 32)}>
                        <Rich text={p} />
                      </p>
                    ))}
                  </Prose>
                </div>
              ))}
            </div>
            {detail && (
              <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="lg:col-span-5">
                <Figure image={detail} sizes="(min-width: 1024px) 490px, calc(100vw - 40px)" />
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* 6 · Custom sizes and geometries */}
      <Section level={2} labelledBy="custom">
        <Container>
          <div className="grid gap-(--space-group) lg:grid-cols-12 lg:gap-6">
            <div data-reveal className="lg:col-span-7 lg:pr-10">
              <SectionHeading id="custom" eyebrow="Made to drawing">
                Custom sizes and geometries
              </SectionHeading>
              <Prose className="t-body mt-(--space-group) text-ink">
                <p>
                  <Rich text={product.customNote} />
                </p>
              </Prose>
            </div>
            <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="lg:col-span-5 lg:self-end">
              <div className="rounded-brand border border-border bg-white p-5 lg:p-6">
                <p className="t-h4 text-navy">Send what you have</p>
                <p className="t-small mt-2 text-slate">Drawings, specifications, photographs or a sample — PDF, DWG, DXF, STEP or images.</p>
                <Button href={enquireHref} variant="outline" className="mt-5">
                  Attach a drawing
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7 · Common questions */}
      <Section level={1} id="questions" labelledBy="faq">
        <Container>
          <div className="grid gap-(--space-group) lg:grid-cols-12 lg:gap-6">
            <div data-reveal className="lg:col-span-7 lg:pr-10">
              <SectionHeading id="faq" eyebrow="Questions">
                Common questions
              </SectionHeading>
              <div className="mt-(--space-group)">
                <Accordion items={product.faqs} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8 · Related products */}
      <Section level={2} labelledBy="related">
        <Container>
          <SectionHeading id="related" eyebrow="Related" reveal>
            Related products
          </SectionHeading>
          <div className="mt-(--space-group)">
            <ProductGrid products={related} showCategory />
          </div>
        </Container>
      </Section>

      {/* 9 · Enquiry */}
      <EnquiryBand
        heading={`Enquire about ${product.name.toLowerCase()}`}
        body="Send a drawing, a sample or the part currently in service, and tell us the application."
        href={enquireHref}
      />
    </Sections>
  );
}
