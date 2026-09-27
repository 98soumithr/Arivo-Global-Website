import { privacy } from '@/content/privacy';
import { contact } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { Container, Prose } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Rich } from '@/components/ui/Rich';

export const metadata = buildMetadata({
  title: privacy.title,
  description: 'How Arivo Global uses the personal data you send through this website, and your rights over it.',
  path: '/privacy',
});

/** A single level-1 prose page — no enquiry band on a legal page. */
export default function Page() {
  return (
    <Section level={1} labelledBy="page-title" className="!pt-(--space-block)">
      <Container>
        <Prose>
          <Eyebrow>Legal</Eyebrow>
          <h1 id="page-title" className="t-h1 mt-5 text-navy">
            {privacy.title}
          </h1>
          <p className="t-small mt-4 text-slate">
            Last updated <span className="t-data">{privacy.updated}</span> <Rich text={privacy.reviewNote} />
          </p>
          <p className="t-lead mt-(--space-group) text-ink">{privacy.intro}</p>

          {privacy.sections.map((s) => (
            <section key={s.heading} className="mt-(--space-group) border-t border-border pt-(--space-group)">
              <h2 className="t-h3 text-navy">{s.heading}</h2>
              <div className="flow t-body mt-4 text-ink">
                {s.body.map((p) => (
                  <p key={p.slice(0, 32)}>
                    <Rich text={p} />
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-(--space-group) border-t border-border pt-(--space-group)">
            <h2 className="t-h3 text-navy">Contact</h2>
            <p className="t-body mt-4 text-ink">
              Email{' '}
              <a href={`mailto:${contact.email}`} className="link">
                {contact.email}
              </a>{' '}
              with any question about this notice or your data.
            </p>
          </section>
        </Prose>
      </Container>
    </Section>
  );
}
