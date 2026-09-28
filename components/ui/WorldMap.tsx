'use client';

import { useEffect, useRef } from 'react';

const INDIA = { cx: 640, cy: 240 };

const REGIONS = [
  { name: 'Europe', cx: 480, cy: 145, label: 'EU' },
  { name: 'USA', cx: 180, cy: 165, label: 'US' },
  { name: 'The Gulf', cx: 565, cy: 220, label: 'GF' },
  { name: 'Southeast Asia', cx: 720, cy: 270, label: 'SEA' },
];

function arcPath(from: { cx: number; cy: number }, to: { cx: number; cy: number }) {
  const dx = to.cx - from.cx;
  const dy = to.cy - from.cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const sweep = to.cx < from.cx ? 1 : 0;
  return `M${from.cx},${from.cy} A${dist * 0.8},${dist * 0.5} 0 0,${sweep} ${to.cx},${to.cy}`;
}

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
      labels.forEach((l) => { l.style.opacity = '0'; l.style.transform = 'translateY(8px)'; });
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
      viewBox="0 0 900 420"
      fill="none"
      aria-hidden
      className="h-full w-full"
    >
      {/* Simplified world continents */}
      <path
        d="
          M145,120 Q155,95 180,90 Q200,85 220,95 Q240,80 260,85 Q275,70 290,80 L310,75 Q330,68 345,78 Q360,72 380,78
          M140,125 Q145,140 150,160 Q155,175 148,190 Q140,210 135,230 Q128,250 130,270 Q135,285 140,295
          M160,160 Q175,155 185,160 Q195,170 200,185 Q205,200 195,215 Q188,225 180,235 Q170,250 175,265
          M220,95 L225,110 Q230,125 235,140 Q240,155 235,170 Q230,185 225,200 Q218,220 220,240
          M385,80 Q395,75 410,78 Q425,72 440,80 Q455,75 470,82 Q485,78 500,85 Q520,80 535,88 Q555,82 570,90 Q585,85 600,92 Q615,88 630,95 Q650,90 660,98
          M470,85 Q475,100 478,120 Q480,140 475,160 Q470,180 465,200 Q458,220 460,240 Q465,260 470,275 Q478,290 485,300 Q490,315 488,330
          M520,90 Q518,105 520,120 Q525,135 530,150 Q535,165 532,180 Q528,200 530,220
          M570,92 Q575,110 578,130 Q580,150 575,170 Q570,190 572,210 Q575,230 580,250 Q585,270 582,290
          M630,98 Q635,115 640,135 Q645,155 642,175 Q638,195 640,215 Q645,235 650,250
          M660,100 Q665,120 670,140 Q675,160 680,180 Q685,200 688,220 Q692,240 695,260 Q698,275 700,290 Q705,310 710,325
          M700,140 Q720,135 740,140 Q760,138 775,145 Q790,142 800,148
          M700,290 Q720,285 740,295 Q755,300 770,295 Q785,290 795,298 Q805,305 810,315
          M710,148 Q715,165 720,185 Q725,205 728,225 Q730,245 728,265
          M740,148 Q745,170 750,195 Q755,220 752,245
          M775,150 Q780,175 785,200 Q790,225 788,250
        "
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        className="text-light-steel/20"
      />

      {/* Shipping route arcs from India to each region */}
      {REGIONS.map((r) => (
        <path
          key={r.name}
          data-route
          d={arcPath(INDIA, r)}
          stroke="url(#routeGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      ))}

      {/* India origin dot */}
      <circle cx={INDIA.cx} cy={INDIA.cy} r="5" className="fill-harbour" />
      <circle cx={INDIA.cx} cy={INDIA.cy} r="10" className="fill-harbour/20 animate-[ping_3s_ease-in-out_infinite]" />

      {/* Region destination dots */}
      {REGIONS.map((r) => (
        <circle key={r.name} data-dot cx={r.cx} cy={r.cy} r="4.5" className="fill-white" />
      ))}

      {/* Region labels */}
      {REGIONS.map((r) => (
        <g key={`label-${r.name}`} data-label>
          <text
            x={r.cx}
            y={r.cy - 14}
            textAnchor="middle"
            className="fill-white text-[11px] font-semibold tracking-[0.15em]"
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
