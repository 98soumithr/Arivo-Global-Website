import Image from 'next/image';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ImageSlot } from '@/lib/schema';
import { Diagram } from '@/components/diagrams';

const ratioClass: Record<ImageSlot['ratio'], string> = {
  '4:5': 'aspect-[4/5]',
  '1:1': 'aspect-square',
  '3:2': 'aspect-[3/2]',
  '16:9': 'aspect-video',
};

function assetExists(src: string) {
  return existsSync(join(process.cwd(), 'public', src));
}

interface FigureProps {
  image: ImageSlot;
  /** Required whenever the image is in a grid — omitting it ships the largest variant to phones. */
  sizes: string;
  /** LCP image only. */
  eager?: boolean;
  /** Overrides the slot ratio with a fixed frame (cards). */
  frame?: ImageSlot['ratio'];
  /** Compact placeholder for cards: filename only. */
  compact?: boolean;
  caption?: string;
  className?: string;
  /** Card hover — image scales 1.02 inside the fixed frame. */
  hoverScale?: boolean;
}

/**
 * Placeholder-aware image. While no file exists at `src`, renders a Mist panel at the exact final
 * aspect ratio with the required shot and target filename — layout never shifts when the real
 * image lands, and no page ships with an invisible gap.
 */
export function Figure({ image, sizes, eager = false, frame, compact = false, caption, className = '', hoverScale = false }: FigureProps) {
  const ratio = ratioClass[frame ?? image.ratio];

  if (image.src.startsWith('diagram:')) {
    return (
      <figure className={className}>
        <Diagram slug={image.src.slice(8)} title={image.alt} description={image.shot} />
        {caption && <figcaption className="t-small mt-3 text-slate">{caption}</figcaption>}
      </figure>
    );
  }

  const exists = assetExists(image.src);

  return (
    <figure className={className}>
      <div className={`relative overflow-hidden rounded-brand ${ratio} ${exists ? 'bg-mist' : ''}`}>
        {exists ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            quality={eager ? 90 : 80}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
            className={`object-cover ${hoverScale ? 'transition-transform duration-150 ease-out group-hover:scale-[1.02]' : ''}`}
          />
        ) : (
          <div
            role="img"
            aria-label={image.alt}
            className={`absolute inset-0 flex flex-col justify-end bg-mist ring-1 ring-steel/50 ring-inset ${compact ? 'p-4' : 'p-5 lg:p-6'} ${hoverScale ? 'transition-transform duration-150 ease-out group-hover:scale-[1.02]' : ''}`}
          >
            <MeridianMark />
            {!compact && (
              <p className="t-small relative max-w-[42ch] text-slate">
                <span className="t-label mb-2 block text-slate">Photograph to supply</span>
                {image.shot}
              </p>
            )}
            <p className={`t-data relative break-all text-slate ${compact ? '' : 'mt-2'}`} style={{ fontSize: 12, lineHeight: '18px' }}>
              {image.src.replace(/^\//, 'public/')}
            </p>
          </div>
        )}
      </div>
      {caption && <figcaption className="t-small mt-3 text-slate">{caption}</figcaption>}
    </figure>
  );
}

/** Hairline meridian arcs, cropped off the top-right corner — the placeholder's only graphic. */
function MeridianMark() {
  return (
    <svg aria-hidden viewBox="0 0 200 200" className="absolute -top-10 -right-10 h-2/3 opacity-40" fill="none">
      {[40, 70, 100].map((rx) => (
        <ellipse key={rx} cx="200" cy="0" rx={rx} ry="160" className="stroke-steel" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      {[60, 110].map((y) => (
        <line key={y} x1="0" x2="200" y1={y} y2={y} className="stroke-steel" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
