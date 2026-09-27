import { Children, isValidElement } from 'react';

/** 1 White · 2 Paper · 3 Mist · 4 Navy enquiry band (one, last) · 5 Blueprint — navy feature section, any number, never next to another dark section. */
export type Level = 1 | 2 | 3 | 4 | 5;

const grounds: Record<Level, string> = {
  1: 'bg-white text-ink',
  2: 'bg-paper text-ink border-t border-border',
  3: 'bg-mist text-ink',
  4: 'on-navy bg-navy text-mist',
  5: 'on-navy blueprint text-on-navy',
};

interface SectionProps {
  level: Level;
  children: React.ReactNode;
  id?: string;
  className?: string;
  labelledBy?: string;
}

/** A page section on one of the four surface levels. Vertical padding is always the `section` token. */
export function Section({ level, children, id, className = '', labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} data-level={level} className={`${grounds[level]} py-(--space-section) ${className}`}>
      {children}
    </section>
  );
}

/**
 * Wraps a page's sections and enforces the surface rules in development:
 * never two consecutive sections on the same level, never two dark sections (4, 5) together,
 * at most one level 4, and level 4 only last.
 */
export function Sections({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'production') {
    const levels = Children.toArray(children)
      .filter(isValidElement)
      .map((el) => (el.props as Partial<SectionProps>).level ?? (el.type as { surfaceLevel?: Level }).surfaceLevel)
      .filter((l): l is Level => l !== undefined);
    levels.forEach((level, i) => {
      if (i > 0 && levels[i - 1] === level)
        throw new Error(`Surface rule: sections ${i} and ${i + 1} are both level ${level}. Sequence: ${levels.join(', ')}`);
    });
    const dark = (l: Level) => l === 4 || l === 5;
    levels.forEach((level, i) => {
      if (i > 0 && dark(level) && dark(levels[i - 1]!))
        throw new Error(`Surface rule: sections ${i} and ${i + 1} are both dark (levels ${levels[i - 1]}, ${level}). Sequence: ${levels.join(', ')}`);
    });
    const navy = levels.filter((l) => l === 4).length;
    if (navy > 1) throw new Error(`Surface rule: ${navy} level-4 sections on one page (max 1). Sequence: ${levels.join(', ')}`);
    if (navy === 1 && levels.at(-1) !== 4)
      throw new Error(`Surface rule: level 4 must be the final section before the footer. Sequence: ${levels.join(', ')}`);
  }
  return <>{children}</>;
}
