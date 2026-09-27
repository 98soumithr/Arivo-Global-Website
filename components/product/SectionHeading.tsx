import { Eyebrow } from '@/components/ui/Eyebrow';

/** Eyebrow + H2 pair used at the top of content sections. */
export function SectionHeading({
  id,
  eyebrow,
  children,
  className = '',
  reveal = false,
}: {
  id: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  /** Fade up on scroll — for headings that are not already inside a revealed block. */
  reveal?: boolean;
}) {
  return (
    <div className={className} data-reveal={reveal || undefined}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`t-h2 text-navy ${eyebrow ? 'mt-5' : ''}`}>
        {children}
      </h2>
    </div>
  );
}
