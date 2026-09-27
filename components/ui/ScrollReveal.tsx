'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Scroll reveal: elements marked `data-reveal` fade up once, the first time they enter the viewport.
 * - Anything already on screen when the page loads is never hidden (no flash, no LCP/CLS cost).
 * - Nothing is hidden without JavaScript or with prefers-reduced-motion.
 * - Never replays on scroll-back. Stagger comes from `--i` on the element (cards: index within a row).
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-revealed', '');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );

    const fold = window.innerHeight * 0.92;
    for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])')) {
      if (el.getBoundingClientRect().top < fold) {
        el.setAttribute('data-revealed', '');
      } else {
        el.setAttribute('data-reveal-pending', '');
        io.observe(el);
      }
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
