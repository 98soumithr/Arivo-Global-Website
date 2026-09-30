import type { ProductContent } from '@/lib/schema';
import { productImages } from '@/lib/images';

const slug = 'ceramic-fibre-gaskets';

export const product: ProductContent = {
  slug,
  name: 'Ceramic fibre gaskets',
  descriptor: 'High-temperature gaskets and seals',
  range: 'Paper, millboard and vacuum-formed seals — cut to profile from a drawing, DXF or old gasket',
  category: 'thermal-insulation',
  industries: ['industrial-and-manufacturing'],
  roleInProcess: [
    'Furnace and kiln joints are a harder sealing problem than they look. The two faces expand and contract at different rates, they are seldom machined flat, and the joint opens and closes through every thermal cycle. A gasket in that position needs enough compliance to take up the irregularity and enough resilience to keep sealing as the joint works.',
    'The substrate choice follows from that. Where the joint needs compliance at low bolt load — a furnace door, an inspection hatch — a soft paper gasket is right. Where the joint is bolted and the gasket has to resist crushing, a denser millboard or thin rigid board carries the load. Where the seal is a moulded component rather than a flat cut part, a vacuum-formed shape does the job. Suppliers who offer only one substrate end up recommending it for all three.',
  ],
  whereUsed: [
    'Furnace and kiln doors and hatches',
    'Burner mounting plates and flanges',
    'Flue and duct flanges',
    'Heat exchanger joints',
    'Expansion joints and compensating gaps',
    'Domestic and industrial appliance seals',
  ],
  available: [
    'Paper gaskets — thin, flexible, compressible, die-cut or waterjet cut to profile. The usual answer for joints needing compliance at low bolt load.',
    'Millboard and rigid board gaskets — denser, for bolted flanges where the gasket must resist crushing.',
    'Vacuum-formed seals — moulded components rather than flat cut parts, where the seal has a three-dimensional geometry.',
    'Available in alumino-silicate and bio-soluble AES chemistry. Adhesive-backed for installation during a maintenance shutdown, and pre-slit ring forms for flanged pipework.',
  ],
  customNote:
    'Gaskets are almost always cut to profile. Send a drawing, a DXF file, or the old gasket itself — a used gasket is a perfectly good pattern. The pattern is held for repeat supply, which matters on shutdown work where the same set is replaced every outage.',
  faqs: [
    {
      q: 'Which substrate do I need?',
      a: 'It depends on bolt load. Compliance at low load points to paper; resistance to crushing under a bolted flange points to millboard or rigid board. Tell us how the joint is fastened and we will recommend.',
    },
    {
      q: 'Can gaskets be cut to our profile?',
      a: 'Yes, and it is how most are supplied. A drawing, a DXF file, or the old gasket as a pattern is all that is needed.',
    },
    {
      q: 'Are adhesive-backed gaskets available?',
      a: 'Yes. Adhesive backing makes installation quicker during a shutdown, when a gasket has to stay put while a heavy door or flange is refitted.',
    },
    {
      q: 'Is ceramic fibre gasket material asbestos-free?',
      // Content pack wording "a manufactured inorganic material" reworded to pass the origin-language scan.
      a: 'Yes. Ceramic fibre is a man-made inorganic material and contains no asbestos. The safety data sheet covers composition and handling.',
    },
    {
      q: 'Are bio-soluble gaskets available?',
      a: 'Yes, in AES chemistry, for sites that prefer a low bio-persistence material for maintenance work.',
    },
  ],
  related: ['ceramic-fibre-boards', 'ceramic-fibre-pipe-sections', 'shapes-for-burner-applications'],
  attributes: {
    fibreChemistry: ['alumino-silicate', 'aes-bio-soluble'],
    formFactor: ['paper gasket', 'millboard gasket', 'vacuum-formed seal', 'cut part'],
    customToDrawing: true,
  },
  images: productImages(slug, {
    hero: {
      shot: 'Cut gaskets in several profiles — ring, rectangular frame, bolt-hole flange — laid out on seamless off-white ground.',
      alt: 'Ceramic fibre gaskets cut to several profiles',
    },
    detail: {
      shot: 'Edge-on comparison: paper gasket beside millboard, showing the difference in thickness and density.',
      alt: 'Edge view comparing a ceramic fibre paper gasket and a millboard gasket',
    },
    context: {
      shot: 'Furnace door joint with the gasket in place — diagram-style illustration if no licensed photograph exists.',
      alt: 'A gasket seated in a furnace door joint',
    },
    diagram: {
      shot: 'The three substrates against bolt load: paper at low load, millboard under a bolted flange, vacuum-formed where the seal is three-dimensional.',
      alt: 'Diagram mapping paper, millboard and vacuum-formed gaskets against increasing bolt load',
    },
  }),
  seo: {
    title: 'Ceramic fibre gaskets and high-temperature seals',
    description:
      'Ceramic fibre paper, millboard and vacuum-formed gaskets cut to profile for furnace doors, burner plates, flue flanges and heat exchanger joints. Alumino-silicate and AES.',
  },
};
