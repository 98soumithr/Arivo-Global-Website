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

/* ── Reusable compact product card ── */

function ProductCard({ image, alt, label, name, description, meta, badges }: {
  image: string; alt: string; label: string; name: string; description: string;
  meta?: string | null; badges?: string[];
}) {
  return (
    <div className="group overflow-hidden rounded-[6px] border border-border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgb(0_0_0/0.06)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <Image src={image} alt={alt} fill sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="px-3 py-2">
        <p className="t-label text-harbour">{label}</p>
        <h4 className="t-h4 mt-0.5 text-navy leading-snug">{name}</h4>
        <p className="mt-0.5 text-[12px] leading-[16px] text-slate line-clamp-2">{description}</p>
        {meta && <p className="t-label mt-1 text-ink/40">{meta}</p>}
        {badges && badges.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {badges.slice(0, 2).map((b) => (
              <span key={b} className="rounded-full border border-harbour/15 bg-harbour/[0.04] px-2 py-px text-[10px] font-medium text-harbour">{b}</span>
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
      {/* Hero */}
      <Section level={5} labelledBy="page-title" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1c3a] via-[#162450] to-[#1a3060]" />
        <Container className="relative">
          <div data-reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow onNavy>Industries</Eyebrow>
            <h1 id="page-title" className="t-display mt-3 text-white">{industry.name}</h1>
            <p className="t-lead mt-3 text-on-navy">{industry.intro[0]}</p>
          </div>
          <div data-reveal style={i(1)} className="mx-auto mt-4 grid max-w-[700px] grid-cols-2 gap-2 sm:grid-cols-4">
            {['Biodegradable', 'Compostable', 'Food Safe', 'Microwave Safe'].map((prop) => (
              <div key={prop} className="rounded-[6px] border border-light-steel/10 bg-white/[0.04] px-3 py-1.5 text-center">
                <p className="t-label text-white">{prop}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* All products — single continuous section */}
      <Section level={1} labelledBy="catalogue-heading">
        <Container>
          <h2 id="catalogue-heading" className="sr-only">Product catalogue</h2>
          {packagingCategories.map((category, catIdx) => {
            const products = packagingProducts.filter((p) => p.category === category);
            if (products.length === 0) return null;
            return (
              <div key={category} className={catIdx > 0 ? 'mt-6' : ''}>
                <div data-reveal>
                  <h3 className="t-h3 text-navy">{category}</h3>
                </div>
                <div className="mt-3 grid gap-2.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {products.map((product, n) => (
                    <div key={product.slug} data-reveal style={i(n + 1)}>
                      <ProductCard
                        image={product.image} alt={product.name} label={product.material}
                        name={product.name} description={product.description}
                        meta={product.size || product.capacity}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Material callout — inline, no extra section */}
          <div data-reveal className="mt-10 rounded-[8px] bg-gradient-to-br from-[#0f1c3a] to-[#162450] p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="t-label text-light-steel/60">Material</p>
                <h3 className="t-h2 mt-2 text-white">100% Sugarcane Bagasse</h3>
                <p className="t-small mt-2 text-light-steel/80">
                  Made from the fibrous residue left after juice extraction — fully biodegradable and compostable.
                  Breaks down in 60–90 days. No plastic, no wax, no PFAS. Heat-tolerant, microwave-safe, certified food-grade.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button href="/contact#rfq" variant="primary-navy">Request a quote</Button>
                <Button href="/contact" variant="ghost-navy">Contact us</Button>
              </div>
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
      {/* Hero */}
      <Section level={5} labelledBy="nhc-title" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e1a] via-[#0f3d24] to-[#14492e]" />
        <Container className="relative">
          <div data-reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow onNavy>Industries</Eyebrow>
            <h1 id="nhc-title" className="t-display mt-3 text-white">{industry.name}</h1>
            <p className="t-lead mt-3 text-emerald-100/80">{industry.intro[0]}</p>
          </div>
          <div data-reveal style={i(1)} className="mx-auto mt-4 grid max-w-[800px] grid-cols-2 gap-2 sm:grid-cols-5">
            {['Plant-Powered', 'No Harsh Chemicals', 'Kids & Pet Safe', 'No Artificial Colours', 'Skin Safe'].map((attr) => (
              <div key={attr} className="rounded-[6px] border border-emerald-200/10 bg-white/[0.04] px-3 py-1.5 text-center">
                <p className="t-label text-white">{attr}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* All products — single continuous section */}
      <Section level={1} labelledBy="nhc-catalogue">
        <Container>
          <h2 id="nhc-catalogue" className="sr-only">Product catalogue</h2>
          {homeCareCategories.map((category, catIdx) => {
            const products = homeCareProducts.filter((p) => p.category === category);
            if (products.length === 0) return null;
            return (
              <div key={category} className={catIdx > 0 ? 'mt-6' : ''}>
                <div data-reveal>
                  <h3 className="t-h3 text-navy">{category}</h3>
                </div>
                <div className="mt-3 grid gap-2.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {products.map((product, n) => (
                    <div key={product.slug} data-reveal style={i(n + 1)}>
                      <ProductCard
                        image={product.image} alt={product.name} label={product.volume}
                        name={product.name} description={product.description}
                        badges={product.keyBenefits}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Philosophy callout — inline, no extra section */}
          <div data-reveal className="mt-10 rounded-[8px] bg-gradient-to-br from-[#0a2e1a] to-[#0f3d24] p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="t-label text-emerald-200/60">Philosophy</p>
                <h3 className="t-h2 mt-2 text-white">Plant-Powered, Chemical-Free</h3>
                <p className="t-small mt-2 text-emerald-100/80">
                  Formulated with coconut and corn-derived surfactants, bio enzymes and citrus extracts.
                  No bleach, no ammonia, no harsh acids. Safe for children, pets and sensitive skin.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button href="/contact#rfq" variant="primary-navy">Request a quote</Button>
                <Button href="/contact" variant="ghost-navy">Contact us</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <EnquiryBand />
    </Sections>
  );
}
