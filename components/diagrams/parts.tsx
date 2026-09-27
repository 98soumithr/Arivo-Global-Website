/* Shared primitives for the product diagrams. All colour comes from theme tokens via Tailwind
 * fill-/stroke- utilities, so a palette change reaches every diagram. Order of use:
 * Navy → Harbour → Steel → Mist; Burgundy only to highlight one point. */

export const VIEW_W = 960;
export const VIEW_H = 540;

/** `uid` scopes the <defs> ids; each diagram renders once per page, so its slug suffices. */
export function DiagramSvg({ uid, title, description, children }: { uid: string; title: string; description: string; children: React.ReactNode }) {
  const id = `dg-${uid}`;
  return (
    <div className="diagram-scroll overflow-x-auto rounded-brand border border-border bg-white">
      <svg
        role="img"
        aria-labelledby={`${id}-t ${id}-d`}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="block h-auto w-full min-w-[680px]"
        fill="none"
      >
        <title id={`${id}-t`}>{title}</title>
        <desc id={`${id}-d`}>{description}</desc>
        <defs>
          <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" className="fill-harbour" />
          </marker>
          <marker id={`${id}-arrow-b`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" className="fill-burgundy" />
          </marker>
          <pattern id={`${id}-fibre`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="8" className="stroke-steel" strokeWidth="1" opacity="0.45" />
          </pattern>
          <pattern id={`${id}-sand`} width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="fill-steel" opacity="0.5" />
            <circle cx="7" cy="7" r="1" className="fill-steel" opacity="0.5" />
          </pattern>
        </defs>
        {children}
      </svg>
    </div>
  );
}

/** References to the per-diagram <defs>: arrow markers and fill patterns. */
export function refs(uid: string) {
  const id = `dg-${uid}`;
  return {
    arrow: `url(#${id}-arrow)`,
    arrowB: `url(#${id}-arrow-b)`,
    fibre: `url(#${id}-fibre)`,
    sand: `url(#${id}-sand)`,
  };
}

type Anchor = 'start' | 'middle' | 'end';

/** Diagram text. `head` = mono caps label; `label` = body label; `note` = secondary. */
export function T({
  x,
  y,
  children,
  kind = 'label',
  anchor = 'start',
  highlight = false,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  kind?: 'head' | 'label' | 'note';
  anchor?: Anchor;
  highlight?: boolean;
}) {
  const cls =
    kind === 'head' ? 'dg-head fill-slate' : kind === 'note' ? 'dg-note fill-slate' : `dg-label ${highlight ? 'fill-burgundy' : 'fill-ink'}`;
  const lines = typeof children === 'string' ? children.split('\n') : null;
  return (
    <text x={x} y={y} textAnchor={anchor} className={cls}>
      {lines
        ? lines.map((l, i) => (
            <tspan key={i} x={x} dy={i === 0 ? 0 : kind === 'note' ? 18 : 21}>
              {l}
            </tspan>
          ))
        : children}
    </text>
  );
}

/** Leader line from a label to the feature it names. */
export function Leader({ d, highlight = false }: { d: string; highlight?: boolean }) {
  return <path d={d} className={highlight ? 'stroke-burgundy' : 'stroke-slate'} strokeWidth="1" />;
}

/** Flow arrow. */
export function Flow({ uid, d, highlight = false, width = 2 }: { uid: string; d: string; highlight?: boolean; width?: number }) {
  const r = refs(uid);
  return (
    <path
      d={d}
      className={highlight ? 'stroke-burgundy' : 'stroke-harbour'}
      strokeWidth={width}
      markerEnd={highlight ? r.arrowB : r.arrow}
      fill="none"
    />
  );
}

/** Dimension line with end ticks. */
export function Dim({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const horizontal = y1 === y2;
  const t = 6;
  return (
    <g className="stroke-slate" strokeWidth="1">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {horizontal ? (
        <>
          <line x1={x1} y1={y1 - t} x2={x1} y2={y1 + t} />
          <line x1={x2} y1={y2 - t} x2={x2} y2={y2 + t} />
        </>
      ) : (
        <>
          <line x1={x1 - t} y1={y1} x2={x1 + t} y2={y1} />
          <line x1={x2 - t} y1={y2} x2={x2 + t} y2={y2} />
        </>
      )}
    </g>
  );
}

export interface DiagramProps {
  title: string;
  description: string;
}
