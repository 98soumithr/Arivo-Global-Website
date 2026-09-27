import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

export default function NotFound() {
  return (
    <Section level={1}>
      <Container>
        <Eyebrow>404</Eyebrow>
        <h1 className="t-h1 mt-5 text-navy">This page does not exist</h1>
        <p className="t-lead mt-5 max-w-(--container-prose) text-slate">
          The product or page may have moved. The full range is listed on one page.
        </p>
        <div className="mt-(--space-group) flex flex-wrap gap-3">
          <Button href="/products" variant="secondary">
            All products
          </Button>
          <Button href="/contact" variant="outline">
            Contact us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
