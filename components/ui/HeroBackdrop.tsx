import Image from 'next/image';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ImageSlot } from '@/lib/schema';
import { HeroVideo, type VideoSource } from './HeroVideo';

const inPublic = (src: string) => existsSync(join(process.cwd(), 'public', src));
const basePath = process.env.NEXT_EXPORT === '1' ? '/Arivo-Global-Website' : '';

/**
 * Full-bleed backdrop for a dark hero, in layers:
 *   1. the photograph (or the video's poster = its first frame) — the LCP image
 *   2. an optional background video that fades in over it once playing
 *   3. a left-to-right navy tint: dark behind the headline, lighter where the picture carries the frame
 * Without a photograph the section's own gradient shows, with a discreet note of what to supply.
 */
export function HeroBackdrop({ image, video }: { image: ImageSlot; video?: VideoSource[] }) {
  if (inPublic(image.src)) {
    const sources = video?.filter((s) => inPublic(s.src)).map((s) => ({ ...s, src: `${basePath}${s.src}` })) ?? [];
    return (
      <div className="absolute inset-0 overflow-hidden">
        <Image src={image.src} alt="" fill sizes="100vw" quality={70} loading="eager" fetchPriority="high" className="object-cover" />
        {sources.length > 0 && <HeroVideo sources={sources} />}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(15_28_58/0.9)_0%,rgb(15_28_58/0.62)_50%,rgb(15_28_58/0.25)_100%)]"
        />
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
