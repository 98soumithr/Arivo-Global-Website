import { Eyebrow } from '@/components/ui/Eyebrow';

/** Eyebrow + H2 pair used at the top of content sections. */
export function SectionHeading({
  id,
  eyebrow,
  children,
  className = '',
  reveal = false,
  onNavy = false,
}: {
  id: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  /** Fade up on scroll — for headings that are not already inside a revealed block. */
  reveal?: boolean;
  /** On level 4/5 grounds. */
  onNavy?: boolean;
}) {
  return (
    <div className={className} data-reveal={reveal || undefined}>
      {eyebrow && <Eyebrow onNavy={onNavy}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`t-h2 ${onNavy ? 'text-white' : 'text-navy'} ${eyebrow ? 'mt-5' : ''}`}>
        {children}
      </h2>
    </div>
  );
}
