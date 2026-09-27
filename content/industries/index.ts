import type { IndustryContent } from '@/lib/schema';

/** Industries are tags, not a second taxonomy. Each renders a pre-filtered product view. */
export const industries: IndustryContent[] = [
  {
    slug: 'foundry-and-casting',
    name: 'Foundry and casting',
    intro: [
      'In a foundry the thermal problems are short and violent: metal has to stay liquid long enough to feed the casting, enter the mould without tearing its own oxide film, and be sampled without the spoon changing the reading.',
      'Each of those is a consumable decision made every shift. The parts below are the ones that decide yield, inclusion rate and the accuracy of melt analysis.',
    ],
    seo: {
      title: 'Consumables for foundries and casting',
      description:
        'Feeder sleeves, pouring cups, crucibles, tap-out cones and sampling spoons for sand, investment and lost foam foundries.',
    },
  },
  {
    slug: 'aluminium-and-non-ferrous',
    name: 'Aluminium and non-ferrous',
    intro: [
      'Aluminium and copper-base melt shops fight oxidation, dross and metal pick-up. Materials that the metal does not wet, and crucibles specified to the actual operating window, are what keep the melt clean and the furnace running.',
      'The products below cover melting, holding, tapping, pouring and sampling in non-ferrous work.',
    ],
    seo: {
      title: 'Products for aluminium and non-ferrous melting',
      description:
        'Crucibles, tap-out cones, pouring cups, sampling spoons and board for aluminium, copper alloy and zinc melting and holding.',
    },
  },
  {
    slug: 'waste-to-energy',
    name: 'Waste to energy',
    intro: [
      'Incineration and biomass plants have to remove particulate from flue gas that is hot, acidic and variable. Filtering before heat recovery keeps the heat available, but only a rigid ceramic element survives there.',
      'Burner openings and combustion chambers in the same plants use formed shapes that are lighter and quicker to replace than fired hard blocks.',
    ],
    seo: {
      title: 'Filter candles for waste to energy',
      description:
        'Ceramic fibre filter candles for waste-to-energy, municipal incineration and biomass flue gas cleaning, plus burner shapes for incinerator openings.',
    },
  },
  {
    slug: 'glass',
    name: 'Glass',
    intro: [
      'Glass furnace off-gas carries fine particulate at temperatures that rule out fabric filters without first cooling the gas. Hot gas filtration with ceramic candles removes the dust while the heat is still usable.',
    ],
    seo: {
      title: 'Hot gas filtration for glass furnaces',
      description: 'Ceramic fibre filter candles for glass furnace off-gas treatment, supplied new or as replacements for installed housings.',
    },
  },
  {
    slug: 'cement-and-lime',
    name: 'Cement and lime',
    intro: [
      'Kiln bypass gas is hot and dust-laden, and burner mountings on rotary kilns see heavy thermal duty. Both are places where a ceramic fibre part does a job that metal or fabric cannot.',
    ],
    seo: {
      title: 'Products for cement and lime kilns',
      description: 'Filter candles for cement and lime kiln bypass gas, and vacuum-formed burner shapes for rotary kiln burner mountings.',
    },
  },
  {
    slug: 'furnaces-and-process-heat',
    name: 'Furnaces and process heat',
    intro: [
      'Industrial furnaces, kilns, boilers and hot pipework lose money in two ways: heat that escapes, and downtime when a lining, seal or burner block fails. The right rigid or formed insulation answers both.',
      'The products below cover linings, doors, joints, burner openings and hot lines across heat treatment, ceramics, petrochemical and power.',
    ],
    seo: {
      title: 'Insulation for furnaces and process heat',
      description:
        'Ceramic fibre boards, gaskets, burner shapes, pipe sections and filter candles for furnaces, kilns, boilers and process pipework.',
    },
  },
];
