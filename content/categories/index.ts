import type { CategoryContent } from '@/lib/schema';

/** Category order is navigation order. Facets are declared per category and are empty at launch. */
export const categories: CategoryContent[] = [
  {
    slug: 'foundry-consumables',
    name: 'Foundry consumables',
    summary: 'Feeding, pouring, melting and sampling consumables for the casting floor.',
    range: 'Feeder sleeves, crucibles, tap-out cones, pouring cups and sampling spoons',
    intro: [
      'The consumables a foundry burns through every shift: sleeves that raise feeder yield, crucibles specified to the metal and furnace, cones that seal a tap hole, cups that give the pour a clean start, and spoons that take a representative sample.',
      'Most of these parts follow the casting or the furnace rather than a catalogue. Send a drawing, a sample or the part you currently use and we will quote an equivalent or a better-suited alternative.',
    ],
    facets: [],
    seo: {
      title: 'Foundry consumables',
      description:
        'Feeder sleeves, crucibles, tap-out cones, pouring cups and ceramic fibre sampling spoons for iron, steel, aluminium and copper-base foundries.',
    },
  },
  {
    slug: 'hot-gas-filtration',
    name: 'Hot gas filtration',
    summary: 'Rigid ceramic fibre elements that filter dust from gas above the limit of fabric media.',
    range: 'Filter candles in alumino-silicate and AES fibre, new and replacement',
    intro: [
      'Filtering hot means the filter can sit upstream of heat recovery, so the heat in the gas stays available to the plant. Rigid ceramic fibre candles make that possible where fabric media would fail.',
      'Most enquiries are for replacement elements in housings already installed. A sample element, a drawing or the flange detail is enough to quote from.',
    ],
    facets: [],
    seo: {
      title: 'Hot gas filtration',
      description:
        'Ceramic fibre filter candles for hot gas dust separation in waste-to-energy, glass, cement, metals and process off-gas duty.',
    },
  },
  {
    slug: 'thermal-insulation',
    name: 'Thermal insulation',
    summary: 'Board, shapes, sections and seals for furnaces, kilns, burners and hot pipework.',
    range: 'Boards, gaskets, burner shapes and pipe sections — flat, cut or formed to drawing',
    intro: [
      'Rigid and formed ceramic fibre for the positions in a furnace, kiln or hot line where blanket is not enough: linings that take a fixing, joints that must keep sealing through the thermal cycle, burner openings that shape a flame, and pipework that needs an even wall.',
      'Almost all of it is supplied to drawing. Tell us the position, the duty and how the part is supported, and we will recommend the form and grade.',
    ],
    facets: [],
    seo: {
      title: 'Thermal insulation',
      description:
        'Ceramic fibre boards, gaskets, vacuum-formed burner shapes and pipe sections for furnaces, kilns, burners and hot pipework.',
    },
  },
];
