import Link from 'next/link';
import { industries, productsByIndustry } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Container, Prose } from '@/components/layout/Container';
import { Section, Sections } from '@/components/layout/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ArrowRight } from '@/components/ui/Arrow';
import { EnquiryBand } from '@/components/product/EnquiryBand';

export const metadata = buildMetadata({
  title: 'Industries',
  description: 'Refractory ceramic fibre products and foundry consumables by industry — foundry, aluminium, waste to energy, glass, cement and process heat.',
  path: '/industries',
});

/** Landing target for the Industries nav item. Each row opens a pre-filtered product view. */
export default function Page() {
  return (
    <Sections>
      <Section level={1} labelledBy="page-title" className="!pt-(--space-block)">
        <Container>
          <div className="reveal">
            <Eyebrow>Industries</Eyebrow>
            <h1 id="page-title" className="t-h1 mt-5 text-navy">
              Products by industry
            </h1>
          </div>
          <Prose className="reveal t-lead mt-5 text-slate" style={{ '--i': 1 } as React.CSSProperties}>
            <p>Each view lists only the products relevant to that industry.</p>
          </Prose>
        </Container>
      </Section>
      <Section level={2} labelledBy="industry-list">
        <Container>
          <h2 id="industry-list" className="sr-only">
            Industries
          </h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]">
            {industries.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="group flex h-full flex-col rounded-brand border border-border bg-white p-5 transition-colors duration-150 ease-out hover:border-harbour"
                >
                  <h3 className="t-h3 text-navy decoration-1 underline-offset-4 group-hover:underline">{i.name}</h3>
                  <p className="t-small mt-3 flex-1 text-ink">{i.intro[0]}</p>
                  <p className="t-small mt-5 flex items-center justify-between border-t border-border pt-4 text-slate">
                    <span className="t-data">{productsByIndustry(i.slug).length} products</span>
                    <ArrowRight className="size-4 text-harbour" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <EnquiryBand />
    </Sections>
  );
}
