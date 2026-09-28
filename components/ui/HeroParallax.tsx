'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function HeroParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.transform = `translateY(${y * 0.25}px)`;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={ref} className="relative" style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}

export function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      el.style.opacity = window.scrollY > 100 ? '0' : '1';
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-500"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="t-label text-[10px] tracking-[0.2em] text-light-steel/60">Scroll</span>
        <div className="relative h-10 w-[1px] overflow-hidden">
          <div className="absolute top-0 h-full w-full animate-[scrollDown_2s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-light-steel/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}
