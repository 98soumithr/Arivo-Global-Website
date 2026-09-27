import Link from 'next/link';
import { products } from '@/lib/content';
import { contact, credentials, site } from '@/content/site';
import { company } from '@/content/company';
import { Rich } from '@/components/ui/Rich';
import { Container } from './Container';
import { Wordmark } from './Wordmark';

const heading = 't-label mb-5 text-light-steel';
const link = 'text-on-navy decoration-1 underline-offset-4 hover:underline';

/** Deep Navy. Products · Company · Contact · Credentials — the credentials block gets real space. */
export function Footer() {
  return (
    <footer className="on-navy bg-deep-navy pt-(--space-block) pb-10 text-on-navy">
      <Container>
        <Wordmark onNavy />
        <p className="t-small mt-5 max-w-[46ch] text-light-steel">{site.tagline}.</p>

        <div className="mt-(--space-group) grid gap-10 border-t border-navy-border pt-(--space-group) sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <h2 className={heading}>Products</h2>
            <ul className="t-small space-y-2.5">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className={link}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className={heading}>Company</h2>
            <ul className="t-small space-y-2.5">
              {company.sections.map((s) => (
                <li key={s.id}>
                  <Link href={`/company#${s.id}`} className={link}>
                    {s.nav}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className={link}>
                  All products
                </Link>
              </li>
              <li>
                <Link href="/contact" className={link}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={heading}>Contact</h2>
            <dl className="t-small space-y-4">
              <div>
                <dt className="text-light-steel">Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className={link}>
                    {contact.email}
                  </a>{' '}
                  <Rich text={contact.emailConfirm} />
                </dd>
              </div>
              <div>
                <dt className="text-light-steel">Phone</dt>
                <dd className="t-data">
                  <Rich text={contact.phone} />
                </dd>
              </div>
              <div>
                <dt className="text-light-steel">WhatsApp</dt>
                <dd className="t-data">
                  <Rich text={contact.whatsapp} />
                </dd>
              </div>
              <div>
                <dt className="text-light-steel">Office hours</dt>
                <dd>
                  {contact.officeHours} <Rich text={contact.officeHoursConfirm} />
                  <br />
                  <span className="t-data">{contact.timezone}</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="sm:col-span-2 lg:col-span-4">
            <h2 className={heading}>Registered details</h2>
            <div className="rounded-brand border border-navy-border p-5 lg:p-6">
              <p className="t-small font-semibold">{site.legalName}</p>
              <address className="t-small mt-2 not-italic">
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    <Rich text={line} />
                  </span>
                ))}
              </address>
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-navy-border pt-5">
                {credentials.map((c) => (
                  <div key={c.label} className="contents">
                    <dt className="t-label pt-0.5 text-light-steel">{c.label}</dt>
                    <dd className="t-data break-words">
                      <Rich text={c.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="t-small mt-(--space-group) flex flex-col gap-2 border-t border-navy-border pt-6 text-light-steel sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p>{site.responseCommitment}</p>
        </div>
      </Container>
    </footer>
  );
}
