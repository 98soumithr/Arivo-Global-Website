import type { ProductContent } from '@/lib/schema';
import { productImages } from '@/lib/images';

const slug = 'ceramic-fibre-boards';

export const product: ProductContent = {
  slug,
  name: 'Ceramic fibre boards',
  descriptor: 'Rigid board for hot-face and back-up lining',
  range: 'Ceramic fibre board — a range of densities, hot face and back-up, flat or machined to drawing',
  category: 'thermal-insulation',
  industries: ['industrial-and-manufacturing'],
  roleInProcess: [
    'A furnace lining is a compromise between thermal performance and mechanical duty. Blanket insulates well but carries no load and erodes in high-velocity gas. Dense brick carries load but stores heat, which is paid for on every heat-up.',
    'Board sits between the two: low enough in thermal mass to cycle economically, rigid enough to span an opening, hold an edge and take a fixing. That combination is why board ends up in the positions that move — doors, covers, kiln car decks — and in back-up positions behind brick where the lining has to stay dimensionally stable for years.',
    'Board also machines cleanly, so it can be cut and fitted to a furnace rather than formed in place.',
  ],
  whereUsed: [
    'Furnace and kiln linings, hot face and back-up',
    'Kiln car decks and covers',
    'Furnace and kiln doors',
    'Ladle and tundish covers',
    'Baffles, partitions and thermal breaks',
    'Back-up insulation behind refractory brick',
    'Expansion joints and seals',
  ],
  available: [
    'Board across the alumino-silicate range, in bio-soluble AES, and in zirconia-reinforced grades for higher-duty positions.',
    'Standard sheet sizes and a full thickness ladder, in a range of densities. Density is selected for the mechanical duty of the position rather than for thermal performance — a back-up layer and an unsupported kiln car deck are different products in the same material family, and we will advise which applies.',
    'Supplied flat, or machined: notches, holes, rebates, bevels, curved profiles and finished components to drawing.',
  ],
  customNote:
    'Board is straightforward to machine, which makes it the most flexible product in the range for custom work. Send a drawing or a pattern and the finished part is supplied rather than flat sheet to be cut on site. For repeat components the pattern is held.',
  faqs: [
    {
      q: 'How do I choose a density?',
      a: 'By mechanical duty, not by temperature. Density governs rigidity, resistance to gas erosion, and how far a board can span without sagging at temperature. Tell us how the board is supported and we will recommend one.',
    },
    {
      q: 'Can board be machined to a finished shape?',
      a: 'Yes — notches, holes, bevels, curved profiles and finished components to drawing. For most customers this is cheaper than buying sheet and cutting it on site, and it removes the dust-handling step from the plant.',
    },
    {
      q: 'What is the difference between board and blanket?',
      a: 'Board is rigid and self-supporting; blanket is flexible and needs mechanical retention. Where a lining has to hold a shape, take a fixing, or resist high-velocity gas, board is the answer.',
    },
    {
      q: 'Will board stand direct flame impingement?',
      a: 'Higher-density and zirconia-reinforced grades are used in burner zones and flame paths. Tell us the burner type and firing temperature and we will advise whether board is appropriate or whether a vacuum-formed shape or hard refractory is the better answer.',
    },
    {
      q: 'Is bio-soluble board available?',
      a: 'Yes, in AES chemistry, for plants that prefer a low bio-persistence material.',
    },
  ],
  related: ['ceramic-fibre-pipe-sections', 'ceramic-fibre-gaskets', 'shapes-for-burner-applications'],
  attributes: {
    fibreChemistry: ['alumino-silicate', 'aes-bio-soluble'],
    formFactor: ['board', 'cut part', 'machined component'],
    customToDrawing: true,
  },
  images: productImages(slug, {
    hero: {
      shot: 'Stack of boards photographed edge-on, several thicknesses, on seamless off-white ground. Key light from above left raking across the edges.',
      alt: 'A stack of ceramic fibre boards seen edge-on',
    },
    detail: {
      shot: 'Machined board component — notches, a bored hole and a bevelled edge — close enough that the cut face texture reads.',
      alt: 'A machined ceramic fibre board part with notches, a hole and a bevel',
    },
    context: {
      shot: 'Industrial furnace interior with board lining visible. Licensed stock only; check each licence individually.',
      alt: 'Interior of an industrial furnace lined with ceramic fibre board',
    },
    diagram: {
      shot: 'Lining build-up in section: hot face board, back-up board, casing — and board behind brick.',
      alt: 'Cross-section diagram of a furnace wall with hot face and back-up board layers',
    },
  }),
  seo: {
    title: 'Ceramic fibre boards for hot-face and back-up lining',
    description:
      'Rigid ceramic fibre board in alumino-silicate, AES and zirconia-reinforced grades, supplied flat or machined to drawing for furnace doors, kiln cars, covers and back-up lining.',
  },
};
