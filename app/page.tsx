import Image from 'next/image';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { home } from '@/content/home';
import { site } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section, Sections } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { EnquiryBand } from '@/components/product/EnquiryBand';
import { SectionHeading } from '@/components/product/SectionHeading';

export const metadata = buildMetadata({
  title: `${site.legalName} — ${site.tagline}`,
  description: site.description,
  path: '/',
});

const i = (n: number) => ({ '--i': n }) as React.CSSProperties;

export default function Home() {
  return (
    <Sections>
      {/* ── 1 · Hero — full-bleed video ── */}
      <Section
        level={5}
        labelledBy="hero-heading"
        className="hero-legible surface-hero flex min-h-[560px] items-center overflow-hidden lg:min-h-[min(84vh,760px)]"
      >
        <HeroBackdrop image={home.hero.image} video={home.hero.video} />
        <Container className="relative">
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
        </Container>
      </Section>

      {/* ── 2 · Why Arivo — heading + large editorial image + pillars ── */}
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
              <figure className="overflow-hidden rounded-brand">
                <Image
                  src="/images/home/port-golden-hour.jpg"
                  alt="Aerial view of a busy container port at golden hour with cranes and thousands of shipping containers"
                  width={1600}
                  height={894}
                  className="aspect-[16/9] w-full object-cover"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
              </figure>
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

      {/* ── 3 · How it works — 3 steps in a clean row ── */}
      <Section level={5} labelledBy="process-heading">
        <Container>
          <SectionHeading id="process-heading" eyebrow={home.process.eyebrow} onNavy reveal>
            {home.process.heading}
          </SectionHeading>

          <div className="mt-(--space-group) grid gap-(--space-group) sm:grid-cols-3 sm:gap-6">
            {home.process.steps.map((step, n) => (
              <div key={step.title} data-reveal style={i(n)} className="border-t border-light-steel/35 pt-5">
                <p className="t-data text-light-steel">{String(n + 1).padStart(2, '0')}</p>
                <h3 className="t-h3 mt-3 text-white">{step.title}</h3>
                <p className="t-body mt-3 text-on-navy">{step.body}</p>
              </div>
            ))}
          </div>

          {/* Supporting images below the steps — desktop only */}
          <div className="mt-(--space-block) hidden gap-6 sm:grid sm:grid-cols-2">
            <div data-reveal style={i(3)}>
              <figure className="overflow-hidden rounded-brand">
                <Image
                  src="/images/home/export-documents.jpg"
                  alt="Export shipping documents on a desk"
                  width={1600}
                  height={894}
                  className="aspect-[16/9] w-full object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </figure>
            </div>
            <div data-reveal style={i(4)}>
              <figure className="overflow-hidden rounded-brand">
                <Image
                  src="/images/home/warehouse-inspection.jpg"
                  alt="Quality inspector reviewing cargo in an export warehouse"
                  width={1600}
                  height={894}
                  className="aspect-[16/9] w-full object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </figure>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 4 · What we supply — product lines ── */}
      <Section level={2} labelledBy="range-heading">
        <Container>
          <div className="grid gap-(--space-group) lg:grid-cols-12 lg:gap-6">
            <div data-reveal className="lg:col-span-5">
              <SectionHeading id="range-heading" eyebrow={home.range.eyebrow}>
                {home.range.heading}
              </SectionHeading>
              <p className="t-body mt-5 text-ink">{home.range.body}</p>
              <div className="mt-(--space-group)">
                <Button href={home.range.cta.href} variant="secondary">
                  {home.range.cta.label}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-6">
                {home.range.lines.map((line, n) => (
                  <li key={line.title} data-reveal style={i(n + 1)} className="border-t border-border pt-5">
                    <h3 className="t-h4 text-navy">{line.title}</h3>
                    <p className="t-small mt-3 text-slate">{line.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 5 · Markets — regions + ship image as "worldwide reach" visual ── */}
      <Section level={3} labelledBy="markets-heading">
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

          {/* Ship at sea — full-width, properly contained, represents global reach */}
          <div data-reveal style={i(2)} className="mt-(--space-block)">
            <figure className="overflow-hidden rounded-brand">
              <Image
                src="/images/home/ship-at-sea.jpg"
                alt="Loaded container ship crossing open ocean — representing worldwide delivery"
                width={1600}
                height={894}
                className="aspect-[21/9] w-full object-cover object-[center_40%]"
                sizes="(min-width: 1024px) 80vw, 100vw"
              />
            </figure>
          </div>

          {/* Cranes at twilight — second visual below */}
          <div data-reveal style={i(3)} className="mt-6">
            <figure className="overflow-hidden rounded-brand">
              <Image
                src="/images/home/cranes-twilight.jpg"
                alt="Container port gantry cranes glowing under floodlights at blue hour"
                width={1600}
                height={894}
                className="aspect-[21/9] w-full object-cover"
                sizes="(min-width: 1024px) 80vw, 100vw"
              />
            </figure>
          </div>
        </Container>
      </Section>

      {/* ── 6 · Enquiry band ── */}
      <EnquiryBand heading={home.enquiry.heading} body={home.enquiry.body} />
    </Sections>
  );
}
