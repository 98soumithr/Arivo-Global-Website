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
import { homeCareProducts, homeCareCategories } from '@/content/natural-home-care-products';

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

  if (slug === 'natural-home-care') {
    return <NaturalHomeCarePage industry={industry} />;
  }

  return (
    <ListingPage eyebrow="Industries" title={industry.name} intro={industry.intro} products={productsByIndustry(industry.slug)} showCategory />
  );
}

/* ── Compact product card ── */

function ProductCard({ image, alt, label, name, meta, badges }: {
  image: string; alt: string; label: string; name: string;
  meta?: string | null; badges?: string[];
}) {
  return (
    <div className="group overflow-hidden rounded-[4px] border border-border bg-white transition-all duration-200 hover:shadow-[0_4px_16px_rgb(0_0_0/0.06)]">
      <div className="relative aspect-[3/2] overflow-hidden bg-mist">
        <Image src={image} alt={alt} fill sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="px-2 py-1.5">
        <p className="text-[10px] font-medium uppercase tracking-wider text-harbour">{label}</p>
        <h4 className="text-[13px] font-semibold leading-tight text-navy">{name}</h4>
        {meta && <p className="text-[10px] uppercase tracking-wider text-ink/40">{meta}</p>}
        {badges && badges.length > 0 && (
          <div className="mt-0.5 flex flex-wrap gap-0.5">
            {badges.slice(0, 2).map((b) => (
              <span key={b} className="rounded-full bg-harbour/[0.06] px-1.5 py-px text-[9px] font-medium text-harbour">{b}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Sustainable Packaging ── */

function SustainablePackagingPage({ industry }: { industry: { name: string; intro: string[] } }) {
  return (
    <Sections>
      <Section level={5} labelledBy="page-title" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1c3a] via-[#162450] to-[#1a3060]" />
        <Container className="relative">
          <div data-reveal className="mx-auto max-w-[600px] text-center">
            <Eyebrow onNavy>Industries</Eyebrow>
            <h1 id="page-title" className="t-h1 mt-2 text-white">{industry.name}</h1>
            <p className="t-body mt-2 text-on-navy">{industry.intro[0]}</p>
          </div>
          <div data-reveal style={i(1)} className="mx-auto mt-3 grid max-w-[600px] grid-cols-4 gap-1.5">
            {['Biodegradable', 'Compostable', 'Food Safe', 'Microwave Safe'].map((prop) => (
              <div key={prop} className="rounded-[4px] border border-light-steel/10 bg-white/[0.04] px-2 py-1 text-center">
                <p className="text-[9px] font-medium uppercase tracking-widest text-light-steel">{prop}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section level={1} labelledBy="catalogue-heading">
        <Container>
          <h2 id="catalogue-heading" className="sr-only">Product catalogue</h2>
          {packagingCategories.map((category, catIdx) => {
            const products = packagingProducts.filter((p) => p.category === category);
            if (products.length === 0) return null;
            return (
              <div key={category} className={catIdx > 0 ? 'mt-4' : ''}>
                <h3 className="text-[15px] font-semibold text-navy">{category}</h3>
                <div className="mt-2 grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                  {products.map((product, n) => (
                    <div key={product.slug} data-reveal style={i(n + 1)}>
                      <ProductCard
                        image={product.image} alt={product.name} label={product.material}
                        name={product.name} meta={product.size || product.capacity}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div data-reveal className="mt-6 flex items-center justify-between rounded-[6px] bg-gradient-to-r from-[#0f1c3a] to-[#162450] px-5 py-3">
            <div>
              <h3 className="text-[15px] font-semibold text-white">100% Sugarcane Bagasse</h3>
              <p className="text-[12px] text-light-steel/70">Biodegradable in 60–90 days · No plastic, no PFAS · Microwave & food safe</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button href="/contact#rfq" variant="primary-navy">Request a quote</Button>
              <Button href="/contact" variant="ghost-navy">Contact us</Button>
            </div>
          </div>
        </Container>
      </Section>

      <EnquiryBand />
    </Sections>
  );
}

/* ── Natural Home Care ── */

function NaturalHomeCarePage({ industry }: { industry: { name: string; intro: string[] } }) {
  return (
    <Sections>
      <Section level={5} labelledBy="nhc-title" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e1a] via-[#0f3d24] to-[#14492e]" />
        <Container className="relative">
          <div data-reveal className="mx-auto max-w-[600px] text-center">
            <Eyebrow onNavy>Industries</Eyebrow>
            <h1 id="nhc-title" className="t-h1 mt-2 text-white">{industry.name}</h1>
            <p className="t-body mt-2 text-emerald-100/80">{industry.intro[0]}</p>
          </div>
          <div data-reveal style={i(1)} className="mx-auto mt-3 grid max-w-[700px] grid-cols-5 gap-1.5">
            {['Plant-Powered', 'No Harsh Chemicals', 'Kids & Pet Safe', 'No Artificial Colours', 'Skin Safe'].map((attr) => (
              <div key={attr} className="rounded-[4px] border border-emerald-200/10 bg-white/[0.04] px-2 py-1 text-center">
                <p className="text-[9px] font-medium uppercase tracking-widest text-emerald-100/70">{attr}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section level={1} labelledBy="nhc-catalogue">
        <Container>
          <h2 id="nhc-catalogue" className="sr-only">Product catalogue</h2>
          {homeCareCategories.map((category, catIdx) => {
            const products = homeCareProducts.filter((p) => p.category === category);
            if (products.length === 0) return null;
            return (
              <div key={category} className={catIdx > 0 ? 'mt-4' : ''}>
                <h3 className="text-[15px] font-semibold text-navy">{category}</h3>
                <div className="mt-2 grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                  {products.map((product, n) => (
                    <div key={product.slug} data-reveal style={i(n + 1)}>
                      <ProductCard
                        image={product.image} alt={product.name} label={product.volume}
                        name={product.name} badges={product.keyBenefits}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div data-reveal className="mt-6 flex items-center justify-between rounded-[6px] bg-gradient-to-r from-[#0a2e1a] to-[#0f3d24] px-5 py-3">
            <div>
              <h3 className="text-[15px] font-semibold text-white">Plant-Powered, Chemical-Free</h3>
              <p className="text-[12px] text-emerald-100/70">Coconut & corn-derived surfactants · Bio enzymes · No bleach or ammonia · Kids & pet safe</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button href="/contact#rfq" variant="primary-navy">Request a quote</Button>
              <Button href="/contact" variant="ghost-navy">Contact us</Button>
            </div>
          </div>
        </Container>
      </Section>

      <EnquiryBand />
    </Sections>
  );
}
