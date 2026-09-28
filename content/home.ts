import type { ImageSlot } from '@/lib/schema';
import type { VideoSource } from '@/components/ui/HeroVideo';

export const home = {
  hero: {
    eyebrow: 'Refractory and foundry products',
    headline: 'Ceramic fibre and foundry consumables, specified to the process',
    standfirst:
      'Filter candles, boards, burner shapes, gaskets, pipe sections and foundry consumables for industrial plants in Europe, the USA, the Gulf, Southeast Asia and beyond. Quoted from your drawing, your sample or the part already in service.',
    /** Full-bleed backdrop behind the headline — trade and logistics, not a single product line.
     *  The image is the video's poster (its first frame); licence record in docs/media-licences.md. */
    image: {
      slot: 'backdrop',
      src: '/images/home/hero.jpg',
      ratio: '16:9',
      shot: 'Aerial view of a container ship guided into port by tugs, early light. Poster frame of the hero video.',
      alt: 'A container ship being guided into port by tugs',
    } satisfies ImageSlot,
    /** Seamless 14 s loop. Desktop gets 1080p; phones get 720p. */
    video: [
      { src: '/videos/hero-1080.mp4', type: 'video/mp4', media: '(min-width: 768px)' },
      { src: '/videos/hero-720.mp4', type: 'video/mp4' },
    ] satisfies VideoSource[],
  },
  categories: {
    eyebrow: 'Products',
    heading: 'Three product families, one enquiry',
  },
  industries: {
    eyebrow: 'Industries',
    heading: 'Where the products are used',
    body: 'Each industry view shows only the products relevant to it.',
  },
  whatWeDo: {
    eyebrow: 'How we work',
    heading: 'Selection first, then supply',
    columns: [
      {
        title: 'Product knowledge',
        body: 'A crucible, a feeder sleeve or a filter candle is chosen by duty, not by catalogue number. We ask about the metal, the gas stream, the bolt load or the support, and recommend the grade and form that suits it — including when the right answer is a different material.',
      },
      {
        title: 'Range',
        body: 'Ten product lines across foundry consumables, hot gas filtration and thermal insulation, in alumino-silicate and bio-soluble AES chemistry. One supplier for the consumables a plant replaces every shift and the parts it replaces every outage.',
      },
      {
        title: 'Service',
        body: 'Most parts are supplied to drawing. A sample, a DXF file or a failed part is enough to quote from, and the pattern is held so repeat orders match the first. Enquiries are answered by someone who can discuss the application.',
      },
    ],
  },
  markets: {
    eyebrow: 'Markets',
    heading: 'Supplying industrial buyers worldwide',
    regionsLabel: 'Markets we supply include',
    body: 'We supply wherever the order is. Production orders travel by sea and urgent replacements by air. Every consignment is export-packed, marked to its packing list and shipped with its documentation set, so it can be received and cleared without follow-up requests.',
    regions: ['Europe', 'USA', 'The Gulf', 'Southeast Asia'],
    link: { label: 'Inspection and documentation', href: '/company#quality' },
  },
  enquiry: {
    heading: 'Send a drawing, a sample or a part number',
    body: 'Tell us the application and we will recommend the product and quote.',
  },
};
