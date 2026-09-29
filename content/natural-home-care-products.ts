export interface HomeCareProduct {
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  volume: string;
  keyBenefits: string[];
}

export const homeCareProducts: HomeCareProduct[] = [
  // ── Home Cleaning ──
  {
    name: 'All-In-One Disinfectant Floor & Surface Cleaner',
    slug: 'floor-surface-cleaner',
    description: 'Plant-based formula that removes dirt, grime and everyday messes across all floor types — tiles, marble, granite, wood, laminate and vinyl. Leaves a non-slippery, streak-free shine with no sticky residue.',
    image: '/images/products/natural-home-care/floor-surface-cleaner.png',
    category: 'Home Cleaning',
    volume: '500 ml',
    keyBenefits: ['Works on all floor types', 'No bleach or ammonia', 'Kids & pet safe'],
  },
  {
    name: 'Natural Bathroom Cleaner',
    slug: 'bathroom-cleaner',
    description: 'Removes soap marks, dirt stains and hard-water residue from bathroom surfaces without harsh chemicals. Plant-powered formula with no chemical smell, safe for skin contact.',
    image: '/images/products/natural-home-care/bathroom-cleaner.png',
    category: 'Home Cleaning',
    volume: '500 ml',
    keyBenefits: ['Removes soap marks & stains', 'No chemical smell', 'Safe for skin'],
  },
  {
    name: 'Natural Tap & Shower Cleaner',
    slug: 'tap-shower-cleaner',
    description: 'Targets white marks, limescale and dull fixtures on taps, shower heads, mixers, glass partitions and stainless steel surfaces. Brings back original shine without bleach, ammonia or harsh acids.',
    image: '/images/products/natural-home-care/tap-shower-cleaner.jpg',
    category: 'Home Cleaning',
    volume: '300 ml',
    keyBenefits: ['Removes hard-water stains', 'Restores shine on fixtures', 'No harsh acids'],
  },
  {
    name: 'Natural Toilet Seat Sanitizer Spray',
    slug: 'toilet-seat-sanitizer',
    description: 'Plant-powered sanitizer spray that eliminates 99.9% of germs on contact. Provides instant antimicrobial protection against bacteria, fungi and viruses. Safe for skin.',
    image: '/images/products/natural-home-care/toilet-seat-sanitizer.png',
    category: 'Home Cleaning',
    volume: '100 ml',
    keyBenefits: ['Kills 99.9% germs', 'Instant protection', 'Safe for skin'],
  },

  // ── Kitchen Cleaning ──
  {
    name: 'Natural Kitchen Stain & Grease Remover',
    slug: 'kitchen-grease-remover',
    description: 'Plant-powered formula that cuts through oil, grease and kitchen stains quickly. Zero chemical smell, no artificial colours, and safe for use around children and pets.',
    image: '/images/products/natural-home-care/kitchen-grease-remover.png',
    category: 'Kitchen Cleaning',
    volume: '300 ml',
    keyBenefits: ['Cuts through oil & grease', 'Zero chemical smell', 'Plant-based formula'],
  },
  {
    name: 'Natural Dishwash Liquid',
    slug: 'dishwash-liquid',
    description: 'Removes heavy oil and grease from dishes with a plant-based formula that causes no dryness, irritation or burning on hands. Free from artificial colour additives.',
    image: '/images/products/natural-home-care/dishwash-liquid.png',
    category: 'Kitchen Cleaning',
    volume: '500 ml',
    keyBenefits: ['Removes heavy oil & grease', 'No skin dryness or irritation', 'Plant-based'],
  },

  // ── Fabric Care ──
  {
    name: 'Natural Fabric Food Stain Remover',
    slug: 'fabric-food-stain-remover',
    description: 'Plant-based stain removal solution for food stains on all fabric types. Gentle on delicate garments while effective on stubborn marks. Safe for skin, children and pets.',
    image: '/images/products/natural-home-care/fabric-food-stain-remover.png',
    category: 'Fabric Care',
    volume: '100 ml',
    keyBenefits: ['Works on all fabric types', 'Gentle on delicates', 'Plant-based'],
  },
  {
    name: 'Xpert Instant Fabric Food Stain Remover',
    slug: 'xpert-food-stain-remover',
    description: 'Advanced triple-action spray formula that tackles over 100 food stains — curry, coffee, tomato, chocolate, ketchup, butter, oil, ice cream and more. One spray, one wipe — no soaking or scrubbing needed.',
    image: '/images/products/natural-home-care/xpert-food-stain-remover.jpg',
    category: 'Fabric Care',
    volume: '100 ml',
    keyBenefits: ['Covers 100+ food stains', 'No soaking needed', 'Colour-safe formula'],
  },
  {
    name: 'Xpert Instant Fabric Ink & Makeup Stain Remover',
    slug: 'xpert-ink-makeup-remover',
    description: 'Spray-based solution for pen ink, lipstick, foundation, eyeliner, mascara and marker stains. Works on shirts, jeans, uniforms, dresses, bags and bedsheets within minutes.',
    image: '/images/products/natural-home-care/xpert-ink-makeup-remover.jpg',
    category: 'Fabric Care',
    volume: '100 ml',
    keyBenefits: ['Removes ink & makeup stains', 'Works within minutes', 'No dry cleaning needed'],
  },

  // ── Surface & Auto Care ──
  {
    name: 'Leather Cleaner & Conditioner',
    slug: 'leather-cleaner',
    description: 'Cleans, conditions and protects leather in one step. Removes dirt, oil marks and scuffs while deep-nourishing leather to prevent cracking and peeling. Works on sofas, car seats, handbags, shoes and office chairs.',
    image: '/images/products/natural-home-care/leather-cleaner.png',
    category: 'Surface & Auto Care',
    volume: '100 ml',
    keyBenefits: ['Cleans + conditions + protects', 'Prevents cracking', 'Non-greasy formula'],
  },
  {
    name: 'Wood Polish & Shiner',
    slug: 'wood-polish',
    description: 'Spray-based wood care solution that restores natural shine to tables, beds, doors, cabinets and shelves. Removes dust and dullness without leaving sticky or oily residue.',
    image: '/images/products/natural-home-care/wood-polish.png',
    category: 'Surface & Auto Care',
    volume: '100 ml',
    keyBenefits: ['Restores natural wood shine', 'No sticky residue', 'Instant results'],
  },
  {
    name: 'Metal Polish & Shiner',
    slug: 'metal-polish',
    description: 'Removes tarnish, oxidation, watermarks and dull buildup from steel, copper, brass, chrome and other metals. Restores original shine to cookware, fixtures, handles and decorative items.',
    image: '/images/products/natural-home-care/metal-polish.png',
    category: 'Surface & Auto Care',
    volume: '100 ml',
    keyBenefits: ['Removes tarnish & oxidation', 'Works on all metals', 'Restores original shine'],
  },
  {
    name: 'Shoe Polish & Shiner',
    slug: 'shoe-polish',
    description: 'Spray-and-wipe formula that refreshes dull shoes and restores a smooth, rich, polished finish. Suitable for formal shoes, boots, school footwear and everyday pairs.',
    image: '/images/products/natural-home-care/shoe-polish.png',
    category: 'Surface & Auto Care',
    volume: '100 ml',
    keyBenefits: ['Instant polished finish', 'No traditional mess', 'Works on all shoe types'],
  },
  {
    name: 'Gadgets & Screen Cleaner',
    slug: 'gadgets-screen-cleaner',
    description: 'Removes fingerprints, oil marks, dust and smudges from mobile phones, laptops, TVs and watches. Delivers a crystal-clear, streak-free finish without damaging screen coatings.',
    image: '/images/products/natural-home-care/gadgets-screen-cleaner.png',
    category: 'Surface & Auto Care',
    volume: '100 ml',
    keyBenefits: ['Streak-free finish', 'Safe for all screens', 'No harsh chemicals'],
  },
  {
    name: 'Motoshine Pro Motorcycle Polish & Shiner',
    slug: 'moto-polish',
    description: 'Multi-surface motorcycle polish that restores gloss to body panels, helmets and trim. Simple spray-and-wipe application delivers instant shine and protection.',
    image: '/images/products/natural-home-care/moto-polish.png',
    category: 'Surface & Auto Care',
    volume: '100 ml',
    keyBenefits: ['Multi-surface use', 'Instant gloss finish', 'Plant-powered formula'],
  },
  {
    name: 'Tyre Polish & Shiner',
    slug: 'tyre-polish',
    description: 'Transforms faded, dull tyres into a deep black premium finish. Long-lasting protection for sidewalls on cars, bikes, scooters and SUVs.',
    image: '/images/products/natural-home-care/tyre-polish.png',
    category: 'Surface & Auto Care',
    volume: '100 ml',
    keyBenefits: ['Deep black finish', 'Long-lasting protection', 'Universal compatibility'],
  },
  {
    name: 'Car Dashboard & Interior Polish',
    slug: 'car-dashboard-polish',
    description: 'Restores shine to dull dashboards, door panels, consoles and interior trims. UV protection for sun-exposed surfaces. Non-toxic, plant-based formula with no artificial colours.',
    image: '/images/products/natural-home-care/car-dashboard-polish.png',
    category: 'Surface & Auto Care',
    volume: '100 ml',
    keyBenefits: ['UV protection', 'Non-greasy finish', 'Professional detailing results'],
  },

  // ── Pest Repellents ──
  {
    name: 'Bed Bug Repellent Spray',
    slug: 'bed-bug-repellent',
    description: 'Natural repellent spray for bed bugs. Plant-based formula that is safe for use around children and pets while providing effective pest deterrence.',
    image: '/images/products/natural-home-care/bed-bug-repellent.jpg',
    category: 'Pest Repellents',
    volume: '100 ml',
    keyBenefits: ['Natural formula', 'Kids & pet safe', 'Effective deterrence'],
  },
  {
    name: 'Ant Repellent Spray',
    slug: 'ant-repellent',
    description: 'Plant-powered ant repellent for home use. Chemical-free formula safe for kitchens, pantries and living spaces where children and pets are present.',
    image: '/images/products/natural-home-care/ant-repellent.jpg',
    category: 'Pest Repellents',
    volume: '100 ml',
    keyBenefits: ['Chemical-free', 'Kitchen safe', 'Plant-powered'],
  },
  {
    name: 'Cockroach Repellent Spray',
    slug: 'cockroach-repellent',
    description: 'Natural cockroach repellent spray for home environments. Plant-based ingredients provide effective pest control without toxic chemicals.',
    image: '/images/products/natural-home-care/cockroach-repellent.png',
    category: 'Pest Repellents',
    volume: '100 ml',
    keyBenefits: ['No toxic chemicals', 'Safe for home use', 'Plant-based ingredients'],
  },
];

export const homeCareCategories = [
  'Home Cleaning',
  'Kitchen Cleaning',
  'Fabric Care',
  'Surface & Auto Care',
  'Pest Repellents',
] as const;
