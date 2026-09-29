import type { ProductContent } from '@/lib/schema';
import { productImages } from '@/lib/images';

const slug = 'insulating-and-exothermic-feeder-sleeves';

export const product: ProductContent = {
  slug,
  name: 'Insulating and exothermic feeder sleeves',
  descriptor: 'Feeder sleeves for sand and investment casting',
  range: 'Insulating and exothermic sleeves — open, blind, oval and neck-down forms',
  category: 'foundry-consumables',
  industries: ['industrial-and-manufacturing'],
  roleInProcess: [
    'Metal contracts as it solidifies. Without a reservoir of liquid metal feeding the casting through that contraction, the shrinkage appears inside the part as porosity, and the casting is scrap.',
    'A feeder only works while it is still liquid. A sand feeder of the same size solidifies at roughly the same rate as the section it is meant to feed, which is why unsleeved feeders have to be so large. An insulating sleeve slows heat loss from the feeder; an exothermic sleeve ignites on contact with the metal and adds heat. Either way the feeder stays liquid longer, which means a smaller feeder does the same work — and feeder metal that does not go into the casting is metal that has to be remelted.',
    'Yield is the number that matters. Moving from unsleeved feeders to insulating sleeves, and from insulating to exothermic, raises the proportion of poured metal that leaves the foundry as saleable castings.',
  ],
  whereUsed: [
    'Green sand and chemically bonded sand moulding',
    'Automatic and high-pressure moulding lines',
    'Jobbing and hand-moulded work',
    'Investment casting',
    'Grey and ductile iron, steel, aluminium and copper-base alloys',
  ],
  available: [
    'Insulating sleeves, exothermic-insulating sleeves, and highly exothermic sleeves — each suited to different section thickness, alloy and moulding method. [CONFIRM: which types are offered]',
    'Open and blind feeder forms. Cylindrical, oval and neck-down geometries, with breaker cores where the feeder has to knock off cleanly. Ram-up sleeves for automatic lines and insert sleeves for jobbing work.',
    'A range of diameters covering small spot feeders through to heavy-section feeders for jobbing iron and steel. [CONFIRM: diameter range]',
  ],
  customNote:
    'Feeder geometry is specific to the casting. Where a standard sleeve does not suit the casting or the pattern plate, tooling is made to drawing and held for repeat orders. Neck-down forms, oval sections and breaker-core combinations are all routine.',
  faqs: [
    {
      q: 'How do I know which sleeve suits my casting?',
      a: 'Feeder selection works from the modulus of the section being fed — the ratio of its volume to its cooling surface area. Send the casting drawing or the details above and we will recommend a sleeve and a feeder size. Where a foundry runs solidification simulation, we will work to the output.',
    },
    {
      q: 'What is the difference between insulating and exothermic?',
      a: 'An insulating sleeve slows heat loss from the feeder. An exothermic sleeve ignites on contact with the metal and actively adds heat, which extends feeding time further and allows a smaller feeder. Exothermic sleeves cost more per piece and pay for themselves through yield on heavier sections and more highly alloyed metals.',
    },
    {
      q: 'Will the sleeves suit an automatic moulding line?',
      a: 'Yes. Ram-up sleeves are made for moulding-line pressures and for use with locating pins. Tell us the line and the moulding pressure.',
    },
    {
      q: 'Are sleeves available with breaker cores?',
      a: 'Yes. A breaker core reduces the contact area between feeder and casting, so the feeder knocks off cleanly and fettling cost drops.',
    },
    {
      q: 'Can you match a sleeve currently bought from another supplier?',
      a: 'In most cases, yes. Send the current sleeve reference, a sample, or the dimensions, and we will quote an equivalent.',
    },
  ],
  related: ['pouring-cups', 'crucibles', 'ceramic-fibre-sampling-spoons'],
  attributes: {
    sleeveType: ['insulating', 'exothermic-insulating', 'highly-exothermic'],
    formFactor: ['open sleeve', 'blind sleeve', 'neck-down', 'oval', 'breaker core'],
    customToDrawing: true,
  },
  images: productImages(slug, {
    hero: {
      shot: 'Sleeve range, several sizes and forms grouped together on seamless off-white ground.',
      alt: 'A range of insulating and exothermic feeder sleeves in several sizes',
    },
    detail: {
      shot: 'Breaker core detail — the underside of a sleeve with its breaker core seated.',
      alt: 'A feeder sleeve with a breaker core at its base',
    },
    context: {
      shot: 'Foundry pouring — molten metal into a sand mould. Licensed stock; Pexels coverage is good.',
      alt: 'Molten metal being poured into a sand mould in a foundry',
    },
    diagram: {
      shot: 'Feeder and casting in section: unsleeved versus sleeved feeder, showing where shrinkage ends up.',
      alt: 'Section diagram comparing an unsleeved feeder with a sleeved feeder and the resulting shrinkage',
    },
  }),
  seo: {
    title: 'Insulating and exothermic feeder sleeves',
    description:
      'Insulating and exothermic feeder sleeves for sand and investment casting — open, blind, oval and neck-down forms, breaker cores, ram-up sleeves for automatic moulding lines.',
  },
};
