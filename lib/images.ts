import type { ImageSlot } from './schema';

interface ShotSpec {
  hero: { shot: string; alt: string };
  detail: { shot: string; alt: string };
  context: { shot: string; alt: string };
  diagram: { shot: string; alt: string };
}

/** Standard four-slot image plan for a product page (content pack, "Per-page image plan").
 *  Photography lands at /public/images/products/[slug]/{hero,detail,context}.jpg.
 *  Diagrams are inline SVG components, addressed as `diagram:[slug]`. */
export function productImages(slug: string, s: ShotSpec): ImageSlot[] {
  return [
    { slot: 'hero', src: `/images/products/${slug}/hero.jpg`, ratio: '4:5', ...s.hero },
    { slot: 'detail', src: `/images/products/${slug}/detail.jpg`, ratio: '1:1', ...s.detail },
    { slot: 'context', src: `/images/products/${slug}/context.jpg`, ratio: '3:2', ...s.context },
    { slot: 'diagram', src: `diagram:${slug}`, ratio: '16:9', ...s.diagram },
  ];
}
