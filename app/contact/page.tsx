import { categories, productsByCategory } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { contact, site } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section, Sections } from '@/components/layout/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Rich } from '@/components/ui/Rich';
import { RfqForm, type ProductOption } from '@/components/forms/RfqForm';

export const metadata = buildMetadata({
  title: 'Contact and request a quote',
  description:
    'Request a quotation from Arivo Global. Send a drawing, a sample reference or the part in service — we reply to every enquiry within one working day.',
  path: '/contact',
});

const productOptions: ProductOption[] = categories.flatMap((c) =>
  productsByCategory(c.slug).map((p) => ({ slug: p.slug, name: p.name, group: c.name })),
);

const dt = 't-label text-slate';

/** One level-1 section. The form page carries no navy enquiry band — it is the enquiry. */
export default function Page() {
  return (
    <Sections>
      <Section level={1} id="rfq" labelledBy="page-title" className="!pt-(--space-block)">
        <Container>
          <div className="grid gap-(--space-block) lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7 lg:pr-10">
              <div className="reveal">
                <Eyebrow>Contact</Eyebrow>
                <h1 id="page-title" className="t-h1 mt-5 text-navy">
                  Request a quote
                </h1>
              </div>
              <p className="reveal t-lead mt-5 max-w-(--container-prose) text-slate" style={{ '--i': 1 } as React.CSSProperties}>
                Tell us the application and attach what you have — a drawing, a specification, a photograph of the part in service.{' '}
                {site.responseCommitment} <Rich text={site.responseCommitmentConfirm} />
              </p>
              <div className="reveal mt-(--space-group)" style={{ '--i': 2 } as React.CSSProperties}>
                <RfqForm products={productOptions} responseCommitment={site.responseCommitment} />
              </div>
            </div>

            <aside aria-labelledby="direct-heading" className="lg:col-span-5">
              <div className="rounded-brand border border-border bg-paper p-6 lg:sticky lg:top-8 lg:p-8">
                <h2 id="direct-heading" className="t-h3 text-navy">
                  Contact us directly
                </h2>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className={dt}>Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${contact.email}`} className="link">
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className={dt}>Office hours</dt>
                    <dd className="mt-1">
                      {contact.officeHours} <Rich text={contact.officeHoursConfirm} />
                      <span className="t-data block text-slate">
                        {contact.timezone} <Rich text={contact.timezoneConfirm} />
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className={dt}>Response time</dt>
                    <dd className="mt-1">{site.responseCommitment}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

    </Sections>
  );
}
