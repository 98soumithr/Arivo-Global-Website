import Link from 'next/link';
import type { ImageSlot } from '@/lib/schema';
import { Figure } from '@/components/ui/Figure';

interface CardProps {
  href: string;
  name: string;
  /** One-line function. */
  summary: string;
  /** Range subtitle — the card is built around a range, never one fixed specification. */
  range: string;
  image?: ImageSlot;
  label?: string;
  headingLevel?: 2 | 3;
}

/**
 * Category-style card. White, 1px border, 2px radius, 20px padding, no shadow.
 * Hover: border to Harbour Blue and the image scales 1.02 inside a fixed frame. That is the whole interaction.
 */
export function ProductCard({ href, name, summary, range, image, label, headingLevel = 3 }: CardProps) {
  const Heading = `h${headingLevel}` as 'h3';
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-brand border border-border bg-white p-5 transition-colors duration-150 ease-out hover:border-harbour"
    >
      {image && (
        <Figure
          image={image}
          frame="3:2"
          compact
          hoverScale
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, calc(100vw - 80px)"
          className="mb-5"
        />
      )}
      {label && <p className="t-label mb-2 text-burgundy">{label}</p>}
      <Heading className="t-h3 text-navy decoration-1 underline-offset-4 group-hover:underline">{name}</Heading>
      <p className="t-body mt-2 flex-1 text-ink">{summary}</p>
      <p className="t-small mt-5 border-t border-border pt-4 text-slate">{range}</p>
    </Link>
  );
}
