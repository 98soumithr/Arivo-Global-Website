/** Inline SVG icons, 1.5px stroke. No icon packs. */
export function ArrowRight({ className = 'size-4' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" strokeLinecap="square" />
    </svg>
  );
}

export function Chevron({ className = 'size-3.5' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="m3.5 6 4.5 4.5L12.5 6" />
    </svg>
  );
}
