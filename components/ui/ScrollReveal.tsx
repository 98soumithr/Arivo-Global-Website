'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Elements inside a revealed block that animate in sequence, in document order. */
const ITEM = '.t-label, h1, h2, h3, h4, p, li, figure, dl, form, [data-reveal-item]';
const HEADING = '.t-display, .t-h1, .t-h2, .t-h3';
const MAX_STEPS = 8;

/**
 * Scroll reveal, played once per block as it enters the viewport.
 *
 * A `data-reveal` block is choreographed: its label, heading, text and figures animate one after
 * another — headings rise out of a mask, figures unveil bottom-to-top, text fades up. Blocks that
 * are single units (cards: `li`, or `data-reveal="block"`) move as one, staggered by `--i`.
 *
 * Anything already on screen at load is left alone (no flash, no LCP/CLS cost). Nothing is hidden
 * without JavaScript or with prefers-reduced-motion. Never replays on scroll-back.
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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );

    const fold = window.innerHeight * 0.9;
    for (const block of document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])')) {
      if (block.getBoundingClientRect().top < fold) {
        block.setAttribute('data-revealed', '');
        continue;
      }

      const unit = block.tagName === 'LI' || block.dataset.reveal === 'block';
      if (!unit) {
        const items = [...block.querySelectorAll<HTMLElement>(ITEM)].filter((el) => {
          const outer = el.parentElement?.closest(ITEM);
          return !(outer && block.contains(outer));
        });
        items.forEach((el, n) => {
          el.dataset.ri = el.tagName === 'FIGURE' ? 'figure' : el.matches(HEADING) ? 'heading' : 'text';
          el.style.setProperty('--r', String(Math.min(n, MAX_STEPS)));
        });
        if (items.length) block.dataset.revealMode = 'items';
      }

      block.setAttribute('data-reveal-pending', '');
      io.observe(block);
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
