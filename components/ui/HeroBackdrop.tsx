import Image from 'next/image';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ImageSlot } from '@/lib/schema';

/**
 * Full-bleed backdrop for a dark hero. With a photograph: the image fills the section under a solid
 * navy tint for text contrast (no gradients). Without one: deep navy with meridian line-work and a
 * discreet note of the photograph to supply — the section never looks empty and never shifts.
 */
export function HeroBackdrop({ image }: { image: ImageSlot }) {
  const exists = existsSync(join(process.cwd(), 'public', image.src));

  if (exists) {
    return (
      <div aria-hidden className="absolute inset-0">
        <Image src={image.src} alt="" fill sizes="100vw" quality={80} loading="eager" fetchPriority="high" className="object-cover" />
        <div className="absolute inset-0 bg-deep-navy/60" />
      </div>
    );
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 800 800" preserveAspectRatio="xMaxYMid slice" className="absolute top-0 right-0 hidden h-full w-[62%] lg:block" fill="none">
        {[140, 240, 340, 440, 540, 640].map((rx) => (
          <ellipse key={rx} cx="860" cy="400" rx={rx} ry="560" className="stroke-steel" strokeWidth="1" opacity="0.32" vectorEffect="non-scaling-stroke" />
        ))}
        {[120, 260, 400, 540, 680].map((y) => (
          <line key={y} x1="300" x2="800" y1={y} y2={y} className="stroke-steel" strokeWidth="1" opacity="0.16" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <p className="absolute right-(--gutter) bottom-5 hidden max-w-[46ch] text-right text-[12px] leading-[18px] text-light-steel/80 lg:block">
        <span className="t-label block text-[11px]">Photograph to supply</span>
        {image.shot}
        <span className="mt-1 block font-mono">{image.src.replace(/^\//, 'public/')}</span>
      </p>
    </div>
  );
}
