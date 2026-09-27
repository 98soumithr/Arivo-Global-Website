/** Label/eyebrow: IBM Plex Mono, caps, +14% tracking, preceded by a 28×2 rule —
 *  burgundy on light grounds, Steel Blue on navy. One per section at most. */
export function Eyebrow({ children, onNavy = false, as: Tag = 'p' }: { children: React.ReactNode; onNavy?: boolean; as?: 'p' | 'span' }) {
  return (
    <Tag className={`t-label flex items-center gap-3 ${onNavy ? 'text-light-steel' : 'text-slate'}`}>
      <span aria-hidden className={`inline-block h-[2px] w-7 shrink-0 ${onNavy ? 'bg-steel' : 'bg-burgundy'}`} />
      {children}
    </Tag>
  );
}
