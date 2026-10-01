import { terms } from '@/content/terms';
import { contact } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { Container, Prose } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Rich } from '@/components/ui/Rich';

export const metadata = buildMetadata({
  title: terms.title,
  description: 'The terms that apply when you use the Arivo Global website or send us an enquiry.',
  path: '/terms',
});

/** A single level-1 prose page — no enquiry band on a legal page. */
export default function Page() {
  return (
    <Section level={1} labelledBy="page-title" className="!pt-(--space-block)">
      <Container>
        <Prose>
          <Eyebrow>Legal</Eyebrow>
          <h1 id="page-title" className="t-h1 mt-5 text-navy">
            {terms.title}
          </h1>
          <p className="t-small mt-4 text-slate">
            Last updated <span className="t-data">{terms.updated}</span>
          </p>
          <p className="t-lead mt-(--space-group) text-ink">{terms.intro}</p>

          {terms.sections.map((s) => (
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
              with any question about these terms.
            </p>
          </section>
        </Prose>
      </Container>
    </Section>
  );
}
