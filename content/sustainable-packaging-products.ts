export interface PackagingProduct {
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  material: string;
  size?: string;
  capacity?: string;
}

export const packagingProducts: PackagingProduct[] = [
  {
    name: '12″ Round Plate — Super Strong',
    slug: '12-round-plate',
    description: 'Heavy-duty round plate for main courses and catering. Super-strong construction holds heavier meals without bending.',
    image: '/images/products/sustainable-packaging/12-round-plate.jpeg',
    category: 'Round Plates',
    material: 'Sugarcane bagasse',
    size: '12″ diameter',
  },
  {
    name: '10″ Round Plate',
    slug: '10-round-plate',
    description: 'Classic and elegant choice for any dining occasion. Versatile plate suited for restaurants, caterers and events.',
    image: '/images/products/sustainable-packaging/10-round-plate.png',
    category: 'Round Plates',
    material: 'Sugarcane bagasse',
    size: '10″ diameter',
  },
  {
    name: '9″ Round Plate',
    slug: '9-round-plate',
    description: 'Ideal for picnics, casual gatherings and everyday serving. Durable minimalist design adds convenience to any occasion.',
    image: '/images/products/sustainable-packaging/9-round-plate.png',
    category: 'Round Plates',
    material: 'Sugarcane bagasse',
    size: '9″ diameter',
  },
  {
    name: '7″ Round Plate',
    slug: '7-round-plate',
    description: 'Versatile and practical choice for side dishes, starters and snacks. Easy cleanup for any event.',
    image: '/images/products/sustainable-packaging/7-round-plate.png',
    category: 'Round Plates',
    material: 'Sugarcane bagasse',
    size: '7″ diameter',
  },
  {
    name: '6″ Deep Dessert Plate',
    slug: '6-dessert-plate',
    description: 'Deep-walled plate for desserts, salads and sauces. Ideal for commercial use in restaurants and catering.',
    image: '/images/products/sustainable-packaging/6-dessert-plate.png',
    category: 'Round Plates',
    material: 'Sugarcane bagasse',
    size: '6″ diameter',
  },
  {
    name: '11″ 4-Compartment Banquet Plate',
    slug: '11-banquet-plate',
    description: 'Biodegradable banquet plate with four compartments for organised meal portions. Ideal for catering events and thali-style dining.',
    image: '/images/products/sustainable-packaging/11-banquet-plate.png',
    category: 'Partition Plates',
    material: 'Sugarcane bagasse',
    size: '11″ diameter, 4 compartments',
  },
  {
    name: '10″ Round 3-Partition Plate (C Type)',
    slug: '10-partition-c',
    description: 'Three-compartment plate with C-type partition layout. Ideal for serving meals with separate portions at picnics and parties.',
    image: '/images/products/sustainable-packaging/10-partition-c.jpeg',
    category: 'Partition Plates',
    material: 'Sugarcane bagasse',
    size: '10″ diameter, 3 compartments',
  },
  {
    name: '10″ Round 3-Partition Plate (Y Type)',
    slug: '10-partition-y',
    description: 'Eco-friendly three-compartment plate promoting portion control and waste reduction. Y-type partition layout for balanced servings.',
    image: '/images/products/sustainable-packaging/10-partition-y.png',
    category: 'Partition Plates',
    material: 'Sugarcane bagasse',
    size: '10″ diameter, 3 compartments',
  },
  {
    name: '10×9″ Square 3-Partition Plate',
    slug: '10x9-partition-plate',
    description: 'Square partition plate with three compartments for organised and sustainable eating. Perfect for eco-conscious dining and meal prep.',
    image: '/images/products/sustainable-packaging/10x9-partition-plate.png',
    category: 'Partition Plates',
    material: 'Sugarcane bagasse',
    size: '10×9″, 3 compartments',
  },
  {
    name: 'Premium Food Bowl — 360 ml',
    slug: 'food-bowl-360ml',
    description: 'Sleek food bowl for soups, curries and rice dishes. Made of high-quality bagasse for modern kitchenware collections.',
    image: '/images/products/sustainable-packaging/food-bowl-360ml.jpeg',
    category: 'Bowls',
    material: 'Sugarcane bagasse',
    capacity: '360 ml',
  },
  {
    name: 'Premium Food Bowl — 180 ml',
    slug: 'food-bowl-180ml',
    description: 'Compact food bowl for serving sides, dips and desserts at events. Convenient and cost-effective for catering.',
    image: '/images/products/sustainable-packaging/food-bowl-180ml.png',
    category: 'Bowls',
    material: 'Sugarcane bagasse',
    capacity: '180 ml',
  },
  {
    name: 'Square Portion Cup — 120 ml',
    slug: 'square-bowl-120ml',
    description: 'Versatile and durable portion cup for desserts, sauces and condiments. Also suited for healthcare and portioning use.',
    image: '/images/products/sustainable-packaging/square-bowl-120ml.jpeg',
    category: 'Bowls',
    material: 'Sugarcane bagasse',
    capacity: '120 ml',
  },
  {
    name: '120 ml Square Tray',
    slug: '120ml-square-plate',
    description: 'Compact and elegant square tray for desserts, snacks and everyday serving. Clean lines for modern presentation.',
    image: '/images/products/sustainable-packaging/120ml-square-plate.png',
    category: 'Trays',
    material: 'Sugarcane bagasse',
    capacity: '120 ml',
  },
  {
    name: '9×6″ Clamshell Container',
    slug: '9x6-clamshell',
    description: 'Hinged clamshell container for secure, convenient takeaway packaging. Perfect for sandwiches, wraps and smaller meals.',
    image: '/images/products/sustainable-packaging/9x6-clamshell.png',
    category: 'Clamshell Containers',
    material: 'Sugarcane bagasse',
    size: '9×6″',
  },
  {
    name: '9×9″ Clamshell Container',
    slug: '9x9-clamshell',
    description: 'Large hinged clamshell container for full meals, biryanis and takeaway platters. Secure closure keeps food fresh in transit.',
    image: '/images/products/sustainable-packaging/9x9-clamshell.png',
    category: 'Clamshell Containers',
    material: 'Sugarcane bagasse',
    size: '9×9″',
  },
];

export const packagingCategories = [
  'Round Plates',
  'Partition Plates',
  'Bowls',
  'Trays',
  'Clamshell Containers',
] as const;
