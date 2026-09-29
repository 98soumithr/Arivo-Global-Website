import type { ProductContent } from '@/lib/schema';
import { productImages } from '@/lib/images';

const slug = 'crucibles';

export const product: ProductContent = {
  slug,
  name: 'Crucibles',
  descriptor: 'Crucibles for non-ferrous melting and holding',
  range: 'Clay-graphite and silicon carbide grades — laboratory to production capacities',
  category: 'foundry-consumables',
  industries: ['industrial-and-manufacturing'],
  roleInProcess: [
    'Crucible selection is not a single-number decision, and suppliers who present it as one cause their customers problems. Three things decide the right crucible: the metal, the furnace, and where in the temperature range the operation actually runs.',
    "A crucible optimised for aluminium held at moderate temperature for long periods is built for oxidation resistance, because that is what destroys it. A crucible melting copper alloys at high temperature is built for refractoriness and erosion resistance. Run either one in the other's duty and it fails early. Furnace type matters for the same reason — induction heating requires controlled electrical resistivity through the crucible wall, which a gas-fired crucible does not.",
    'So a crucible is specified by an operating window rather than a maximum temperature, and by the metal and furnace alongside it.',
  ],
  whereUsed: [
    'Aluminium and aluminium alloy melting and holding',
    'Copper, brass and bronze melting',
    'Zinc and zinc alloys',
    'Precious metal melting and recovery',
    'Die casting, gravity casting and foundry melt shops',
    'Laboratory and pilot-scale melting',
  ],
  available: [
    'Clay-graphite and silicon carbide bonded crucibles, in grades matched to metal type and furnace. [CONFIRM: which grades and bond systems are offered]',
    'Capacities from laboratory scale through to production sizes. [CONFIRM: capacity range]',
    'Standard crucible forms, plus pouring spouts, tap holes and custom profiles. Ladle liners and transfer pots on request. [CONFIRM: whether ladle liners are offered]',
  ],
  customNote:
    'Where a furnace requires a non-standard profile — a particular height-to-diameter ratio, a bottom recess, a spout position — the part is made to drawing and the pattern held for repeat supply.',
  faqs: [
    {
      q: 'Why does the whole operating temperature range matter, not just the maximum?',
      a: 'Because the low end matters as much as the high end. A crucible run for long periods at moderate temperature fails by oxidation; one run at high temperature fails by erosion and chemical attack. Different bond systems and grades answer those two problems. Tell us the range the furnace actually runs at and the selection can be made correctly.',
    },
    {
      q: 'Can one crucible handle both aluminium and copper alloys?',
      a: 'It is possible but rarely advisable. Mixed-metal use risks contamination and the duty cycles are very different. Where a foundry must do both, we will recommend a grade that compromises acceptably and explain what it costs in life.',
    },
    {
      q: 'Does heavy flux use change the recommendation?',
      a: 'Yes, significantly. Flux attacks the bond. Where flux use is heavy we recommend a grade selected for chemical attack resistance.',
    },
    {
      q: 'Are crucibles available for induction furnaces?',
      a: 'Yes. Induction duty needs controlled electrical resistivity through the crucible wall, so it is a specific grade rather than a general-purpose one. Tell us the furnace make and frequency.',
    },
    {
      q: 'How long should a crucible last?',
      a: 'Life depends far more on handling, charging practice and thermal cycling than on the crucible itself. Foundries that pre-heat correctly, charge carefully and avoid thermal shock get several times the life of those that do not. Conditioning and handling guidance is supplied with every order.',
    },
  ],
  related: ['insulating-and-exothermic-feeder-sleeves', 'tap-out-cones', 'ceramic-fibre-sampling-spoons'],
  attributes: {
    bondSystem: ['clay-graphite', 'silicon-carbide'],
    furnaceType: ['gas-fired', 'induction', 'resistance'],
    formFactor: ['crucible', 'spouted crucible', 'ladle liner'],
    customToDrawing: true,
  },
  images: productImages(slug, {
    hero: {
      shot: 'Single crucible, three-quarter view from slightly above, on seamless off-white ground.',
      alt: 'A single clay-graphite crucible',
    },
    detail: {
      shot: 'Pouring spout detail, tight crop on the lip and spout profile.',
      alt: 'Close-up of the pouring spout on a crucible',
    },
    context: {
      shot: 'Crucible furnace in use — crucible glowing in a furnace or being lifted. Licensed stock.',
      alt: 'A crucible glowing inside a melting furnace',
    },
    diagram: {
      shot: 'Selection matrix: metal against furnace type, with the operating window that decides the grade.',
      alt: 'Matrix diagram relating metal type and furnace type to crucible grade selection',
    },
  }),
  seo: {
    title: 'Crucibles for non-ferrous melting and holding',
    description:
      'Clay-graphite and silicon carbide crucibles for aluminium, copper alloys, zinc and precious metals — selected by metal, furnace and operating window, with spouts and custom profiles.',
  },
};
