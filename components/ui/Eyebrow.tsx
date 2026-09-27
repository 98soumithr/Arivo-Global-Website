/** Section label: IBM Plex Mono, caps, +14% tracking. Slate on light grounds, Light Steel on navy.
 *  One per section at most. (The design system's 28×2 rule before the label was removed at the owner's request.) */
export function Eyebrow({ children, onNavy = false, as: Tag = 'p' }: { children: React.ReactNode; onNavy?: boolean; as?: 'p' | 'span' }) {
  return <Tag className={`t-label ${onNavy ? 'text-light-steel' : 'text-slate'}`}>{children}</Tag>;
}
