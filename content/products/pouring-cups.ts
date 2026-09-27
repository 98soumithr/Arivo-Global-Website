import type { ProductContent } from '@/lib/schema';
import { productImages } from '@/lib/images';

const slug = 'pouring-cups';

export const product: ProductContent = {
  slug,
  name: 'Pouring cups',
  descriptor: 'Pouring cups and pour cones for casting',
  range: 'Investment casting cups and vacuum-formed pour cones and conduits',
  category: 'foundry-consumables',
  industries: ['foundry-and-casting', 'aluminium-and-non-ferrous'],
  roleInProcess: [
    "What happens in the first two seconds of a pour determines a good part of the casting's quality. Metal falling into an unprotected sprue breaks up, entrains air, and tears oxide film off its own surface — and those oxides end up in the casting as inclusions and cold shuts.",
    'A pouring cup gives the stream a controlled entry. It presents a target the operator can hit, keeps the sprue full so air is not drawn down with the metal, and calms the stream before it enters the gating system. Because it is the first thing the metal touches, it also has to resist thermal shock at full pouring temperature and must not itself shed material into the stream.',
  ],
  whereUsed: [
    'Investment casting, mounted to the wax sprue and becoming part of the shell',
    'Green sand and chemically bonded sand moulding',
    'Lost foam casting',
    'Gravity and tilt pouring',
    'Iron, steel, aluminium and copper-base alloys',
  ],
  available: [
    'For investment casting — ceramic pouring cups that mount to the wax down-sprue and become part of the shell, in a range of diameters and depths. [CONFIRM: whether investment casting cups are offered]',
    'For sand and lost foam — vacuum-formed ceramic fibre pour cones and pouring conduits, including long conduits for lost foam. Light, thin-walled, resistant to thermal shock, and not wetted by non-ferrous metals. [CONFIRM: length range for pour cones]',
    'Non-wetting coatings for aluminium and copper-base work, where sticking and post-cast cleanup are an issue. [CONFIRM: whether coatings are offered]',
  ],
  customNote:
    'Cup and cone geometry follows the gating system, so most work is to drawing. Send the gating layout or a sample of what is currently used; tooling is made and held for repeat orders.',
  faqs: [
    {
      q: 'What is the difference between a pouring cup and a pour cone?',
      a: 'Mostly the moulding method. Investment casting cups are sintered ceramic, mount to the wax and become part of the shell. Pour cones for sand and lost foam are vacuum-formed ceramic fibre — lighter, thin-walled, and more resistant to thermal shock. Both are available.',
    },
    {
      q: 'Can the cup hold a filter?',
      a: 'Yes, where the design calls for it. Direct-pour arrangements that combine the cup and a ceramic filter clean the metal and calm the stream in one step. Tell us the filter size and we will quote a cup to suit.',
    },
    {
      q: 'Are long conduits available for lost foam?',
      a: 'Yes. Vacuum-formed pouring conduits deliver metal to the pattern in lost foam work and can be made well beyond the length of a conventional cup.',
    },
    {
      q: 'Why does a non-wetting coating matter?',
      a: 'On aluminium and copper-base alloys, metal that wets the cup sticks, which makes post-casting cleanup slower and can pull material into the stream. A non-wetting coating keeps the cup clean and the metal moving.',
    },
    {
      q: 'Can you match a cup already in use?',
      a: 'Yes. Send a sample or a drawing.',
    },
  ],
  related: ['insulating-and-exothermic-feeder-sleeves', 'tap-out-cones', 'crucibles'],
  attributes: {
    fibreChemistry: ['alumino-silicate'],
    formFactor: ['pouring cup', 'pour cone', 'pouring conduit'],
    castingProcess: ['investment', 'sand', 'lost-foam'],
    customToDrawing: true,
  },
  images: productImages(slug, {
    hero: {
      shot: 'An investment casting cup and a vacuum-formed pour cone photographed together on seamless off-white ground.',
      alt: 'A ceramic pouring cup beside a vacuum-formed pour cone',
    },
    detail: {
      shot: 'Cup with a ceramic foam filter seated in its base, viewed from above.',
      alt: 'A pouring cup with a ceramic filter seated in the base',
    },
    context: {
      shot: 'A mould being poured through a cup. Licensed stock; foundry pouring is well covered.',
      alt: 'Molten metal being poured into a mould through a pouring cup',
    },
    diagram: {
      shot: 'Cup position in a gating system: cup, sprue, runner, ingates, casting.',
      alt: 'Diagram of a gating system with the pouring cup at the top of the sprue',
    },
  }),
  seo: {
    title: 'Pouring cups and pour cones for casting',
    description:
      'Investment casting pouring cups and vacuum-formed ceramic fibre pour cones and conduits for sand and lost foam casting, with filter-seat and non-wetting coating options.',
  },
};
