'use client';

import { useId, useState } from 'react';
import { Rich } from './Rich';

export interface AccordionItem {
  q: string;
  a: string;
}

/** FAQ accordion. Real buttons with aria-expanded/aria-controls, first item open, 200ms height. */
export function Accordion({ items, headingLevel = 3 }: { items: AccordionItem[]; headingLevel?: 2 | 3 | 4 }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const baseId = useId();
  const Heading = `h${headingLevel}` as 'h3';

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="border-t border-border">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.q} className="border-b border-border">
            <Heading className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left lg:py-6"
              >
                <span className="t-h4 text-navy group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{item.q}</span>
                <span aria-hidden className="relative mt-1.5 size-4 shrink-0 text-harbour">
                  <span className="absolute top-1/2 left-0 h-[1.5px] w-4 -translate-y-1/2 bg-current" />
                  <span
                    className={`absolute top-0 left-1/2 h-4 w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-200 ease-out ${isOpen ? 'scale-y-0' : ''}`}
                  />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="t-body max-w-(--container-prose) pb-6 text-ink">
                  <Rich text={item.a} />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
