import Link from 'next/link';
import { industries } from '@/lib/content';
import { contact, site } from '@/content/site';
import { company } from '@/content/company';
import { Container } from './Container';
import { Wordmark } from './Wordmark';

const heading = 't-label mb-3 text-light-steel';
const link = 'text-on-navy decoration-1 underline-offset-4 hover:underline';

/** Deep Navy. Industries · Company · Contact. No registration numbers, address or phone by decision. */
export function Footer() {
  return (
    <footer className="on-navy surface-footer grain pt-12 pb-8 text-on-navy lg:pt-16">
      <Container>
        <Wordmark onNavy />
        <p className="t-small mt-3 max-w-[46ch] text-light-steel">{site.tagline}.</p>

        <div className="mt-8 grid gap-8 border-t border-navy-border pt-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-10 lg:pt-10">
          <div>
            <h2 className={heading}>Industries</h2>
            <ul className="t-small space-y-2">
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
            <ul className="t-small space-y-2">
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
            <div className="rounded-brand border border-navy-border p-4 lg:p-5">
              <dl className="t-small space-y-3">
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
              <Link href="/contact#rfq" className="t-small mt-4 inline-block font-semibold text-white underline decoration-1 underline-offset-4 hover:decoration-2">
                Request a quote
              </Link>
            </div>
          </div>
        </div>

        <div className="t-small mt-10 flex flex-col gap-2 border-t border-navy-border pt-6 lg:mt-12 text-light-steel sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/terms" className="text-light-steel decoration-1 underline-offset-4 hover:underline">
                Terms of use
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-light-steel decoration-1 underline-offset-4 hover:underline">
                Privacy notice
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
