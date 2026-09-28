'use client';

import { useEffect, useRef } from 'react';

interface TimelineStep {
  number: string;
  title: string;
  body: string;
}

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    if (!track || !line || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const viewH = window.innerHeight;
      const start = viewH * 0.75;
      const end = viewH * 0.25;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (rect.height + start - end)));
      line.style.height = `${progress * 100}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={trackRef} className="relative">
      {/* Center line track — left-aligned on mobile, centered on desktop */}
      <div className="absolute left-6 top-0 h-full w-px bg-light-steel/15 lg:left-1/2 lg:-translate-x-1/2">
        <div
          ref={lineRef}
          className="w-full bg-gradient-to-b from-harbour to-light-steel/40"
          style={{ height: '0%', transition: 'none' }}
        />
      </div>

      <div className="space-y-12 lg:space-y-16">
        {steps.map((step, n) => (
          <TimelineItem key={step.title} step={step} index={n} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ step, index }: { step: TimelineStep; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.style.transition = 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)';
          el.style.opacity = '1';
          el.style.transform = 'none';
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative pl-14 lg:pl-0" style={{ willChange: 'opacity, transform' }}>
      {/* Dot on the line */}
      <div className="absolute left-6 top-6 z-10 -translate-x-1/2 lg:left-1/2">
        <span className="block size-3 rounded-full bg-harbour shadow-[0_0_12px_rgba(64,101,162,0.5)]" />
      </div>

      {/* Content card — alternates sides on desktop */}
      <div
        className="lg:w-[calc(50%-32px)]"
        style={isLeft ? {} : { marginLeft: 'auto' }}
      >
        <div className="rounded-brand border border-light-steel/15 bg-[rgba(15,28,58,0.6)] p-6 backdrop-blur-sm lg:p-8">
          <span className="block font-serif text-[64px] leading-none text-harbour/[0.08] lg:text-[80px]">
            {step.number}
          </span>
          <h3 className="t-h3 -mt-3 text-white lg:-mt-5">{step.title}</h3>
          <p className="t-body mt-3 text-on-navy">{step.body}</p>
        </div>
      </div>
    </div>
  );
}
