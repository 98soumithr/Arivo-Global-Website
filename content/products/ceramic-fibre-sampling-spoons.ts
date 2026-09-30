import type { ProductContent } from '@/lib/schema';
import { productImages } from '@/lib/images';

const slug = 'ceramic-fibre-sampling-spoons';

export const product: ProductContent = {
  slug,
  name: 'Ceramic fibre sampling spoons',
  descriptor: 'Sampling spoons for molten metal',
  range: 'Ceramic fibre bowl, steel handle — bowl capacities and handle lengths to suit the furnace',
  category: 'foundry-consumables',
  industries: ['industrial-and-manufacturing'],
  roleInProcess: [
    'A melt analysis is only as good as the sample. Two things spoil a sample, and both come from the spoon rather than the metal.',
    'The first is contamination. A steel or cast iron spoon is itself an alloy, and it gives up some of itself to the sample — which shows up in the analysis as an alloy content the melt does not actually have.',
    'The second is chilling. A steel spoon has high thermal mass and conducts heat away quickly, so the metal in the bowl starts to cool the moment it is lifted. That affects how the sample solidifies, and for a chilled cast iron sample it can affect the reading. Ceramic fibre is inert to the melt and has very low thermal mass, so the sample stays hotter for longer and solidifies the way it should.',
    'The spoon is also lighter, which matters when a melter is reaching across a furnace mouth several times a shift.',
  ],
  whereUsed: [
    'Iron and steel foundry melt shops',
    'Aluminium and non-ferrous melting and holding',
    'Induction and cupola melting',
    'Ladle and launder sampling',
    'Foundry laboratories and spectrometer sample preparation',
  ],
  available: [
    'Spoons with a vacuum-formed ceramic fibre bowl and a steel handle, in standard bowl capacities and with handle lengths to suit the furnace or ladle being sampled.',
    'Bowls in alumino-silicate fibre grades selected for the metal being sampled.',
    'Bowl profiles to requirement, including profiles matched to a particular sample mould or spectrometer sample geometry.',
  ],
  customNote:
    'Where a laboratory works to a specific sample geometry, the bowl can be made to match it, so the sample comes out the shape the analysis method expects. Send the sample mould dimensions or the current spoon and the bowl is made to it.',
  faqs: [
    {
      q: 'Why use a ceramic fibre spoon rather than steel?',
      a: 'Two reasons. A steel spoon contaminates the sample with its own alloy content, which distorts the analysis. And it chills the sample, which changes how it solidifies. Ceramic fibre adds nothing to the melt and has very low thermal mass, so the sample is representative of the metal in the furnace.',
    },
    {
      q: 'How many samples does a spoon take?',
      a: 'It depends on the metal, the temperature and how carefully the spoon is handled. Spoons are consumables and are replaced when the bowl shows cracking or wear rather than on a fixed count. Tell us the sampling frequency and we will advise on ordering.',
    },
    {
      q: 'Does the spoon need preheating?',
      a: 'Yes. Warm the bowl at the furnace mouth before sampling. It protects the bowl and keeps the leading edge of the sample from chilling.',
    },
    {
      q: 'Can the bowl be made to our sample geometry?',
      a: 'Yes. If a laboratory works to a particular sample mould or spectrometer sample shape, send the dimensions and the bowl is made to match.',
    },
    {
      q: 'Can the spoons be used for corrosive melts or fluxed metal?',
      a: 'Standard grades are not intended for aggressive fluxed or corrosive melts. Tell us what is being sampled and we will advise whether a different grade is appropriate or whether ceramic fibre is the wrong choice.',
    },
  ],
  related: ['tap-out-cones', 'crucibles', 'insulating-and-exothermic-feeder-sleeves'],
  attributes: {
    fibreChemistry: ['alumino-silicate'],
    formFactor: ['sampling spoon'],
    customToDrawing: true,
  },
  images: productImages(slug, {
    hero: {
      shot: 'One spoon at full length, bowl and steel handle, laid diagonally on seamless off-white ground.',
      alt: 'A ceramic fibre sampling spoon with a steel handle',
    },
    detail: {
      shot: 'Bowl detail from above and slightly to one side, showing the wall thickness at the rim.',
      alt: 'Close-up of the ceramic fibre bowl of a sampling spoon',
    },
    context: {
      shot: 'A melter taking a sample at a furnace mouth. Licensed stock; foundry coverage is good.',
      alt: 'A sample being taken from molten metal at a furnace',
    },
    diagram: {
      shot: 'Bowl thermal mass versus steel: heat flow out of the sample in each bowl, and the resulting chill edge.',
      alt: 'Diagram comparing heat loss from a sample in a steel spoon and in a ceramic fibre spoon',
    },
  }),
  seo: {
    title: 'Ceramic fibre sampling spoons for molten metal',
    description:
      'Ceramic fibre sampling spoons that do not contaminate or chill the sample — vacuum-formed bowls on steel handles, with bowl profiles matched to your spectrometer sample geometry.',
  },
};
