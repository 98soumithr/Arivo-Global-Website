'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface ScrollParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ScrollParallax({ children, speed = 0.3, className = '' }: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const offset = (progress - 0.5) * speed * 100;
        el.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
