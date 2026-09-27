import { Eyebrow } from '@/components/ui/Eyebrow';

/** Eyebrow + H2 pair used at the top of content sections. */
export function SectionHeading({ id, eyebrow, children, className = '' }: { id: string; eyebrow?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`t-h2 text-navy ${eyebrow ? 'mt-5' : ''}`}>
        {children}
      </h2>
    </div>
  );
}
