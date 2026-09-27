import { categories, industries, productsByCategory } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { home } from '@/content/home';
import { site } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section, Sections } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Figure } from '@/components/ui/Figure';
import { Rich } from '@/components/ui/Rich';
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

/** Surface sequence 1 · 2 · 3 · 1 · 2 · 4. */
export default function Home() {
  return (
    <Sections>
      {/* 1 · Hero — typographic, one product photograph, no carousel */}
      <Section level={1} labelledBy="hero-heading" className="relative overflow-hidden !pt-(--space-block)">
        <Meridians />
        <Container className="relative">
          <div className="grid gap-(--space-block) lg:grid-cols-12 lg:items-center lg:gap-6">
            <div className="lg:col-span-7 lg:pr-10">
              <div className="reveal" style={i(0)}>
                <Eyebrow>{home.hero.eyebrow}</Eyebrow>
                <h1 id="hero-heading" className="t-display mt-6 text-navy">
                  {home.hero.headline}
                </h1>
              </div>
              <p className="reveal t-lead mt-6 max-w-[40ch] text-slate" style={i(1)}>
                {home.hero.standfirst}
              </p>
              <div className="reveal mt-(--space-group) flex flex-wrap gap-3" style={i(2)}>
                <Button href="/products" variant="secondary">
                  View products
                </Button>
                <Button href="/contact#rfq" variant="outline">
                  Send a drawing
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Figure image={home.hero.image} eager sizes="(min-width: 1024px) 490px, calc(100vw - 40px)" />
            </div>
          </div>
        </Container>
      </Section>

      {/* 2 · Three categories */}
      <Section level={2} labelledBy="categories-heading">
        <Container>
          <SectionHeading id="categories-heading" eyebrow={home.categories.eyebrow}>
            {home.categories.heading}
          </SectionHeading>
          <ul className="mt-(--space-group) grid grid-cols-1 gap-6 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]">
            {categories.map((c) => {
              const lead = productsByCategory(c.slug)[0];
              return (
                <li key={c.slug}>
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
            <div className="lg:col-span-5">
              <SectionHeading id="industries-heading" eyebrow={home.industries.eyebrow}>
                {home.industries.heading}
              </SectionHeading>
              <p className="t-body mt-5 text-ink">{home.industries.body}</p>
            </div>
            <ul className="flex flex-wrap content-start gap-2 lg:col-span-7 lg:pt-12">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Chip href={`/industries/${ind.slug}`}>{ind.name}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 4 · What we do */}
      <Section level={1} labelledBy="work-heading">
        <Container>
          <SectionHeading id="work-heading" eyebrow={home.whatWeDo.eyebrow}>
            {home.whatWeDo.heading}
          </SectionHeading>
          <div className="mt-(--space-group) grid gap-(--space-group) md:grid-cols-3 md:gap-6">
            {home.whatWeDo.columns.map((col) => (
              <div key={col.title} className="border-t border-navy pt-5">
                <h3 className="t-h4 text-navy">{col.title}</h3>
                <p className="t-body mt-3 text-ink">{col.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5 · Markets and credentials */}
      <Section level={2} labelledBy="markets-heading">
        <Container>
          <SectionHeading id="markets-heading" eyebrow={home.markets.eyebrow}>
            {home.markets.heading}
          </SectionHeading>
          <dl className="mt-(--space-group) grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.markets.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end rounded-brand border border-border bg-white p-5">
                <dt className="t-small mt-2 text-slate">{s.label}</dt>
                <dd className="font-mono text-[34px] leading-[40px] text-navy lg:text-[44px] lg:leading-[52px] [&_.confirm]:text-[13px] [&_.confirm]:leading-5">
                  <Rich text={s.value} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="t-small mt-6 max-w-(--container-prose) text-slate">
            {home.markets.credentialsNote}{' '}
            <a href="/company#quality" className="link">
              Quality and documentation
            </a>
          </p>
        </Container>
      </Section>

      {/* 6 · Enquiry band */}
      <EnquiryBand heading={home.enquiry.heading} body={home.enquiry.body} />
    </Sections>
  );
}

/** Hairline meridian arcs in Steel Blue, cropped off the right edge. Never behind body text. */
function Meridians() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 800"
      preserveAspectRatio="xMaxYMid slice"
      className="pointer-events-none absolute top-0 right-0 hidden h-full w-[46%] opacity-35 lg:block"
      fill="none"
    >
      {[120, 220, 320, 420, 520].map((rx) => (
        <ellipse key={rx} cx="640" cy="400" rx={rx} ry="520" className="stroke-steel" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      {[160, 300, 440, 580, 720].map((y) => (
        <line key={y} x1="0" x2="600" y1={y} y2={y} className="stroke-steel" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.6" />
      ))}
    </svg>
  );
}
