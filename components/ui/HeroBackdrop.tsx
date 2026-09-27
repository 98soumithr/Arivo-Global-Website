import Image from 'next/image';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ImageSlot } from '@/lib/schema';

/**
 * Full-bleed backdrop for a dark hero. With a photograph: the image fills the section under a
 * left-to-right navy tint (dark behind the headline, lighter where the photo carries the frame).
 * Without one: the section's own gradient shows, with a discreet note of the photograph to supply.
 */
export function HeroBackdrop({ image }: { image: ImageSlot }) {
  const exists = existsSync(join(process.cwd(), 'public', image.src));

  if (exists) {
    return (
      <div aria-hidden className="absolute inset-0">
        <Image src={image.src} alt="" fill sizes="100vw" quality={80} loading="eager" fetchPriority="high" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_28_58/0.9)_0%,rgb(15_28_58/0.62)_50%,rgb(15_28_58/0.25)_100%)]" />
      </div>
    );
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <p className="absolute right-(--gutter) bottom-5 hidden max-w-[46ch] text-right text-[12px] leading-[18px] text-light-steel/80 lg:block">
        <span className="t-label block text-[11px]">Photograph to supply</span>
        {image.shot}
        <span className="mt-1 block font-mono">{image.src.replace(/^\//, 'public/')}</span>
      </p>
    </div>
  );
}
