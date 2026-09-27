import Link from 'next/link';

const cls =
  'inline-flex items-center rounded-brand border border-border bg-white px-3.5 py-2 text-[14px] leading-5 text-harbour transition-colors duration-150 ease-out';

/** Industry / application tag. Links where a target exists. */
export function Chip({ href, children }: { href?: string; children: React.ReactNode }) {
  if (!href) return <span className={cls}>{children}</span>;
  return (
    <Link href={href} className={`${cls} hover:border-harbour hover:text-navy`}>
      {children}
    </Link>
  );
}
