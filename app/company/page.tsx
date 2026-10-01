import { existsSync } from 'node:fs';
import { join } from 'node:path';
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
const fileExists = (href: string) => existsSync(join(process.cwd(), 'public', href));

/* ── Inline SVG icons ── */
function CheckIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`${className} shrink-0`}>
      <circle cx="10" cy="10" r="10" className="fill-harbour/10" />
      <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-harbour" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6">
      <path d="M12 2l8 4v6c0 5.25-3.4 8.25-8 10-4.6-1.75-8-4.75-8-10V6l8-4z" className="fill-harbour/10 stroke-harbour" strokeWidth="1.2" />
      <path d="M9 12l2 2 4-4" className="stroke-harbour" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6">
      <path d="M9 3h6M10 3v6.5L4.5 19a1 1 0 00.87 1.5h13.26a1 1 0 00.87-1.5L14 9.5V3" className="stroke-harbour" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 15h10" className="stroke-harbour/40" strokeWidth="1" strokeDasharray="2 2" />
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

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4 shrink-0">
      <path d="M10 3v10m0 0l-3-3m3 3l3-3M4 14v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
  'Refractory Ceramics',
  'Foundry Consumables',
  'Agro Products',
  'Sustainable Packaging',
  'Natural Home Care',
  'Quality Assured',
  'Global Export',
  'Sea & Air Freight',
  'REACH Compliant',
  'Custom Geometries',
];

const about = company.sections.find((s) => s.id === 'about')!;
const quality = company.sections.find((s) => s.id === 'quality')!;
const compliance = company.sections.find((s) => s.id === 'compliance')!;
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

        {/* ═══ 3 · QUALITY — Level 3 ═══ */}
        <Section level={3} id="quality" labelledBy="quality-heading" className="relative overflow-hidden">
          {/* Dot grid background */}
          <div className="dot-grid mask-radial pointer-events-none absolute inset-0" />

          <Container className="relative">
            <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
              {/* Left — heading + body */}
              <div data-reveal className="lg:col-span-5">
                <div className="shadow-layered inline-flex size-10 items-center justify-center rounded-[6px] bg-white">
                  <ShieldIcon />
                </div>
                <h2 id="quality-heading" className="t-h1 mt-3 text-navy">{quality.heading}</h2>
                <div className="mt-3">
                  {quality.body.map((p) => (
                    <p key={p.slice(0, 32)} className="t-body mt-2 first:mt-0 text-ink/80">
                      <Rich text={p} />
                    </p>
                  ))}
                </div>
              </div>

              {/* Right — documentation checklist */}
              <div data-reveal style={i(1)} className="lg:col-span-7">
                {'list' in quality && quality.list && (
                  <div className="shadow-layered rounded-[8px] border border-border bg-white p-4 lg:p-5">
                    <h3 className="t-label text-slate">{quality.list.heading}</h3>
                    <ul className="mt-3 space-y-0">
                      {quality.list.items.map((item, n) => (
                        <li key={item} className="group flex items-start gap-3 rounded-[4px] px-2 py-2.5 transition-colors hover:bg-paper">
                          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-harbour/[0.08] text-[11px] font-semibold text-harbour">
                            {String(n + 1).padStart(2, '0')}
                          </span>
                          <span className="t-body text-ink/80">
                            <Rich text={item} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>

        {/* ═══ 4 · COMPLIANCE — Level 1 ═══ */}
        <Section level={1} id="compliance" labelledBy="compliance-heading">
          <Container>
            <div data-reveal className="mx-auto max-w-[680px] text-center">
              <div className="shadow-layered mx-auto inline-flex size-10 items-center justify-center rounded-[6px] bg-paper">
                <FlaskIcon />
              </div>
              <h2 id="compliance-heading" className="t-h1 mt-3 text-navy">{compliance.heading}</h2>
            </div>

            {/* Two chemistry cards with gradient borders */}
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              <div data-reveal style={i(1)} className="gradient-border group transition-shadow duration-300 hover:shadow-layered-hover">
                <div className="relative overflow-hidden bg-white p-5">
                  <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-harbour/[0.06] blur-[60px]" />
                  <p className="t-label relative text-harbour">Alumino-silicate</p>
                  <h3 className="t-h3 relative mt-2 text-navy">Refractory ceramic fibre</h3>
                  <p className="t-body relative mt-2 text-ink/70">
                    Higher temperature capability. Classified under CLP as a Category 1B carcinogen and on the REACH Candidate List in the EU.
                  </p>
                  <div className="relative mt-3 flex items-center gap-1.5">
                    <span className="rounded-full bg-harbour/[0.08] px-2 py-0.5 text-[10px] font-medium text-harbour">High temp</span>
                    <span className="rounded-full bg-harbour/[0.08] px-2 py-0.5 text-[10px] font-medium text-harbour">REACH listed</span>
                  </div>
                </div>
              </div>

              <div data-reveal style={i(2)} className="group overflow-hidden rounded-[8px] bg-gradient-to-br from-emerald-200/60 via-emerald-100/30 to-emerald-200/60 p-[1px] transition-shadow duration-300 hover:shadow-layered-hover">
                <div className="relative overflow-hidden rounded-[7px] bg-white p-5">
                  <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-emerald-500/[0.06] blur-[60px]" />
                  <p className="t-label relative text-emerald-700">AES — Alkaline earth silicate</p>
                  <h3 className="t-h3 relative mt-2 text-navy">Low bio-persistence fibre</h3>
                  <p className="t-body relative mt-2 text-ink/70">
                    Exonerated from carcinogen classification under Note Q of CLP. Preferred by some operators for handling and regulatory reasons.
                  </p>
                  <div className="relative mt-3 flex items-center gap-1.5">
                    <span className="rounded-full bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-medium text-emerald-700">Low bio-persistence</span>
                    <span className="rounded-full bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-medium text-emerald-700">CLP exonerated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body text */}
            <div data-reveal style={i(3)} className="mx-auto mt-5 max-w-[680px]">
              <p className="t-body text-ink/70">
                Buyers in the EU receive the information required by REACH Article 33 with every supply. Safe handling is straightforward and well established: minimise dust when cutting, use local extraction or wet methods where practical, and wear the protective equipment set out in the safety data sheet.
              </p>
            </div>

            {/* Downloads */}
            {'downloads' in compliance && compliance.downloads && (
              <div data-reveal style={i(4)} className="mx-auto mt-5 max-w-[500px]">
                <h3 className="t-label text-center text-slate">{compliance.downloads.heading}</h3>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
                  {compliance.downloads.items.map((d) => (
                    <div key={d.href}>
                      {fileExists(d.href) ? (
                        <a
                          href={d.href}
                          download
                          className="shadow-layered inline-flex items-center gap-2 rounded-[6px] border border-border bg-white px-4 py-2.5 text-[13px] font-medium text-navy transition-all hover:-translate-y-0.5 hover:shadow-layered-hover"
                        >
                          <DownloadIcon />
                          {d.label}
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-[6px] border border-border bg-white px-4 py-2.5 text-[13px] text-slate shadow-sm">
                          <DownloadIcon />
                          {d.label} — on request
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </Section>

        {/* ═══ 5 · MARKETS — Level 2 ═══ */}
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
