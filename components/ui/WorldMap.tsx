'use client';

import { useEffect, useRef } from 'react';

const REGIONS = [
  { name: 'Europe', cx: 510, cy: 155 },
  { name: 'USA', cx: 200, cy: 170 },
  { name: 'The Gulf', cx: 580, cy: 225 },
  { name: 'Southeast Asia', cx: 710, cy: 265 },
];

export function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dots = svg.querySelectorAll<SVGCircleElement>('[data-region-dot]');
    const pulses = svg.querySelectorAll<SVGCircleElement>('[data-region-pulse]');

    dots.forEach((dot, i) => {
      dot.style.opacity = '0';
      dot.style.transition = `opacity 600ms ease ${800 + i * 300}ms`;
    });
    pulses.forEach((pulse, i) => {
      pulse.style.opacity = '0';
      pulse.style.transition = `opacity 600ms ease ${1000 + i * 300}ms`;
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          dots.forEach((d) => { d.style.opacity = '1'; });
          pulses.forEach((p) => { p.style.opacity = '1'; });
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 900 450"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      style={{ mixBlendMode: 'screen' }}
    >
      {/* Simplified world map outline */}
      <path
        d="
          M145,120 Q155,95 180,90 Q200,85 220,95 Q240,80 260,85 Q275,70 290,80
          L310,75 Q330,68 345,78 Q360,72 370,80 L380,78
          M140,125 Q145,140 150,160 Q155,175 148,190 Q140,210 135,230
          Q128,250 130,270 Q135,285 140,295
          M160,160 Q175,155 185,160 Q195,170 200,185 Q205,200 195,215
          Q188,225 180,235 Q170,250 175,265 Q180,280 190,290
          M220,95 L225,110 Q230,125 235,140 Q240,155 235,170
          Q230,185 225,200 Q218,220 220,240 Q225,260 230,275
          M260,85 Q265,100 260,120 Q255,135 260,150
          M385,80 Q395,75 410,78 Q425,72 440,80 Q455,75 470,82
          Q485,78 500,85 Q520,80 535,88 Q555,82 570,90
          Q585,85 600,92 Q615,88 630,95 Q650,90 660,98
          M470,85 Q475,100 478,120 Q480,140 475,160 Q470,180 465,200
          Q458,220 460,240 Q465,260 470,275 Q478,290 485,300
          Q490,315 488,330 Q485,345 480,355
          M520,90 Q518,105 520,120 Q525,135 530,150
          Q535,165 532,180 Q528,200 530,220
          M570,92 Q575,110 578,130 Q580,150 575,170
          Q570,190 572,210 Q575,230 580,250
          Q585,270 582,290 Q578,310 575,325
          M630,98 Q635,115 640,135 Q645,155 642,175
          Q638,195 640,215 Q645,235 650,250
          M660,100 Q665,120 670,140 Q675,160 680,180
          Q685,200 688,220 Q692,240 695,260
          Q698,275 700,290 Q705,310 710,325
          M700,140 Q720,135 740,140 Q760,138 775,145
          Q790,142 800,148
          M700,290 Q720,285 740,295 Q755,300 770,295
          Q785,290 795,298 Q805,305 810,315
          Q815,325 818,340
          M710,148 Q715,165 720,185 Q725,205 728,225
          Q730,245 728,265
          M740,148 Q745,170 750,195 Q755,220 752,245
          Q748,265 745,280
          M775,150 Q780,175 785,200 Q790,225 788,250
        "
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-light-steel"
      />

      {/* Region dots with pulse animation */}
      {REGIONS.map((r) => (
        <g key={r.name}>
          <circle
            data-region-pulse
            cx={r.cx}
            cy={r.cy}
            r="16"
            className="animate-[ping_3s_ease-in-out_infinite] text-harbour"
            fill="currentColor"
            opacity="0.15"
          />
          <circle
            data-region-dot
            cx={r.cx}
            cy={r.cy}
            r="5"
            fill="currentColor"
            className="text-harbour"
          />
        </g>
      ))}
    </svg>
  );
}
