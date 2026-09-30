export interface AgroProduct {
  name: string;
  slug: string;
  image: string;
  category: string;
  label: string;
  meta?: string;
  badges?: string[];
}

export const agroProducts: AgroProduct[] = [
  // ── Dehydrated Products ──
  {
    name: 'Dehydrated Garlic',
    slug: 'dehydrated-garlic',
    image: '/images/products/agro-products/dehydrated-garlic.jpg',
    category: 'Dehydrated Products',
    label: 'Garlic',
    meta: 'Flakes · Chopped · Minced · Powder',
    badges: ['A-grade', '80–100 Mesh powder'],
  },
  {
    name: 'Dehydrated White Onion',
    slug: 'dehydrated-white-onion',
    image: '/images/products/agro-products/dehydrated-white-onion.jpg',
    category: 'Dehydrated Products',
    label: 'White Onion',
    meta: 'Flakes · Chopped · Minced · Powder',
    badges: ['A-grade', '80–100 Mesh powder'],
  },
  {
    name: 'Dehydrated Red/Pink Onion',
    slug: 'dehydrated-red-onion',
    image: '/images/products/agro-products/dehydrated-red-onion.jpg',
    category: 'Dehydrated Products',
    label: 'Red/Pink Onion',
    meta: 'Flakes · Chopped · Minced · Powder',
    badges: ['A-grade', '80–100 Mesh powder'],
  },

  // ── Spices ──
  {
    name: 'Dried Red Chilli',
    slug: 'dried-red-chilli',
    image: '/images/products/agro-products/dried-red-chilli.jpg',
    category: 'Spices',
    label: 'Red Chilli',
    meta: 'Teja · Kashmiri · Guntur · Sannam',
    badges: ['Whole · Flakes · Seeds · Powder'],
  },
  {
    name: 'Cumin Seeds',
    slug: 'cumin-seeds',
    image: '/images/products/agro-products/cumin-seeds.jpg',
    category: 'Spices',
    label: 'Cumin',
    meta: 'Seed length 5–6 mm',
    badges: ['Seeds & Powder'],
  },
  {
    name: 'Dry Ginger',
    slug: 'dry-ginger',
    image: '/images/products/agro-products/dry-ginger.jpg',
    category: 'Spices',
    label: 'Ginger',
    meta: 'Nadia · Rio-de Janeiro',
    badges: ['Flakes & Powder'],
  },
  {
    name: 'Turmeric',
    slug: 'turmeric',
    image: '/images/products/agro-products/turmeric.jpg',
    category: 'Spices',
    label: 'Turmeric',
    meta: 'Curcumin 2–5%',
    badges: ['Fingers & Powder'],
  },
  {
    name: 'Green Chilli Powder',
    slug: 'green-chilli-powder',
    image: '/images/products/agro-products/green-chilli-powder.jpg',
    category: 'Spices',
    label: 'Green Chilli',
    meta: '60–100 Mesh',
    badges: ['Fine powder', 'Hot & spicy'],
  },
  {
    name: 'Moringa Powder',
    slug: 'moringa-powder',
    image: '/images/products/agro-products/moringa-powder.jpg',
    category: 'Spices',
    label: 'Moringa',
    meta: '60–100 Mesh',
    badges: ['Fine powder', 'Vibrant green'],
  },
  {
    name: 'Coriander Seeds',
    slug: 'coriander-seeds',
    image: '/images/products/agro-products/coriander-seeds.jpg',
    category: 'Spices',
    label: 'Coriander',
    meta: '3–5 mm',
    badges: ['Purity 98%+'],
  },

  // ── Fresh Fruits ──
  {
    name: 'Bananas',
    slug: 'bananas',
    image: '/images/products/agro-products/bananas.jpg',
    category: 'Fresh Fruits',
    label: 'G9 Cavendish',
    meta: '18.5–22 cm length',
    badges: ['Reefer FCL export'],
  },
  {
    name: 'Pomegranates',
    slug: 'pomegranates',
    image: '/images/products/agro-products/pomegranates.jpg',
    category: 'Fresh Fruits',
    label: 'Bhagwa variety',
    meta: '3.5–5 kg per box',
    badges: ['Ruby-red arils'],
  },
  {
    name: 'Mangoes',
    slug: 'mangoes',
    image: '/images/products/agro-products/mangoes.jpg',
    category: 'Fresh Fruits',
    label: 'Alphonso & Kesar',
    meta: '200–300 g per fruit',
    badges: ['APEDA certified'],
  },

  // ── Fresh Vegetables ──
  {
    name: 'Green Chillies',
    slug: 'green-chillies',
    image: '/images/products/agro-products/green-chillies.jpg',
    category: 'Fresh Vegetables',
    label: 'G4 variety',
    meta: '6–9 cm length',
    badges: ['High pungency'],
  },
  {
    name: 'Red Onions',
    slug: 'red-onions',
    image: '/images/products/agro-products/red-onions.jpg',
    category: 'Fresh Vegetables',
    label: 'Garwa variety',
    meta: '50–70 mm diameter',
    badges: ['Nashik sourced'],
  },
  {
    name: 'Okra (Lady Finger)',
    slug: 'okra',
    image: '/images/products/agro-products/okra.jpg',
    category: 'Fresh Vegetables',
    label: 'Premium Green',
    meta: '8–10 cm length',
    badges: ['APEDA certified'],
  },

  // ── Pulses ──
  {
    name: 'Chickpeas (Kabuli)',
    slug: 'chickpeas-kabuli',
    image: '/images/products/agro-products/chickpeas-kabuli.jpg',
    category: 'Pulses',
    label: 'Kabuli',
    meta: '8–10 mm, 40–62 count/oz',
    badges: ['Moisture max 12%'],
  },
  {
    name: 'Pigeon Peas (Tur)',
    slug: 'pigeon-peas-tur',
    image: '/images/products/agro-products/pigeon-peas-tur.jpg',
    category: 'Pulses',
    label: 'Whole Tur',
    meta: '6–8 mm grains',
    badges: ['Moisture max 12%'],
  },
];

export const agroCategories = [
  'Dehydrated Products',
  'Spices',
  'Fresh Fruits',
  'Fresh Vegetables',
  'Pulses',
] as const;
