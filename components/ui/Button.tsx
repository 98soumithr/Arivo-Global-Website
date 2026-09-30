import Link from 'next/link';

type Variant = 'primary' | 'primary-navy' | 'secondary' | 'outline' | 'ghost-navy';

const base =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-brand px-5 py-2.5 text-[13px] font-semibold leading-5 transition-colors duration-150 ease-out lg:text-[14px]';

const variants: Record<Variant, string> = {
  // One primary per screen. Never burgundy on navy — use primary-navy there.
  primary: 'bg-burgundy text-white hover:bg-burgundy-hover',
  'primary-navy': 'bg-mist text-navy hover:bg-white',
  secondary: 'bg-navy text-white hover:bg-navy-section',
  outline: 'border border-harbour bg-white text-harbour hover:border-navy hover:text-navy',
  'ghost-navy': 'border border-[rgba(244,244,243,0.4)] text-paper hover:border-paper',
};

export function buttonClass(variant: Variant = 'primary', extra = '') {
  return `${base} ${variants[variant]} ${extra}`.trim();
}

export function Button({
  href,
  variant = 'primary',
  children,
  className = '',
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external)
    return (
      <a href={href} className={buttonClass(variant, className)}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}
