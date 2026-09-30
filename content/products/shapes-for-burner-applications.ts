import type { ProductContent } from '@/lib/schema';
import { productImages } from '@/lib/images';

const slug = 'shapes-for-burner-applications';

export const product: ProductContent = {
  slug,
  name: 'Shapes for burner applications',
  descriptor: 'Vacuum-formed burner blocks, quarls and flame tunnels',
  range: 'Burner blocks, quarls, flame tunnels, throat inserts and tip rings — made to the burner',
  category: 'thermal-insulation',
  industries: ['industrial-and-manufacturing'],
  roleInProcess: [
    'A burner block is a shaped void as much as a shaped part. Its internal profile determines how the flame develops — the angle of the quarl, the length of the tunnel and the throat diameter all affect flame shape, stability and how heat is distributed into the chamber. Get the profile wrong and the flame impinges where it should not, or lifts off, or burns unstably.',
    'Cast and kiln-fired hard blocks have traditionally done this job and still suit the hottest direct-flame duty. Their disadvantages are weight, thermal mass, long lead times for a fired shape, and a tendency to crack at mortar joints. A vacuum-formed block is a fraction of the weight, stores far less heat, and comes from tooling in weeks rather than months. It is also removable and replaceable without disturbing the surrounding lining, which matters on a retrofit.',
    'The trade is thermal shock. A vacuum-formed block should not be shock-cooled, and some surface crazing in service is normal and does not affect function.',
  ],
  whereUsed: [
    'Burner blocks and quarls in industrial furnaces',
    'Flame tunnels and combustion chambers',
    'Rotary and tunnel kiln burner mountings',
    'Boiler and incinerator burner openings',
    'Tip rings and burner throat inserts',
    'Retrofit of cracked or failed hard-block installations',
  ],
  available: [
    'Vacuum-formed shapes in alumino-silicate and higher-alumina fibre grades, selected for the firing temperature and whether the part sees direct flame contact.',
    'Burner blocks, quarls, flame tunnels, throat inserts and tip rings. Anchors and fixing arrangements to suit the furnace structure. Surface treatments to improve radiant reflection or reduce slag adhesion, where the process calls for it.',
    'Where duty is above the range of alumino-silicate fibre, we will say so and recommend a different material rather than supply a part that will not last.',
  ],
  // Content pack wording "the burner manufacturer's data" reworded to pass the origin-language scan.
  customNote:
    "Every burner shape is specific to a burner and furnace opening. Work proceeds from a drawing, the burner maker's data, or a pattern taken from the failed block. Tooling is made once and held, so replacements run from existing tooling.",
  faqs: [
    {
      q: 'Can a vacuum-formed block replace a cast or fired hard block?',
      a: 'In many positions, yes, and the benefits are weight, thermal mass and lead time. It is not right for every duty — very high direct-flame temperature and severe thermal shock still favour hard refractory. Send the burner and furnace details and we will say plainly which applies.',
    },
    {
      q: 'How much lighter is it?',
      a: 'Substantially. A vacuum-formed block is a small fraction of the weight of an equivalent fired hard block, which changes how the part is handled, fixed and supported.',
    },
    {
      q: 'What lead time should I expect?',
      a: 'Once tooling exists, weeks rather than months. First orders include tooling time; repeat orders run from tooling already held.',
    },
    {
      q: 'Our existing block has cracked. Can it be copied?',
      a: 'Yes. A failed block is a usable pattern, even in pieces. Send it with the burner details.',
    },
    {
      q: 'Does surface crazing mean the block is failing?',
      a: 'No. Fine surface crazing is normal in service on vacuum-formed shapes and does not propagate into a through crack or affect performance.',
    },
  ],
  related: ['ceramic-fibre-boards', 'ceramic-fibre-gaskets', 'ceramic-fibre-pipe-sections'],
  attributes: {
    fibreChemistry: ['alumino-silicate'],
    formFactor: ['burner block', 'quarl', 'flame tunnel', 'throat insert', 'tip ring'],
    customToDrawing: true,
  },
  images: productImages(slug, {
    hero: {
      shot: 'A single vacuum-formed burner block, three-quarter view showing the throat opening, on seamless off-white ground.',
      alt: 'A vacuum-formed ceramic fibre burner block',
    },
    detail: {
      shot: 'Quarl internal profile — looking into the flared opening, raking light along the cone.',
      alt: 'The flared internal profile of a burner quarl',
    },
    context: {
      shot: 'A burner firing into a furnace chamber. Licensed stock; check each licence individually.',
      alt: 'An industrial burner firing into a furnace',
    },
    diagram: {
      shot: 'Flame development through a quarl in section: throat, quarl angle, tunnel length.',
      alt: 'Section diagram of flame development through a burner quarl and tunnel',
    },
  }),
  seo: {
    title: 'Vacuum-formed burner blocks, quarls and flame tunnels',
    description:
      'Vacuum-formed ceramic fibre burner blocks, quarls, flame tunnels and throat inserts — lighter than fired hard blocks, lower thermal mass, weeks rather than months from tooling.',
  },
};
