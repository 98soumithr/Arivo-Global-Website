import type { ProductContent } from '@/lib/schema';
import { productImages } from '@/lib/images';

const slug = 'ceramic-fibre-pipe-sections';

export const product: ProductContent = {
  slug,
  name: 'Ceramic fibre pipe sections',
  descriptor: 'Pre-formed insulation for hot pipework',
  range: 'Rigid half-sections and multi-segment forms — made to pipe diameter and wall thickness',
  category: 'thermal-insulation',
  industries: ['furnaces-and-process-heat'],
  roleInProcess: [
    'Hot pipework loses heat and heats its surroundings, and both cost money — the first in fuel, the second in personnel protection, in derated equipment and in the cooling load of the space around it. Conventional pipe insulation handles most duty. Above its range, the choices are a fibre blanket wrapped and banded in place, or pre-formed rigid sections.',
    'The case for pre-formed sections is fit and consistency. A vacuum-formed section is made to a fixed inner diameter and wall thickness, so the insulation thickness is the same the whole way round the pipe and the same on every length. Wrapped blanket compresses unevenly, particularly at the overlap, and thin spots are where the surface temperature shows up. Pre-formed sections also present a regular outer surface for cladding.',
    'One point that is frequently misstated: vacuum-formed pipe sections are rigid, not flexible. If a product bends around an elbow, it is blanket wrap — a different product for a different job. Both are available, and we will say which suits the run.',
  ],
  whereUsed: [
    'Steam, exhaust and flue gas lines',
    'Process pipework in refineries and chemical plants',
    'Power generation pipework and headers',
    'Steel and metals plant off-gas ducting',
    'Hot air and hot gas distribution',
    'Personnel protection on accessible hot lines',
  ],
  available: [
    'Pipe sections vacuum formed in alumino-silicate and bio-soluble AES fibre, in half-sections or multi-segment forms depending on diameter. [CONFIRM: which grades are offered]',
    'Made to the pipe outside diameter and the wall thickness the heat loss or surface temperature target requires, in standard segment lengths. [CONFIRM: diameter range and standard segment length]',
    'For elbows, tees, flanges and valve bodies, either shaped sections made to drawing or blanket and board for site fabrication, whichever is more economical for the run.',
  ],
  customNote:
    'Pipe sections are made to drawing as standard — there is no meaningful catalogue for this product, because the geometry follows the pipe. Give the pipe size and the wall thickness required and the tooling is made; for a multi-layer system we will work through the build-up with you.',
  faqs: [
    {
      q: 'Are the sections flexible?',
      a: 'No. Vacuum-formed pipe sections are rigid and self-supporting. If insulation that bends around an elbow is needed, that is blanket pipe wrap, which is also available. We will advise which is right for the run.',
    },
    {
      q: 'What wall thickness do I need?',
      a: 'It follows from the operating temperature and the target surface temperature or heat loss. Give us those and we will work it through, including a multi-layer build-up where a single layer would be impractical.',
    },
    {
      q: 'How are elbows, tees and valves handled?',
      a: 'Either shaped sections made to drawing, or blanket and board for site fabrication. Fabrication on site is usually more economical on a run with many fittings; shaped sections give a better finish and a more consistent thickness.',
    },
    {
      q: 'What holds the sections on the pipe?',
      a: 'Standard banding for most installations. For outdoor or wash-down duty, adhesive and metal cladding over the sections.',
    },
    {
      q: 'Are bio-soluble pipe sections available?',
      a: 'Yes, in AES chemistry.',
    },
  ],
  related: ['ceramic-fibre-boards', 'ceramic-fibre-gaskets', 'shapes-for-burner-applications'],
  attributes: {
    fibreChemistry: ['alumino-silicate', 'aes-bio-soluble'],
    formFactor: ['half-section', 'multi-segment section'],
    customToDrawing: true,
  },
  images: productImages(slug, {
    hero: {
      shot: 'Half-sections nested together, one pair closed around an imaginary pipe, on seamless off-white ground.',
      alt: 'Nested ceramic fibre pipe half-sections',
    },
    detail: {
      shot: 'Butt joint detail between two sections, showing the consistent wall thickness at the joint.',
      alt: 'Butt joint between two ceramic fibre pipe sections',
    },
    context: {
      shot: 'Insulated process pipework in a plant. Licensed stock; check each licence individually.',
      alt: 'Insulated process pipework in an industrial plant',
    },
    diagram: {
      shot: 'Section versus blanket wrap on a pipe: even wall on the section, compression and thin spot at the blanket overlap.',
      alt: 'Diagram comparing even insulation thickness of a pipe section with uneven blanket wrap',
    },
  }),
  seo: {
    title: 'Ceramic fibre pipe sections for hot pipework',
    description:
      'Rigid vacuum-formed ceramic fibre pipe sections made to pipe diameter and wall thickness, in alumino-silicate and AES fibre, for steam, flue gas and process lines.',
  },
};
