import type { ImageSlot } from '@/lib/schema';
import type { VideoSource } from '@/components/ui/HeroVideo';

/** Home page — positioned as a global sourcing and export company.
 *  No product-, industry- or sector-specific language here.
 *  Product detail lives on the product pages; the homepage is about the capability. */
export const home = {
  hero: {
    eyebrow: 'Global sourcing and export',
    headline: 'Sourced to specification, shipped worldwide',
    standfirst:
      'Arivo Global connects buyers with the right products from the right sources. We handle the sourcing, quality checks, export packing, documentation and shipping — so you deal with one partner, not a chain of intermediaries.',
    image: {
      slot: 'backdrop',
      src: '/images/home/hero.jpg',
      ratio: '16:9',
      shot: 'Aerial drone view of a busy container yard — rows of colorful shipping containers stretching into the distance, gantry cranes in frame. Poster frame of the hero video.',
      alt: 'Aerial view of a container yard with rows of colorful shipping containers',
    } satisfies ImageSlot,
    video: [
      { src: '/videos/hero-1080.mp4', type: 'video/mp4', media: '(min-width: 768px)' },
      { src: '/videos/hero-720.mp4', type: 'video/mp4' },
    ] satisfies VideoSource[],
  },
  intro: {
    eyebrow: 'Why Arivo',
    heading: 'One export partner, from requirement to delivery',
    body: 'Sourcing products from overseas usually means coordinating several parties — a supplier, an inspector, a packer and a freight forwarder, each with their own paperwork and timelines. We bring those steps under one roof, so you deal with a single company that understands your requirement and takes responsibility for the entire order.',
    pillars: [
      {
        title: 'Specification-led sourcing',
        body: 'Every order starts from your requirement. We work from a drawing, a sample, a data sheet or a description, and confirm the specification before we quote.',
      },
      {
        title: 'Documented quality',
        body: 'Each consignment is checked against the order before dispatch and shipped with complete documentation — so goods can be received and cleared without follow-up.',
      },
      {
        title: 'Export-ready logistics',
        body: 'Goods are packed for the voyage, marked to the packing list, and shipped by sea or air depending on the timeline.',
      },
    ],
  },
  process: {
    eyebrow: 'How it works',
    heading: 'Three steps to delivery',
    steps: [
      {
        title: 'Share your requirement',
        body: 'Tell us what you need — a product name, a specification, a sample reference or simply a description. We confirm the details and come back with a quote.',
      },
      {
        title: 'We manage the rest',
        body: 'From sourcing and quality checks to export packing and documentation — everything between your order and the shipment is handled by our team.',
      },
      {
        title: 'Delivered to your door',
        body: 'Your consignment is shipped by sea or air, tracked end to end, and delivered with the complete documentation set.',
      },
    ],
  },
  range: {
    eyebrow: 'What we supply',
    heading: 'A growing range of product lines',
    body: 'Our catalogue is expanding as our sourcing network grows. If what you need is not listed yet, send us the requirement — if we can source it to your specification, we will quote it.',
    lines: [
      {
        title: 'Refractory and insulation',
        body: 'Ceramic fibre boards, gaskets, filter candles, burner shapes and pipe insulation for high-temperature applications.',
      },
      {
        title: 'Foundry consumables',
        body: 'Feeder sleeves, crucibles, tap-out cones, pouring cups and sampling spoons for the casting floor.',
      },
      {
        title: 'New lines coming soon',
        body: 'Our sourcing capability extends beyond our current catalogue. Tell us what you need and we will let you know if we can help.',
      },
    ],
    cta: { label: 'Browse the catalogue', href: '/products' },
  },
  markets: {
    eyebrow: 'Markets',
    heading: 'Serving buyers worldwide',
    regionsLabel: 'Markets we supply include',
    body: 'We supply wherever the order takes us. Production orders travel by sea and urgent orders by air. Every consignment is export-packed, marked to its packing list and shipped with its documentation set.',
    regions: ['Europe', 'USA', 'The Gulf', 'Southeast Asia'],
    link: { label: 'Quality and documentation', href: '/company#quality' },
  },
  enquiry: {
    heading: 'Tell us what you need',
    body: 'Share your requirement — a product name, a specification or simply a description — along with the destination. We will come back with a quote and a delivery timeline.',
  },
};
