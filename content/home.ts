import type { ImageSlot } from '@/lib/schema';

export const home = {
  hero: {
    eyebrow: 'Refractory and foundry products',
    headline: 'Ceramic fibre and foundry consumables, specified to the process',
    standfirst:
      'Filter candles, boards, burner shapes, gaskets, pipe sections and foundry consumables for plants in Europe, the Gulf and Southeast Asia. Quoted from your drawing, your sample or the part already in service.',
    image: {
      slot: 'hero',
      src: '/images/home/hero.jpg',
      ratio: '4:5',
      shot: 'A single ceramic fibre filter candle standing upright beside a stack of board, edge-on, on seamless off-white ground. Soft key light from above left.',
      alt: 'A ceramic fibre filter candle beside a stack of ceramic fibre board',
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
    heading: 'Supplying industrial buyers across three regions',
    body: 'Production orders travel by sea and urgent replacements by air. Every consignment is export-packed, marked to its packing list and shipped with its documentation set, so it can be received and cleared without follow-up requests.',
    regions: ['Europe', 'The Gulf', 'Southeast Asia'],
    link: { label: 'Inspection and documentation', href: '/company#quality' },
  },
  enquiry: {
    heading: 'Send a drawing, a sample or a part number',
    body: 'Tell us the application and we will recommend the product and quote.',
  },
};
