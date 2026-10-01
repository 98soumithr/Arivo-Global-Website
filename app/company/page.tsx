import { company } from '@/content/company';
import { industries } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/Container';
import { Section, Sections } from '@/components/layout/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Rich } from '@/components/ui/Rich';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { EnquiryBand } from '@/components/product/EnquiryBand';

export const metadata = buildMetadata({
  title: 'Company',
  description:
    'Arivo Global Private Limited — sourcing and export company serving buyers across Europe, the USA, the Gulf, Southeast Asia and beyond. Quality, compliance and markets.',
  path: '/company',
});

const i = (n: number) => ({ '--i': n }) as React.CSSProperties;

/* ── Inline SVG icons ── */
function CheckIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`${className} shrink-0`}>
      <circle cx="10" cy="10" r="10" className="fill-harbour/10" />
      <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-harbour" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6">
      <circle cx="12" cy="12" r="9" className="stroke-harbour" strokeWidth="1.2" />
      <path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" className="stroke-harbour" strokeWidth="1.2" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5">
      <path d="M3 8h10m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Data ── */
const stats = [
  { value: 4, suffix: '', label: 'Industries' },
  { value: 15, suffix: '+', label: 'Countries' },
  { value: 4, suffix: '', label: 'Continents' },
  { value: 100, suffix: '%', label: 'Documented' },
];

const marqueeItems = [
  'Agro Products',
  'Sustainable Packaging',
  'Natural Home Care',
  'Industrial Products',
  'Quality Assured',
  'Global Export',
  'Sea & Air Freight',
  'Trusted Suppliers',
  'End-to-End Service',
  'Documentation Included',
];

const about = company.sections.find((s) => s.id === 'about')!;
const markets = company.sections.find((s) => s.id === 'markets')!;

export default function Page() {
  return (
    <>
      <Sections>
        {/* ═══ 1 · HERO — Level 5 ═══ */}
        <Section level={5} id="about" labelledBy="page-title" className="relative overflow-hidden">
          {/* Dot grid background with radial fade */}
          <div className="dot-grid-navy mask-radial pointer-events-none absolute inset-0" />

          {/* Ambient glow orbs */}
          <div className="glow-orb -right-[20%] -top-[30%] size-[600px] bg-harbour/[0.14]" />
          <div className="glow-orb -left-[10%] bottom-0 size-[400px] bg-burgundy/[0.08]" />

          <Container className="relative">
            <div data-reveal className="mx-auto max-w-[780px] text-center">
              <Eyebrow onNavy>{company.intro.eyebrow}</Eyebrow>
              <h1 id="page-title" className="t-display gradient-text mt-3">
                {company.intro.heading}
              </h1>
              <p className="t-lead mx-auto mt-3 max-w-[56ch] text-on-navy/80">
                {company.intro.standfirst}
              </p>
            </div>

            {/* Stat counters — glassmorphism */}
            <div data-reveal style={i(1)} className="mx-auto mt-6 grid max-w-[700px] grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-[8px] border border-white/[0.08] bg-white/[0.04] px-3 py-4 text-center backdrop-blur-md transition-all duration-500 hover:border-harbour/30 hover:bg-white/[0.08] hover:shadow-[0_0_40px_rgb(64_101_162/0.12)]"
                >
                  <p className="font-serif text-[36px] leading-none text-white lg:text-[44px]">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="t-label mt-2 text-light-steel">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Hairline divider */}
            <div data-reveal style={i(2)} className="hairline-light mx-auto mt-8 max-w-[500px]" />

            {/* About body */}
            <div data-reveal style={i(3)} className="mx-auto mt-6 max-w-[680px]">
              {about.body.map((p) => (
                <p key={p.slice(0, 32)} className="t-body mt-3 first:mt-0 text-on-navy/70">
                  <Rich text={p} />
                </p>
              ))}
            </div>
          </Container>
        </Section>

        {/* ═══ MARQUEE TICKER ═══ */}
        <div className="overflow-hidden border-y border-border bg-white py-3">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, n) => (
              <span key={n} className="flex shrink-0 items-center gap-6 px-6">
                <span className="t-label text-slate">{item}</span>
                <span className="size-1.5 rounded-full bg-harbour/30" />
              </span>
            ))}
          </div>
        </div>

        {/* ═══ 2 · INDUSTRIES — Level 1 ═══ */}
        <Section level={1} labelledBy="industries-heading">
          <Container>
            <div data-reveal className="text-center">
              <Eyebrow>What we do</Eyebrow>
              <h2 id="industries-heading" className="t-h1 mt-3">
                <span className="gradient-text-navy">Four industries, one partner</span>
              </h2>
              <p className="t-body mx-auto mt-2 max-w-[52ch] text-slate">
                We source and export across four verticals — each with dedicated product expertise, supplier networks and quality protocols.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {industries.map((ind, n) => (
                <a
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  data-reveal
                  style={i(n + 1)}
                  className="group relative overflow-hidden rounded-[8px] bg-gradient-to-br from-[#0f1c3a] to-[#162450] p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgb(10_18_37/0.5)] lg:p-6"
                >
                  {/* Top accent line */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-harbour/0 via-harbour to-harbour/0 opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-harbour/0 blur-[50px] transition-all duration-700 group-hover:bg-harbour/10" />
                  {/* Oversized faded number */}
                  <span className="absolute -right-1 -top-3 font-serif text-[72px] leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-white/[0.08] lg:text-[88px]">
                    {String(n + 1).padStart(2, '0')}
                  </span>
                  <div className="relative">
                    <p className="t-label text-light-steel">{ind.slug.replace(/-/g, ' ')}</p>
                    <h3 className="t-h3 mt-2 text-white">{ind.name}</h3>
                    <p className="t-small mt-2 text-light-steel/70">{ind.intro[0]?.slice(0, 120)}…</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-harbour transition-colors group-hover:text-white">
                      View industry
                      <ArrowRightIcon />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </Container>
        </Section>

        {/* ═══ 3 · MARKETS — Level 2 ═══ */}
        <Section level={2} id="markets" labelledBy="markets-heading" className="relative overflow-hidden">
          <Container className="relative">
            <div data-reveal className="text-center">
              <div className="shadow-layered mx-auto inline-flex size-10 items-center justify-center rounded-[6px] bg-white">
                <GlobeIcon />
              </div>
              <h2 id="markets-heading" className="t-h1 mt-3 text-navy">{markets.heading}</h2>
            </div>

            <div data-reveal style={i(1)} className="mx-auto mt-3 max-w-[680px] text-center">
              {markets.body.map((p) => (
                <p key={p.slice(0, 32)} className="t-body mt-2 first:mt-0 text-ink/70">
                  <Rich text={p} />
                </p>
              ))}
            </div>

            {/* Region cards */}
            {'list' in markets && markets.list && (
              <div data-reveal style={i(2)} className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {markets.list.items.map((region, n) => (
                  <div
                    key={region}
                    className="group relative overflow-hidden rounded-[8px] bg-gradient-to-br from-[#0f1c3a] to-[#162450] p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgb(10_18_37/0.4)]"
                  >
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-harbour/0 via-harbour to-harbour/0 opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-harbour/0 blur-[40px] transition-all duration-700 group-hover:bg-harbour/10" />
                    <p className="t-data relative text-harbour">{String(n + 1).padStart(2, '0')}</p>
                    <h3 className="t-h3 relative mt-1 text-white">{region}</h3>
                  </div>
                ))}
              </div>
            )}

            {/* Shipping modes */}
            <div data-reveal style={i(3)} className="mt-5 flex flex-wrap justify-center gap-3">
              {['Sea freight — production orders', 'Air freight — urgent replacements'].map((mode) => (
                <div key={mode} className="shadow-layered flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2">
                  <CheckIcon className="size-4" />
                  <span className="text-[13px] font-medium text-navy">{mode}</span>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </Sections>

      <EnquiryBand />
    </>
  );
}
