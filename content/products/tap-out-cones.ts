import type { ProductContent } from '@/lib/schema';
import { productImages } from '@/lib/images';

const slug = 'tap-out-cones';

export const product: ProductContent = {
  slug,
  name: 'Tap-out cones',
  descriptor: 'Vacuum-formed plugs for furnace tap holes',
  range: 'Vacuum-formed cones — standard sizes, or made to a specific tap-hole geometry',
  category: 'foundry-consumables',
  industries: ['industrial-and-manufacturing'],
  roleInProcess: [
    'The tap hole is the one part of a holding furnace that has to be opened and resealed every cast. Whatever plugs it has to seal reliably against a head of molten aluminium, release cleanly when the furnace is tapped, and neither contaminate the metal nor generate dross on the way out.',
    'Graphite and calcium silicate plugs were the earlier answer and both have drawbacks — graphite wets and is consumed, calcium silicate is heavy and seals less well as it wears. A vacuum-formed ceramic fibre cone is light, is not wetted by aluminium, seats tightly because the material has some give, and leaves the tap hole clean. It is also a consumable at a low enough unit cost to be replaced every tap rather than nursed.',
  ],
  whereUsed: [
    'Aluminium melting and holding furnaces',
    'Billet, slab and ingot casting',
    'Ceramic foam filter boxes and degassing units',
    'Transfer launders and distribution systems',
    'Die casting and sand casting melt shops',
  ],
  available: [
    'Cones vacuum formed from alumino-silicate fibre, including higher-alumina grades for hotter duty.',
    'A range of standard cone sizes covering common tap-hole diameters, and cones made to the tap-hole geometry of a specific furnace.',
    'Related vacuum-formed shapes for the same systems — launder components, filter box parts, distribution plates — on request.',
  ],
  customNote:
    'Tap holes are not standard between furnace builders, and a cone that does not match the taper seals poorly and wears quickly. Send the tap-hole dimensions, a drawing, or a sample of the cone currently in use, and the cone is made to that geometry with the tooling held for repeat orders.',
  faqs: [
    {
      q: 'Why ceramic fibre rather than graphite or calcium silicate?',
      a: 'Ceramic fibre is not wetted by aluminium, so it does not generate dross at the tap hole and leaves the hole clean. It is light to handle, and it has enough compliance to seat tightly against an imperfect tap-hole face. Graphite is consumed; calcium silicate is heavier and seals less well as it wears.',
    },
    {
      q: 'Can you match the cone currently in use?',
      a: "Yes. Send a sample or the dimensions. The original supplier's drawing is not needed.",
    },
    {
      q: 'How many taps does a cone last?',
      a: 'Tap-out cones are normally treated as single-use consumables. The economics work that way deliberately — the unit cost is low enough that replacing every tap is cheaper than a leaking seal or an interrupted cast.',
    },
    {
      q: 'Are other vacuum-formed parts available for the same furnaces?',
      a: 'Yes — launder sections, filter box components, distribution plates and other shapes to drawing, in the same material family.',
    },
    {
      q: 'Are the cones supplied ready to use?',
      a: 'Yes. Cones are supplied finished and dry. No firing or preparation is needed, but keep them dry until use.',
    },
  ],
  related: ['pouring-cups', 'ceramic-fibre-boards', 'ceramic-fibre-sampling-spoons'],
  attributes: {
    fibreChemistry: ['alumino-silicate'],
    formFactor: ['cone', 'moulded shape'],
    customToDrawing: true,
  },
  images: productImages(slug, {
    hero: {
      shot: 'Cone range — several sizes lined up by diameter on seamless off-white ground.',
      alt: 'A range of vacuum-formed tap-out cones in several sizes',
    },
    detail: {
      shot: 'Seating face detail — the tapered flank of one cone, raking light to show the surface.',
      alt: 'Close-up of the tapered seating face of a tap-out cone',
    },
    context: {
      shot: 'Aluminium furnace being tapped into a launder. Licensed stock.',
      alt: 'Molten aluminium running from a furnace tap hole into a launder',
    },
    diagram: {
      shot: 'Cone seated in a tap hole, in section, against the head of molten metal.',
      alt: 'Section diagram of a ceramic fibre cone sealing a furnace tap hole',
    },
  }),
  seo: {
    title: 'Tap-out cones for aluminium furnace tap holes',
    description:
      'Vacuum-formed ceramic fibre tap-out cones that seal against molten aluminium, release cleanly and are not wetted by the metal. Standard sizes or made to your tap-hole geometry.',
  },
};
