import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { company } from '@/content/company';
import { buildMetadata } from '@/lib/seo';
import { Container, Prose } from '@/components/layout/Container';
import { Section, Sections, type Level } from '@/components/layout/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Rich } from '@/components/ui/Rich';
import { EnquiryBand } from '@/components/product/EnquiryBand';
import { SectionHeading } from '@/components/product/SectionHeading';

export const metadata = buildMetadata({
  title: 'Company',
  description:
    'Arivo Global Private Limited — refractory ceramic fibre products and foundry consumables for industrial buyers in Europe, the Gulf and Southeast Asia. Quality, compliance and markets.',
  path: '/company',
});

/** Surface levels for #about, #quality, #compliance, #markets. */
const levels: Level[] = [1, 3, 1, 2];

const fileExists = (href: string) => existsSync(join(process.cwd(), 'public', href));

export default function Page() {
  const [about, ...rest] = company.sections;
  return (
    <>
      <div>
        {/* Sticky sub-nav — anchored sections on one page */}
        <nav aria-label="Company sections" className="sticky top-0 z-30 border-b border-border bg-white">
          <Container>
            <ul className="-mx-3 flex gap-1 overflow-x-auto">
              {company.sections.map((s) => (
                <li key={s.id} className="shrink-0">
                  <a
                    href={`#${s.id}`}
                    className="block px-3 py-4 text-[15px] font-medium text-navy decoration-1 underline-offset-[6px] hover:underline"
                  >
                    {s.nav}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>

        <Sections>
          {/* #about, opening with the page heading */}
          <Section level={levels[0]!} id={about!.id} labelledBy="page-title" className="!pt-(--space-block)">
            <Container>
              <div className="grid gap-(--space-group) lg:grid-cols-12 lg:gap-6">
                <div className="lg:col-span-7 lg:pr-10">
                  <div className="reveal">
                    <Eyebrow>{company.intro.eyebrow}</Eyebrow>
                    <h1 id="page-title" className="t-display mt-5 text-navy">
                      {company.intro.heading}
                    </h1>
                  </div>
                  <p className="reveal t-lead mt-5 text-slate" style={{ '--i': 1 } as React.CSSProperties}>
                    {company.intro.standfirst}
                  </p>
                  <div className="reveal mt-(--space-block) border-t border-border pt-(--space-group)" style={{ '--i': 2 } as React.CSSProperties}>
                    <h2 className="t-h3 text-navy">{about!.heading}</h2>
                    <Prose className="flow t-body mt-5 text-ink">
                      {about!.body.map((p) => (
                        <p key={p.slice(0, 32)}>
                          <Rich text={p} />
                        </p>
                      ))}
                    </Prose>
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          {rest.map((s, idx) => (
            <Section key={s.id} level={levels[idx + 1]!} id={s.id} labelledBy={`${s.id}-heading`}>
              <Container>
                <div className="grid gap-(--space-group) lg:grid-cols-12 lg:gap-6">
                  <div className="lg:col-span-7 lg:pr-10">
                    <SectionHeading id={`${s.id}-heading`} eyebrow={s.eyebrow}>
                      {s.heading}
                    </SectionHeading>
                    <Prose className="flow t-body mt-(--space-group) text-ink">
                      {s.body.map((p) => (
                        <p key={p.slice(0, 32)}>
                          <Rich text={p} />
                        </p>
                      ))}
                    </Prose>
                  </div>
                  <div className="lg:col-span-5">
                    {'list' in s && s.list && (
                      <div className="rounded-brand border border-border bg-white p-5 lg:p-6">
                        <h3 className="t-label text-slate">{s.list.heading}</h3>
                        <ul className="mt-4">
                          {s.list.items.map((item) => (
                            <li key={item} className="t-body flex gap-3 border-b border-border py-3 last:border-b-0">
                              <span aria-hidden className="mt-[13px] h-px w-3 shrink-0 bg-navy" />
                              <span>
                                <Rich text={item} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {'downloads' in s && s.downloads && (
                      <div className="rounded-brand border border-border bg-white p-5 lg:p-6">
                        <h3 className="t-label text-slate">{s.downloads.heading}</h3>
                        <ul className="mt-4">
                          {s.downloads.items.map((d) => (
                            <li key={d.href} className="t-body border-b border-border py-3 last:border-b-0">
                              {fileExists(d.href) ? (
                                <a href={d.href} className="link" download>
                                  {d.label} <span className="t-data text-slate">PDF</span>
                                </a>
                              ) : (
                                <span>
                                  {d.label} <span className="t-small text-slate">— on request</span>
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                        <p className="t-small mt-4 text-slate">
                          <Rich text={s.downloads.note} />
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Container>
            </Section>
          ))}
        </Sections>
      </div>
      <EnquiryBand />
    </>
  );
}
