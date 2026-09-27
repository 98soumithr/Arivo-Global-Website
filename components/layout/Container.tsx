/** 1240px max, 32px gutter desktop / 20px mobile. */
export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[calc(var(--container-page)_+_2*var(--gutter))] px-(--gutter) ${className}`}>{children}</div>;
}

/** Prose variant — clamps to 680px for 60–75 characters per line. */
export function Prose({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`max-w-(--container-prose) ${className}`} style={style}>
      {children}
    </div>
  );
}
