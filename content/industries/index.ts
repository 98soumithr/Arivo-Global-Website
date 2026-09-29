import type { IndustryContent } from '@/lib/schema';

/** Four industry verticals that Arivo Global serves. */
export const industries: IndustryContent[] = [
  {
    slug: 'industrial-and-manufacturing',
    name: 'Industrial & Manufacturing',
    intro: [
      'From foundries and glass furnaces to cement kilns and waste-to-energy plants — industrial operations depend on consumables and insulation products that perform under extreme heat, pressure and chemical exposure.',
      'We source filter candles, crucibles, refractory boards, gaskets, burner shapes and other thermal products to specification, inspect before dispatch and ship with full documentation.',
    ],
    seo: {
      title: 'Industrial & manufacturing products',
      description:
        'Refractory consumables, thermal insulation and hot gas filtration products for foundries, glass, cement, aluminium, waste-to-energy and process heat industries.',
    },
  },
  {
    slug: 'agro-products',
    name: 'Agro Products',
    intro: [
      'Agricultural commodities move in bulk and on tight seasonal windows. Quality grading, phytosanitary compliance and export-standard packing are non-negotiable for international buyers.',
      'We handle sourcing, quality checks, fumigation certificates and shipping for a range of agro products — grains, spices, oilseeds and pulses — so buyers receive documented, export-ready consignments.',
    ],
    seo: {
      title: 'Agro product sourcing and export',
      description:
        'Export-quality agricultural commodities — grains, spices, oilseeds and pulses — sourced, inspected and shipped with full phytosanitary documentation.',
    },
  },
  {
    slug: 'sustainable-packaging',
    name: 'Sustainable Packaging',
    intro: [
      'The shift from single-use plastics to biodegradable alternatives is creating demand for compostable tableware and food packaging made from sugarcane bagasse, rice husk and other natural fibres.',
      'We source eco-friendly plates, bowls, containers and cutlery from certified producers, ensuring food-grade compliance and export packing for international markets.',
    ],
    seo: {
      title: 'Sustainable packaging and eco-friendly tableware',
      description:
        'Biodegradable food packaging and compostable tableware — plates, bowls and containers from sugarcane bagasse and natural fibres, export-ready.',
    },
  },
  {
    slug: 'natural-home-care',
    name: 'Natural Home Care',
    intro: [
      'Plant-based, chemical-free cleaning products are growing fast as consumers and retailers move toward safer, sustainable alternatives for home and commercial use.',
      'We source natural floor cleaners, dishwash liquids, bathroom cleaners and fabric care products from formulation-certified producers, with labelling and packaging suited to the destination market.',
    ],
    seo: {
      title: 'Natural home care products for export',
      description:
        'Plant-based cleaning products — floor cleaners, dishwash, bathroom and fabric care — sourced from certified producers and shipped export-ready.',
    },
  },
];
