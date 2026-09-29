import type { ProductContent } from '@/lib/schema';
import { productImages } from '@/lib/images';

const slug = 'ceramic-fibre-filter-candles';

export const product: ProductContent = {
  slug,
  name: 'Ceramic fibre filter candles',
  descriptor: 'Rigid filter elements for hot gas dust separation',
  range: 'Alumino-silicate and AES elements — new vessels and replacements for installed housings',
  category: 'hot-gas-filtration',
  industries: ['industrial-and-manufacturing'],
  roleInProcess: [
    'Fabric filter media has a temperature ceiling. Above it, a plant either cools the gas before filtration — adding a heat exchanger or a quench, and the capital and running cost that go with them — or filters hot.',
    'Candle filtration is the second route. Rigid ceramic fibre elements hang from a tubesheet in a filter vessel, dust collects on the outer surface, and the cake is released by a reverse pulse of compressed air. Each element is self-supporting, so no internal cage is needed, and each is independent, so a filter bank is maintained element by element rather than rebuilt.',
    'The practical consequence is that the filter sits upstream of heat recovery rather than downstream, so the heat still in the gas remains available to the plant.',
  ],
  whereUsed: [
    'Waste-to-energy and municipal incineration flue gas cleaning',
    'Biomass combustion particulate control',
    'Glass furnace off-gas treatment',
    'Metals, foundry and secondary smelting off-gas',
    'Cement and lime kiln bypass gas',
    'Chemical and process off-gas duty',
  ],
  available: [
    'Elements in alumino-silicate fibre, and in bio-soluble alkaline earth silicate (AES) fibre for plants that prefer a low bio-persistence material on site.',
    'Lengths through to three metres as a single piece, with longer assemblies jointed. [CONFIRM: maximum single-piece length] Diameters and flange forms cover the geometries common to installed filter housings; anything outside that range is made to drawing.',
    'Catalytic-coated elements are available on request, for plants combining particulate removal with NOx or dioxin control in a single vessel. [CONFIRM: whether catalytic grades are offered]',
  ],
  extraSections: [
    {
      heading: 'Replacement elements',
      body: [
        // Content pack wording "original system manufacturer's drawing" reworded to pass the origin-language scan.
        "Most enquiries concern elements for filter vessels already installed. The original system builder's drawing is not required. Send one of the elements currently in service, a drawing, or the dimensions and flange detail, and we will quote a direct replacement that seats in the existing tubesheet.",
      ],
    },
  ],
  customNote:
    'Each element geometry runs on its own tool. Where a requirement falls outside the standard range, the tooling is made once and held for repeat orders, so second and subsequent orders run from existing tooling.',
  faqs: [
    {
      q: 'Can you supply elements for a filter housing built by someone else?',
      a: 'Yes, and it is the most common enquiry on this product. A sample element, a drawing, or the dimensions and flange detail is enough to quote from.',
    },
    {
      q: 'What is the difference between alumino-silicate and AES elements?',
      a: 'Both are vacuum-formed ceramic fibre. AES uses an alkaline earth silicate chemistry with low bio-persistence, which some operators prefer for handling and regulatory reasons. Alumino-silicate carries the higher temperature capability. Tell us the gas stream and we will advise which suits.',
    },
    {
      q: 'How are the elements cleaned?',
      a: 'In service, by reverse pulse jet — a short pulse of compressed air that releases the dust cake from the outer surface. Cleaning frequency depends on dust loading and filtration velocity.',
    },
    {
      q: 'What determines element life?',
      a: 'In normal service, thermal cycling and chemical attack rather than wear. Elements operating steadily above the acid dew point last considerably longer than elements exposed to repeated shutdown condensation.',
    },
    {
      q: 'Is the filter vessel supplied as well?',
      a: 'No. The scope is filter elements. We work with the system builders and plant operators who own the vessel.',
    },
  ],
  related: ['ceramic-fibre-boards', 'ceramic-fibre-gaskets', 'shapes-for-burner-applications'],
  attributes: {
    fibreChemistry: ['alumino-silicate', 'aes-bio-soluble'],
    formFactor: ['filter element', 'flanged candle'],
    customToDrawing: true,
  },
  images: productImages(slug, {
    hero: {
      shot: 'Single filter candle, full length, lying diagonally on seamless off-white ground. Soft key light from above left so the fibrous surface reads.',
      alt: 'A single ceramic fibre filter candle shown at full length',
    },
    detail: {
      shot: 'Close-up of the flange and head of one candle, three-quarter view, showing the seating face.',
      alt: 'Flange and head detail of a ceramic fibre filter candle',
    },
    context: {
      shot: 'Element bank hanging from a tubesheet inside a filter vessel — a diagram-style illustration if no licensed photograph exists.',
      alt: 'A bank of filter candles hanging from the tubesheet of a filter vessel',
    },
    diagram: {
      shot: 'Filter position in a flue gas train: furnace, candle filter, heat recovery, stack.',
      alt: 'Diagram of a flue gas train showing the candle filter upstream of heat recovery',
    },
  }),
  seo: {
    title: 'Ceramic fibre filter candles for hot gas filtration',
    description:
      'Rigid ceramic fibre filter elements in alumino-silicate and AES fibre for hot gas dust separation. Direct replacements for installed filter housings, quoted from a sample or drawing.',
  },
};
