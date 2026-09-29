import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { contact } from '@/content/site';

/** Level 4 — the one navy band per page, immediately before the footer. */
export function EnquiryBand({
  heading = 'Send a drawing, a sample or a part number',
  body = 'Tell us the application and we will recommend the product and quote.',
  href = '/contact#rfq',
}: {
  heading?: string;
  body?: string;
  href?: string;
}) {
  return (
    <Section level={4} labelledBy="enquiry-heading">
      <Container>
        <div data-reveal className="grid gap-(--space-group) lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-7">
            <Eyebrow onNavy>Enquiries</Eyebrow>
            <h2 id="enquiry-heading" className="t-h2 mt-3 text-white">
              {heading}
            </h2>
            <p className="t-body mt-2 text-on-navy">{body}</p>
          </div>
          <div data-reveal-item className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Button href={href} variant="primary-navy">
              Request a quote
            </Button>
            <Button href={`mailto:${contact.email}`} variant="ghost-navy">
              Email us
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Lets <Sections> check surface order when the band is composed into a page. */
EnquiryBand.surfaceLevel = 4 as const;
