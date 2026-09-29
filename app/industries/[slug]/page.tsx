import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getIndustry, industries, productsByIndustry } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { ListingPage } from '@/components/product/ListingPage';
import { Container } from '@/components/layout/Container';
import { Section, Sections } from '@/components/layout/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { EnquiryBand } from '@/components/product/EnquiryBand';
import { packagingProducts, packagingCategories } from '@/content/sustainable-packaging-products';

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<'/industries/[slug]'>) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({ ...industry.seo, path: `/industries/${slug}` });
}

const i = (n: number) => ({ '--i': n }) as React.CSSProperties;

export default async function Page({ params }: PageProps<'/industries/[slug]'>) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  if (slug === 'sustainable-packaging') {
    return <SustainablePackagingPage industry={industry} />;
  }

  return (
    <ListingPage eyebrow="Industries" title={industry.name} intro={industry.intro} products={productsByIndustry(industry.slug)} showCategory />
  );
}

function SustainablePackagingPage({ industry }: { industry: { name: string; intro: string[] } }) {
  return (
    <Sections>
      {/* Hero */}
      <Section level={5} labelledBy="page-title" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1c3a] via-[#162450] to-[#1a3060]" />
        <Container className="relative">
          <div data-reveal className="mx-auto max-w-[780px] text-center">
            <Eyebrow onNavy>Industries</Eyebrow>
            <h1 id="page-title" className="t-display mt-6 text-white">
              {industry.name}
            </h1>
            <p className="t-lead mt-6 text-on-navy">
              {industry.intro[0]}
            </p>
            {industry.intro[1] && (
              <p className="t-body mt-4 text-light-steel/70">
                {industry.intro[1]}
              </p>
            )}
          </div>

          {/* Key properties */}
          <div data-reveal style={i(1)} className="mx-auto mt-(--space-block) grid max-w-[800px] grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Biodegradable', icon: '♻' },
              { label: 'Compostable', icon: '🌱' },
              { label: 'Food Safe', icon: '✓' },
              { label: 'Microwave Safe', icon: '✓' },
            ].map((prop) => (
              <div key={prop.label} className="rounded-[8px] border border-light-steel/10 bg-white/[0.04] px-4 py-3 text-center backdrop-blur-sm">
                <p className="t-label text-white">{prop.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Product catalogue by category */}
      {packagingCategories.map((category, catIdx) => {
        const products = packagingProducts.filter((p) => p.category === category);
        if (products.length === 0) return null;
        return (
          <Section key={category} level={catIdx % 2 === 0 ? 1 : 2} labelledBy={`cat-${catIdx}`}>
            <Container>
              <div data-reveal>
                <h2 id={`cat-${catIdx}`} className="t-h2 text-navy">{category}</h2>
                <div className="mt-2 h-[2px] w-12 bg-gradient-to-r from-harbour to-transparent" />
              </div>

              <div className="mt-(--space-group) grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product, n) => (
                  <div
                    key={product.slug}
                    data-reveal
                    style={i(n + 1)}
                    className="group overflow-hidden rounded-[8px] border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0_0_0/0.08)]"
                  >
                    <div className="relative aspect-square overflow-hidden bg-mist">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="t-label text-harbour">{product.material}</p>
                      <h3 className="t-h4 mt-1.5 text-navy">{product.name}</h3>
                      <p className="t-small mt-2 text-slate">{product.description}</p>
                      {(product.size || product.capacity) && (
                        <p className="t-label mt-3 text-ink/50">
                          {product.size || product.capacity}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      {/* Material info band */}
      <Section level={5} labelledBy="material-heading" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1c3a] to-[#162450]" />
        <Container className="relative">
          <div className="grid gap-(--space-group) lg:grid-cols-2 lg:items-center lg:gap-12">
            <div data-reveal>
              <Eyebrow onNavy>Material</Eyebrow>
              <h2 id="material-heading" className="t-h1 mt-5 text-white">
                100% Sugarcane Bagasse
              </h2>
              <p className="t-body mt-5 text-on-navy">
                All products are made from sugarcane bagasse — the fibrous residue left after juice extraction. This agricultural by-product is moulded into rigid, food-safe tableware that is fully biodegradable and compostable.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Breaks down naturally within 60–90 days',
                  'No plastic, no wax coating, no PFAS',
                  'Heat tolerant — suitable for hot food and microwaves',
                  'Sturdy enough for soups, curries and wet dishes',
                  'Certified food-safe for direct contact',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-light-steel/80">
                    <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-harbour" />
                    <span className="t-small">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal style={i(1)} className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-[8px]">
                <Image
                  src="/images/products/sustainable-packaging/9x9-clamshell.png"
                  alt="Clamshell container"
                  width={400}
                  height={400}
                  className="aspect-square object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[8px]">
                <Image
                  src="/images/products/sustainable-packaging/11-banquet-plate.png"
                  alt="Banquet plate"
                  width={400}
                  height={400}
                  className="aspect-square object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[8px]">
                <Image
                  src="/images/products/sustainable-packaging/food-bowl-360ml.jpeg"
                  alt="Food bowl"
                  width={400}
                  height={400}
                  className="aspect-square object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[8px]">
                <Image
                  src="/images/products/sustainable-packaging/10-round-plate.png"
                  alt="Round plate"
                  width={400}
                  height={400}
                  className="aspect-square object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section level={1} labelledBy="cta-heading">
        <Container>
          <div data-reveal className="mx-auto max-w-[680px] text-center">
            <h2 id="cta-heading" className="t-h2 text-navy">
              Need sustainable packaging for your market?
            </h2>
            <p className="t-body mt-4 text-slate">
              Share your requirement — product types, quantities and destination — and we will come back with pricing and a delivery timeline.
            </p>
            <div className="mt-(--space-group) flex flex-wrap justify-center gap-3">
              <Button href="/contact#rfq" variant="primary">
                Request a quote
              </Button>
              <Button href="/contact" variant="outline">
                Contact us
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <EnquiryBand />
    </Sections>
  );
}
