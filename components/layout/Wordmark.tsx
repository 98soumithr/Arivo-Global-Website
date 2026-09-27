/** Horizontal wordmark: ARIVO · thin vertical divider · GLOBAL / PRIVATE LIMITED on two lines.
 *  Navy on light, mist on navy. Until a logo is designed. */
export function Wordmark({ onNavy = false, className = '' }: { onNavy?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${onNavy ? 'text-mist' : 'text-navy'} ${className}`}>
      <span className="font-display text-[24px] leading-none font-semibold tracking-[0.16em]" style={{ marginRight: '-0.16em' }}>
        ARIVO
      </span>
      <span aria-hidden className={`h-7 w-px ${onNavy ? 'bg-steel' : 'bg-burgundy'}`} />
      <span className="flex flex-col font-sans text-[8.5px] leading-[12px] font-medium tracking-[0.38em]">
        <span>GLOBAL</span>
        <span>PRIVATE LIMITED</span>
      </span>
    </span>
  );
}
