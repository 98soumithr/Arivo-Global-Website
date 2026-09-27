import { categories, productsByCategory } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { contact, credentials, site } from '@/content/site';
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

/** Surface sequence 1 · 3. The form page carries no navy enquiry band — it is the enquiry. */
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
                      </a>{' '}
                      <Rich text={contact.emailConfirm} />
                    </dd>
                  </div>
                  <div>
                    <dt className={dt}>Phone</dt>
                    <dd className="t-data mt-1">
                      <Rich text={contact.phone} />
                    </dd>
                  </div>
                  <div>
                    <dt className={dt}>WhatsApp</dt>
                    <dd className="t-data mt-1">
                      <Rich text={contact.whatsapp} />
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

      <Section level={3} labelledBy="registered-heading">
        <Container>
          <div className="grid gap-(--space-group) lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <Eyebrow>Registered details</Eyebrow>
              <h2 id="registered-heading" className="t-h2 mt-5 text-navy">
                {site.legalName}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
              <div className="rounded-brand border border-border bg-white p-5 lg:p-6">
                <h3 className={dt}>Registered office</h3>
                <address className="t-body mt-3 not-italic">
                  {contact.address.map((line) => (
                    <span key={line} className="block">
                      <Rich text={line} />
                    </span>
                  ))}
                </address>
              </div>
              <div className="rounded-brand border border-border bg-white p-5 lg:p-6">
                <h3 className={dt}>Registrations</h3>
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5">
                  {credentials.map((c) => (
                    <div key={c.label} className="contents">
                      <dt className="t-label pt-0.5 text-slate">{c.label}</dt>
                      <dd className="t-data break-words">
                        <Rich text={c.value} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Sections>
  );
}
