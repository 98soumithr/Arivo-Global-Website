import Link from 'next/link';
import { industries, products } from '@/lib/content';
import { contact, site } from '@/content/site';
import { company } from '@/content/company';
import { Rich } from '@/components/ui/Rich';
import { Container } from './Container';
import { Wordmark } from './Wordmark';

const heading = 't-label mb-5 text-light-steel';
const link = 'text-on-navy decoration-1 underline-offset-4 hover:underline';

/** Deep Navy. Products · Industries · Company · Contact. No registration numbers, address or phone by decision. */
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

          <div className="lg:col-span-3">
            <h2 className={heading}>Industries</h2>
            <ul className="t-small space-y-2.5">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`} className={link}>
                    {i.name}
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
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-4">
            <h2 className={heading}>Contact</h2>
            <div className="rounded-brand border border-navy-border p-5 lg:p-6">
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
                  <dt className="text-light-steel">Office hours</dt>
                  <dd>
                    {contact.officeHours} <Rich text={contact.officeHoursConfirm} />
                    <span className="t-data block">{contact.timezone}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-light-steel">Response time</dt>
                  <dd>{site.responseCommitment}</dd>
                </div>
              </dl>
              <Link href="/contact#rfq" className="t-small mt-5 inline-block font-semibold text-white underline decoration-1 underline-offset-4 hover:decoration-2">
                Request a quote
              </Link>
            </div>
          </div>
        </div>

        <div className="t-small mt-(--space-group) border-t border-navy-border pt-6 text-light-steel">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
