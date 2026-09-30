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
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
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
                <Button href="/industries" variant="primary-navy">
                  Explore industries
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

      {/* ── 2 · Why Arivo — editorial spread with full-bleed image ── */}
      <Section level={1} labelledBy="why-heading">
        {/* Headline + body — contained */}
        <Container>
          <div data-reveal className="mx-auto max-w-[780px] text-center">
            <Eyebrow>{home.intro.eyebrow}</Eyebrow>
            <h2 id="why-heading" className="t-display mt-6 text-navy">
              {home.intro.heading}
            </h2>
            <p className="t-lead mt-6 text-slate">{home.intro.body}</p>
          </div>
        </Container>

        {/* Full-bleed cinematic image */}
        <div data-reveal style={i(1)} className="mt-(--space-block)">
          <ScrollParallax speed={0.12}>
            <figure className="overflow-hidden">
              <Image
                src="/images/home/port-golden-hour.jpg"
                alt="Aerial view of a busy container port at golden hour"
                width={1600}
                height={894}
                className="aspect-[2.4/1] w-full object-cover"
                sizes="100vw"
              />
            </figure>
          </ScrollParallax>
        </div>

        {/* Gradient divider */}
        <Container>
          <div className="mx-auto mt-(--space-block) h-px w-full max-w-[600px] bg-gradient-to-r from-transparent via-harbour/30 to-transparent" />
        </Container>

        {/* Pillar cards — dark gradient with accent glow */}
        <Container>
          <ul className="mt-(--space-block) grid gap-6 sm:grid-cols-3">
            {home.intro.pillars.map((p, n) => (
              <li
                key={p.title}
                data-reveal
                style={i(n + 2)}
                className="group relative overflow-hidden rounded-[8px] bg-gradient-to-br from-[#0f1c3a] to-[#162450] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgb(10_18_37/0.5)] lg:p-8"
              >
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-harbour/0 via-harbour to-harbour/0 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Oversized faded number */}
                <span className="absolute -right-2 -top-4 font-serif text-[96px] leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-white/[0.08] lg:text-[120px]">
                  {String(n + 1).padStart(2, '0')}
                </span>
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-harbour/0 blur-[60px] transition-all duration-700 group-hover:bg-harbour/10" />
                <div className="relative">
                  <h3 className="t-h4 text-white">{p.title}</h3>
                  <p className="t-small mt-3 text-light-steel/80">{p.body}</p>
                </div>
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

      {/* ── 4 · Markets — dark immersive section with animated map ── */}
      <Section level={3} labelledBy="markets-heading" className="markets-immersive relative overflow-hidden">
        {/* Ship at sea as subtle full-bleed background */}
        <div className="absolute inset-0">
          <Image
            src="/images/home/ship-at-sea.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_40%] opacity-[0.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1225] via-[#0a1225]/95 to-[#0a1225]" />
        </div>

        <Container className="relative">
          {/* Header — centered */}
          <div className="mx-auto max-w-[680px] text-center" data-reveal>
            <p className="t-label text-light-steel">{home.markets.eyebrow}</p>
            <h2 id="markets-heading" className="t-h1 mt-5 text-white">
              {home.markets.heading}
            </h2>
            <p className="t-body mt-5 text-on-navy">{home.markets.body}</p>
          </div>

          {/* Animated stat counters */}
          <div data-reveal style={i(1)} className="mt-(--space-block) grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { value: 4, suffix: '', label: 'Continents' },
              { value: 15, suffix: '+', label: 'Countries' },
              { value: 2, suffix: '', label: 'Shipping modes' },
              { value: 100, suffix: '%', label: 'Documented' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-[48px] leading-none text-white lg:text-[64px]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="t-label mt-3 text-light-steel">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* World map with shipping routes */}
          <div data-reveal style={i(2)} className="mx-auto mt-(--space-block) max-w-[900px]">
            <WorldMap />
          </div>

          {/* Region cards */}
          <div className="mt-(--space-group) grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {home.markets.regions.map((region, n) => (
              <div
                key={region}
                data-reveal
                style={i(n + 3)}
                className="group rounded-brand border border-light-steel/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-harbour/30 hover:bg-white/[0.07]"
              >
                <p className="t-data text-harbour">{String(n + 1).padStart(2, '0')}</p>
                <h3 className="t-h3 mt-2 text-white">{region}</h3>
              </div>
            ))}
          </div>

          <div data-reveal style={i(7)} className="mt-(--space-group) text-center">
            <Link href={home.markets.link.href} className="t-small font-semibold text-light-steel underline decoration-1 underline-offset-4 transition-colors hover:text-white">
              {home.markets.link.label}
            </Link>
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
