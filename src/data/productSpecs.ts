// Detailed product specifications for specific products

export interface ProductVariant {
  name: string;
  dimensions: string;
  price: number;
  description: string;
}

export interface ProductSpecDetail {
  variants: ProductVariant[];
  materialGrades: { name: string; description: string }[];
  finishes: { name: string; description: string }[];
  glassThickness: string[];
  mountTypes: { name: string; description: string }[];
  applications: string[];
}

export const productSpecs: Record<string, ProductSpecDetail> = {
  'glass-clamp': {
    variants: [
      {
        name: 'Glass Clamp 45×45×27 mm Flat',
        dimensions: '45 × 45 × 27 mm',
        price: 543,
        description: 'Compact square clamp for flat surface installations (e.g., glass railing/partition).',
      },
      {
        name: 'Glass Clamp 45×45×25 mm Ø42',
        dimensions: '45 × 45 × 25 mm',
        price: 760,
        description: 'Square clamp sized for Ø 42 mm round tube posts.',
      },
      {
        name: 'Glass Clamp 50×40×26 mm Ø42.4',
        dimensions: '50 × 40 × 26 mm',
        price: 571,
        description: 'Slightly wider clamp for Ø 42.4 mm posts (common in railings).',
      },
      {
        name: 'Glass Clamp 52×52×32.5 mm Flat',
        dimensions: '52 × 52 × 32.5 mm',
        price: 824,
        description: 'Larger square clamp for thicker glass panels.',
      },
      {
        name: 'Glass Clamp 63×45×28 mm Flat',
        dimensions: '63 × 45 × 28 mm',
        price: 746,
        description: 'Wider rectangular clamp for heavier/larger glass.',
      },
      {
        name: '12×22 mm Frameless Standoff Clamp',
        dimensions: '12 × 22 mm',
        price: 1875,
        description: 'Used as standoff support or decorative mount for frameless glass.',
      },
      {
        name: '180° Stainless Steel Glass Clamp',
        dimensions: '180° Inline',
        price: 983,
        description: 'Special 180° clamp for joining panels at straight line connections.',
      },
      {
        name: 'Inline Design Glass Clamp',
        dimensions: 'Premium Inline',
        price: 15495,
        description: 'Premium architectural style clamp for high-end finishes.',
      },
    ],
    materialGrades: [
      { name: 'SS 304 (A2)', description: 'Good corrosion resistance, suitable for indoor use and sheltered areas.' },
      { name: 'SS 316 (A4)', description: 'Superior corrosion resistance for outdoor/exposed areas (balconies, pool edges).' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High shine, modern look.' },
      { name: 'Satin Brushed', description: 'Subtle matte finish that hides fingerprints and light scratches.' },
    ],
    glassThickness: ['6 mm', '8 mm', '10 mm', '12 mm'],
    mountTypes: [
      { name: 'Flat Surface', description: 'Mount directly on flat surfaces or plates.' },
      { name: 'Round Post (Ø42 / Ø42.4)', description: 'Attach to round tubing.' },
      { name: 'Square Post', description: 'Attach to square tubing.' },
      { name: 'Corner / 180°', description: 'For panel connections at angles or inline.' },
      { name: 'D-Shaped / Mid Clamp', description: 'Aesthetic shapes for minimalist design.' },
    ],
    applications: [
      'Balcony railing',
      'Staircase glass panels',
      'Shower partitions',
      'Office glass partitions',
      'Pool fencing',
      'Shopfront glazing',
    ],
  },
  'ss-round-pipe': {
    variants: [
      { name: 'SS Round Pipe ½"', dimensions: '21.3 mm OD', price: 120, description: 'Small diameter pipe for light railing & furniture.' },
      { name: 'SS Round Pipe ¾"', dimensions: '26.9 mm OD', price: 160, description: 'Common for baluster inserts & handrail supports.' },
      { name: 'SS Round Pipe 1"', dimensions: '33.7 mm OD', price: 220, description: 'Popular for railings, handrails & decorative work.' },
      { name: 'SS Round Pipe 1¼"', dimensions: '42.4 mm OD', price: 310, description: 'Standard railing post size for balcony & staircase.' },
      { name: 'SS Round Pipe 1½"', dimensions: '48.3 mm OD', price: 380, description: 'Heavy-duty railing & structural applications.' },
      { name: 'SS Round Pipe 2"', dimensions: '50.8 mm OD', price: 480, description: 'Structural columns, marine & industrial piping.' },
      { name: 'SS Round Pipe 3"', dimensions: '88.9 mm OD', price: 850, description: 'Large structural & plumbing applications.' },
      { name: 'SS Round Pipe 4"', dimensions: '101.6 mm OD', price: 1200, description: 'Heavy industrial piping & structural framework.' },
    ],
    materialGrades: [
      { name: 'SS 304 / 304L', description: 'General purpose — architectural, railing, plumbing & industrial use.' },
      { name: 'SS 316 / 316L', description: 'Superior corrosion resistance for outdoor, marine & corrosive environments.' },
      { name: 'SS 202 / 201', description: 'Budget-friendly option with moderate corrosion resistance.' },
      { name: 'Duplex (2205, 2507)', description: 'High strength for offshore, chemical plants & heavy-duty applications.' },
    ],
    finishes: [
      { name: 'Mill Finish', description: 'Raw industrial finish, suitable for structural & hidden applications.' },
      { name: 'Pickled', description: 'Chemically cleaned surface for industrial piping.' },
      { name: 'Brushed / Satin', description: 'Subtle matte finish, hides fingerprints — ideal for railings.' },
      { name: 'Polished (180# / 320# / 600#)', description: 'Progressive shine levels for architectural & decorative use.' },
      { name: 'Mirror Finish', description: 'High-gloss reflective surface for premium installations.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: 'SCH 5 / 5S (Light)', description: 'Low pressure, decorative & railing applications.' },
      { name: 'SCH 10 / 10S (Light-Medium)', description: 'Plumbing & general architectural use.' },
      { name: 'SCH 40 / 40S (Medium)', description: 'Structural, moderate pressure applications.' },
      { name: 'SCH 80 / 80S (Thick)', description: 'High load & pressure systems.' },
      { name: 'SCH 160 / XXS (Extra Thick)', description: 'Heavy industrial & high-stress environments.' },
    ],
    applications: [
      'Railings, balustrades & handrails',
      'Plumbing & sanitary piping',
      'Industrial & chemical plant piping',
      'Marine & offshore structures',
      'Structural columns & framework',
      'Pergolas & architectural features',
    ],
  },
};

export const getProductSpecs = (slug: string): ProductSpecDetail | null => {
  return productSpecs[slug] || null;
};
