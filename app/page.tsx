import Image from 'next/image';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { home } from '@/content/home';
import { site, contact } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section, Sections } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { HeroParallax, ScrollIndicator } from '@/components/ui/HeroParallax';
import { ScrollParallax } from '@/components/ui/ScrollParallax';
import { Timeline } from '@/components/ui/Timeline';
import { WorldMap } from '@/components/ui/WorldMap';
import { ParticleGrid } from '@/components/ui/ParticleGrid';
import { EnquiryBand } from '@/components/product/EnquiryBand';
import { SectionHeading } from '@/components/product/SectionHeading';

export const metadata = buildMetadata({
  title: `${site.legalName} — ${site.tagline}`,
  description: site.description,
  path: '/',
});

const i = (n: number) => ({ '--i': n }) as React.CSSProperties;

export default function Home() {
  const timelineSteps = home.process.steps.map((step, n) => ({
    number: String(n + 1).padStart(2, '0'),
    title: step.title,
    body: step.body,
  }));

  return (
    <Sections>
      {/* ── 1 · Hero — full-bleed video with parallax text ── */}
      <Section
        level={5}
        labelledBy="hero-heading"
        className="hero-legible surface-hero flex min-h-[560px] items-center overflow-hidden lg:min-h-[min(84vh,760px)]"
      >
        <HeroBackdrop image={home.hero.image} video={home.hero.video} />
        <Container className="relative">
          <HeroParallax>
            <div className="max-w-[760px]">
              <div className="reveal" style={i(0)}>
                <Eyebrow onNavy>{home.hero.eyebrow}</Eyebrow>
                <h1 id="hero-heading" className="t-display mt-6 text-white drop-shadow-[0_2px_12px_rgb(0_0_0/0.5)]">
                  {home.hero.headline}
                </h1>
              </div>
              <p className="reveal t-lead mt-6 max-w-[46ch] text-on-navy drop-shadow-[0_1px_6px_rgb(0_0_0/0.4)]" style={i(1)}>
                {home.hero.standfirst}
              </p>
              <div className="reveal mt-(--space-group) flex flex-wrap gap-3" style={i(2)}>
                <Button href="/products" variant="primary-navy">
                  View products
                </Button>
                <Button href="/contact#rfq" variant="ghost-navy">
                  Get a quote
                </Button>
              </div>
            </div>
          </HeroParallax>
        </Container>
        <ScrollIndicator />
      </Section>

      {/* ── 2 · Why Arivo — heading + parallax image + pillars ── */}
      <Section level={1} labelledBy="why-heading">
        <Container>
          <div className="grid gap-(--space-group) lg:grid-cols-12 lg:gap-6">
            <div data-reveal className="flex flex-col justify-center lg:col-span-5">
              <SectionHeading id="why-heading" eyebrow={home.intro.eyebrow}>
                {home.intro.heading}
              </SectionHeading>
              <p className="t-body mt-5 text-ink">{home.intro.body}</p>
            </div>
            <div data-reveal style={i(1)} className="lg:col-span-7">
              <ScrollParallax speed={0.15}>
                <figure className="overflow-hidden rounded-brand">
                  <Image
                    src="/images/home/port-golden-hour.jpg"
                    alt="Aerial view of a busy container port at golden hour"
                    width={1600}
                    height={894}
                    className="aspect-[16/9] w-full object-cover"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                </figure>
              </ScrollParallax>
            </div>
          </div>

          <ul className="mt-(--space-block) grid gap-6 sm:grid-cols-3">
            {home.intro.pillars.map((p, n) => (
              <li key={p.title} data-reveal style={i(n + 2)} className="border-t border-border pt-5">
                <h3 className="t-h4 text-navy">{p.title}</h3>
                <p className="t-small mt-3 text-slate">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── 3 · How it works — vertical timeline with self-drawing line ── */}
      <Section level={5} labelledBy="process-heading" className="relative overflow-hidden">
        {/* Background cinematic image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/home/warehouse-inspection.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.06]"
          />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-[680px] text-center" data-reveal>
            <SectionHeading id="process-heading" eyebrow={home.process.eyebrow} onNavy>
              {home.process.heading}
            </SectionHeading>
            <p className="t-body mt-5 text-on-navy">
              Working with us is straightforward. One point of contact, from your first enquiry to final delivery.
            </p>
          </div>

          <div className="mt-(--space-block)">
            <Timeline steps={timelineSteps} />
          </div>
        </Container>
      </Section>

      {/* ── 4 · Markets — world map background + region list ── */}
      <Section level={3} labelledBy="markets-heading" className="relative overflow-hidden">
        <WorldMap />
        <Container className="relative">
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
            <div data-reveal style={i(1)} className="self-end lg:col-span-5">
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

          {/* Ship at sea — contextual, represents global reach */}
          <div data-reveal style={i(2)} className="mt-(--space-block)">
            <ScrollParallax speed={0.1}>
              <figure className="overflow-hidden rounded-brand">
                <Image
                  src="/images/home/ship-at-sea.jpg"
                  alt="Loaded container ship crossing open ocean"
                  width={1600}
                  height={894}
                  className="aspect-[21/9] w-full object-cover object-[center_40%]"
                  sizes="(min-width: 1024px) 80vw, 100vw"
                />
              </figure>
            </ScrollParallax>
          </div>
        </Container>
      </Section>

      {/* ── 5 · Enquiry band with particle grid ── */}
      <Section level={4} labelledBy="enquiry-heading" className="relative overflow-hidden">
        <ParticleGrid />
        <Container className="relative">
          <div data-reveal className="grid gap-(--space-group) lg:grid-cols-12 lg:items-end lg:gap-6">
            <div className="lg:col-span-7">
              <Eyebrow onNavy>Enquiries</Eyebrow>
              <h2 id="enquiry-heading" className="t-h2 mt-5 text-white">
                {home.enquiry.heading}
              </h2>
              <p className="t-lead mt-4 text-on-navy">{home.enquiry.body}</p>
            </div>
            <div data-reveal-item className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Button href="/contact#rfq" variant="primary-navy">
                Request a quote
              </Button>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-brand px-7 py-3.5 text-[15px] font-semibold leading-5 transition-colors duration-150 ease-out lg:text-base border border-[rgba(244,244,243,0.4)] text-paper hover:border-paper"
              >
                Email us
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </Sections>
  );
}
