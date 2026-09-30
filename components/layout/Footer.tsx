import Link from 'next/link';
import { industries } from '@/lib/content';
import { contact, site } from '@/content/site';
import { company } from '@/content/company';
import { Container } from './Container';
import { Wordmark } from './Wordmark';

const heading = 't-label mb-1.5 text-light-steel';
const link = 'text-on-navy decoration-1 underline-offset-4 hover:underline';

/** Deep Navy. Industries · Company · Contact. No registration numbers, address or phone by decision. */
export function Footer() {
  return (
    <footer className="on-navy surface-footer grain pt-3 pb-3 text-on-navy">
      <Container>
        <Wordmark onNavy />
        <p className="t-small mt-1.5 max-w-[46ch] text-light-steel">{site.tagline}.</p>

        <div className="mt-2 grid gap-3 border-t border-navy-border pt-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2">
          <div>
            <h2 className={heading}>Industries</h2>
            <ul className="t-small space-y-0.5">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`} className={link}>
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={heading}>Company</h2>
            <ul className="t-small space-y-0.5">
              {company.sections.map((s) => (
                <li key={s.id}>
                  <Link href={`/company#${s.id}`} className={link}>
                    {s.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className={heading}>Contact</h2>
            <div className="rounded-brand border border-navy-border p-1.5 lg:p-2">
              <dl className="t-small space-y-1">
                <div>
                  <dt className="text-light-steel">Email</dt>
                  <dd>
                    <a href={`mailto:${contact.email}`} className={link}>
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-light-steel">Office hours</dt>
                  <dd>
                    {contact.officeHours}
                    <span className="t-data block">{contact.timezone}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-light-steel">Response time</dt>
                  <dd>{site.responseCommitment}</dd>
                </div>
              </dl>
              <Link href="/contact#rfq" className="t-small mt-1.5 inline-block font-semibold text-white underline decoration-1 underline-offset-4 hover:decoration-2">
                Request a quote
              </Link>
            </div>
          </div>
        </div>

        <div className="t-small mt-2 flex flex-col gap-1 border-t border-navy-border pt-2 text-light-steel sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <Link href="/privacy" className="text-light-steel decoration-1 underline-offset-4 hover:underline">
            Privacy notice
          </Link>
        </div>
      </Container>
    </footer>
  );
}
