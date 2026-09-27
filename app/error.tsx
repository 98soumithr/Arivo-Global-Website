'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button, buttonClass } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

/** Route-level error boundary. Keeps header and footer; offers a retry and a way out. */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section level={1}>
      <Container>
        <Eyebrow>Error</Eyebrow>
        <h1 className="t-h1 mt-5 text-navy">This page could not be loaded</h1>
        <p className="t-lead mt-5 max-w-(--container-prose) text-slate">
          Something went wrong on our side. Try again, or go to the product list. If you were sending an enquiry, you can also email it to us.
        </p>
        <div className="mt-(--space-group) flex flex-wrap gap-3">
          <button type="button" onClick={reset} className={buttonClass('secondary')}>
            Try again
          </button>
          <Button href="/products" variant="outline">
            All products
          </Button>
        </div>
      </Container>
    </Section>
  );
}
