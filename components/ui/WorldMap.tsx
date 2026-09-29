'use client';

import { useEffect, useRef } from 'react';

const VB_W = 494.7;
const VB_H = 265.7;

const INDIA = { cx: 347.7, cy: 104.8 };

const REGIONS = [
  { name: 'Europe', cx: 261.1, cy: 57.6 },
  { name: 'USA', cx: 145.7, cy: 72.3 },
  { name: 'The Gulf', cx: 322.9, cy: 95.9 },
  { name: 'Southeast Asia', cx: 390.3, cy: 130.9 },
];

function arcPath(from: { cx: number; cy: number }, to: { cx: number; cy: number }) {
  const dx = to.cx - from.cx;
  const dy = to.cy - from.cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const sweep = to.cx < from.cx ? 1 : 0;
  return `M${from.cx},${from.cy} A${dist * 0.8},${dist * 0.5} 0 0,${sweep} ${to.cx},${to.cy}`;
}

const basePath = process.env.NEXT_EXPORT === '1' ? '/Arivo-Global-Website' : '';

export function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const routes = svg.querySelectorAll<SVGPathElement>('[data-route]');
    const dots = svg.querySelectorAll<SVGCircleElement>('[data-dot]');
    const labels = svg.querySelectorAll<SVGGElement>('[data-label]');

    if (!reducedMotion) {
      routes.forEach((path) => {
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
      });
      dots.forEach((d) => { d.style.opacity = '0'; d.style.transform = 'scale(0)'; d.style.transformOrigin = 'center'; });
      labels.forEach((l) => { l.style.opacity = '0'; l.style.transform = 'translateY(4px)'; });
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        if (reducedMotion) { io.disconnect(); return; }

        routes.forEach((path, i) => {
          const len = path.getTotalLength();
          path.style.transition = `stroke-dashoffset ${1200 + i * 200}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 300}ms`;
          path.style.strokeDashoffset = '0';
        });

        dots.forEach((d, i) => {
          d.style.transition = `opacity 500ms ease ${800 + i * 300}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${800 + i * 300}ms`;
          d.style.opacity = '1';
          d.style.transform = 'scale(1)';
        });

        labels.forEach((l, i) => {
          l.style.transition = `opacity 600ms ease ${1200 + i * 300}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${1200 + i * 300}ms`;
          l.style.opacity = '1';
          l.style.transform = 'none';
        });

        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      aria-hidden
      className="h-full w-full"
    >
      {/* Real world map from CC0 Wikimedia Commons SVG */}
      <image
        href={`${basePath}/images/world-map.svg`}
        x="0"
        y="0"
        width={VB_W}
        height={VB_H}
        opacity="0.15"
        style={{ filter: 'brightness(2)' }}
      />

      {/* Shipping route arcs from India to each region */}
      {REGIONS.map((r) => (
        <path
          key={r.name}
          data-route
          d={arcPath(INDIA, r)}
          stroke="url(#routeGrad)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
      ))}

      {/* India origin dot with soft glow */}
      <circle cx={INDIA.cx} cy={INDIA.cy} r="6" className="fill-harbour/15" />
      <circle cx={INDIA.cx} cy={INDIA.cy} r="3" className="fill-harbour" />

      {/* Region destination dots */}
      {REGIONS.map((r) => (
        <circle key={r.name} data-dot cx={r.cx} cy={r.cy} r="2.5" className="fill-white" />
      ))}

      {/* Region labels */}
      {REGIONS.map((r) => (
        <g key={`label-${r.name}`} data-label>
          <text
            x={r.cx}
            y={r.cy - 8}
            textAnchor="middle"
            className="fill-white text-[6px] font-semibold tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {r.name.toUpperCase()}
          </text>
        </g>
      ))}

      <defs>
        <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(64 101 162)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="rgb(64 101 162)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
