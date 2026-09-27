import Link from 'next/link';
import { categories, industries, productsByCategory } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { home } from '@/content/home';
import { site } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section, Sections } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { Chip } from '@/components/product/Chip';
import { ProductCard } from '@/components/product/ProductCard';
import { EnquiryBand } from '@/components/product/EnquiryBand';
import { SectionHeading } from '@/components/product/SectionHeading';

export const metadata = buildMetadata({
  title: `${site.legalName} — ${site.tagline}`,
  description: site.description,
  path: '/',
});

const i = (n: number) => ({ '--i': n }) as React.CSSProperties;

/** Surface sequence 5 (dark photographic hero) · 2 · 3 · 5 (blueprint) · 2 · 4. */
export default function Home() {
  return (
    <Sections>
      {/* 1 · Hero — dark, full-bleed process photograph behind the headline; no carousel */}
      <Section level={5} labelledBy="hero-heading" className="relative flex min-h-[560px] items-center overflow-hidden !bg-deep-navy !bg-none lg:min-h-[min(84vh,760px)]">
        <HeroBackdrop image={home.hero.image} />
        <Container className="relative">
          <div className="max-w-[760px]">
            <div className="reveal" style={i(0)}>
              <Eyebrow onNavy>{home.hero.eyebrow}</Eyebrow>
              <h1 id="hero-heading" className="t-display mt-6 text-white">
                {home.hero.headline}
              </h1>
            </div>
            <p className="reveal t-lead mt-6 max-w-[46ch] text-on-navy" style={i(1)}>
              {home.hero.standfirst}
            </p>
            <div className="reveal mt-(--space-group) flex flex-wrap gap-3" style={i(2)}>
              <Button href="/products" variant="primary-navy">
                View products
              </Button>
              <Button href="/contact#rfq" variant="ghost-navy">
                Send a drawing
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2 · Three categories */}
      <Section level={2} labelledBy="categories-heading">
        <Container>
          <SectionHeading id="categories-heading" eyebrow={home.categories.eyebrow} reveal>
            {home.categories.heading}
          </SectionHeading>
          <ul className="mt-(--space-group) grid grid-cols-1 gap-6 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]">
            {categories.map((c, n) => {
              const lead = productsByCategory(c.slug)[0];
              return (
                <li key={c.slug} data-reveal style={{ '--i': n } as React.CSSProperties}>
                  <ProductCard
                    href={`/categories/${c.slug}`}
                    name={c.name}
                    summary={c.summary}
                    range={c.range}
                    image={lead?.images.find((img) => img.slot === 'hero')}
                  />
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* 3 · Industries served */}
      <Section level={3} labelledBy="industries-heading">
        <Container>
          <div className="grid gap-(--space-group) lg:grid-cols-12 lg:gap-6">
            <div data-reveal className="lg:col-span-5">
              <SectionHeading id="industries-heading" eyebrow={home.industries.eyebrow}>
                {home.industries.heading}
              </SectionHeading>
              <p className="t-body mt-5 text-ink">{home.industries.body}</p>
            </div>
            <ul data-reveal style={{ '--i': 1 } as React.CSSProperties} className="flex flex-wrap content-start gap-2 lg:col-span-7 lg:pt-12">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Chip href={`/industries/${ind.slug}`}>{ind.name}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 4 · What we do — blueprint section */}
      <Section level={5} labelledBy="work-heading">
        <Container>
          <SectionHeading id="work-heading" eyebrow={home.whatWeDo.eyebrow} onNavy reveal>
            {home.whatWeDo.heading}
          </SectionHeading>
          <div className="mt-(--space-group) grid gap-(--space-group) md:grid-cols-3 md:gap-6">
            {home.whatWeDo.columns.map((col, n) => (
              <div key={col.title} data-reveal style={{ '--i': n } as React.CSSProperties} className="border-t border-light-steel/35 pt-5">
                <p className="t-data text-light-steel">{String(n + 1).padStart(2, '0')}</p>
                <h3 className="t-h3 mt-3 text-white">{col.title}</h3>
                <p className="t-body mt-3 text-on-navy">{col.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5 · Markets */}
      <Section level={2} labelledBy="markets-heading">
        <Container>
          <div className="grid gap-(--space-group) lg:grid-cols-12 lg:gap-6">
            <div data-reveal className="lg:col-span-7 lg:pr-10">
              <SectionHeading id="markets-heading" eyebrow={home.markets.eyebrow}>
                {home.markets.heading}
              </SectionHeading>
              <p className="t-body mt-(--space-group) max-w-(--container-prose) text-ink">{home.markets.body}</p>
              <p className="t-small mt-5">
                <Link href={home.markets.link.href} className="link">
                  {home.markets.link.label}
                </Link>
              </p>
            </div>
            <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="self-end lg:col-span-5">
              <p className="t-label mb-4 text-slate">{home.markets.regionsLabel}</p>
              <ul>
              {home.markets.regions.map((region, n) => (
                <li key={region} className="flex items-baseline gap-5 border-b border-border py-5 first:border-t">
                  <span className="t-data text-slate">{String(n + 1).padStart(2, '0')}</span>
                  <span className="t-h3 text-navy">{region}</span>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6 · Enquiry band */}
      <EnquiryBand heading={home.enquiry.heading} body={home.enquiry.body} />
    </Sections>
  );
}
