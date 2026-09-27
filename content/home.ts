import type { ImageSlot } from '@/lib/schema';

export const home = {
  hero: {
    eyebrow: 'Refractory and foundry products',
    headline: 'Ceramic fibre and foundry consumables, specified to the process',
    standfirst:
      'Filter candles, boards, burner shapes, gaskets, pipe sections and foundry consumables for industrial plants in Europe, the USA, the Gulf, Southeast Asia and beyond. Quoted from your drawing, your sample or the part already in service.',
    /** Full-bleed backdrop behind the headline: the dark, hot "context" register — never a studio product shot. */
    image: {
      slot: 'backdrop',
      src: '/images/home/hero.jpg',
      ratio: '16:9',
      shot: 'Dark melt-shop scene: molten metal pouring from a ladle, or a furnace mouth glowing. Deep shadows, cool grade, the bright point right of centre so the left third stays dark for the headline. Licensed stock is acceptable.',
      alt: 'Molten metal pouring in a dark foundry melt shop',
    } satisfies ImageSlot,
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
