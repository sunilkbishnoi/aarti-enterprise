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
  'ss-square-pipe': {
    variants: [
      { name: 'SS Square Tube 20×20 mm (Polished)', dimensions: '20 × 20 mm', price: 5288, description: 'Compact polished SS square tube for structural detail or decorative elements.' },
      { name: 'JSLA SS304 Square Tube 1.2 mm', dimensions: 'Standard', price: 1183, description: 'SS304 tube with 1.2 mm wall; versatile for interior and exterior uses.' },
      { name: 'SS Square Tube 25×25×1.5 mm', dimensions: '25 × 25 mm', price: 11300, description: 'Polished finish suitable for framing or railing components.' },
      { name: 'SS Square Tube 30×30×1 mm', dimensions: '30 × 30 mm', price: 13800, description: 'Mid-size polished SS tube for furniture & construction accents.' },
      { name: '304 SS Square Tube (Mill)', dimensions: 'Standard', price: 10387, description: 'SS304 with mill finish for fabrication or machining tasks.' },
      { name: '316 Marine Grade Square Tube', dimensions: 'Standard', price: 18450, description: 'SS316 grade for marine or coastal environments with enhanced corrosion resistance.' },
      { name: 'Large SS304 Square Tube (Industrial)', dimensions: 'Large', price: 42323, description: 'Larger dimension SS304 square tube for structural frameworks.' },
      { name: '304 SS Square Tube Bright Surface', dimensions: 'Standard', price: 15030, description: 'Premium bright finish SS304 – ideal for architectural features.' },
    ],
    materialGrades: [
      { name: 'SS 304 / 304L / 304H', description: 'General corrosion resistance, widely used for architectural & structural.' },
      { name: 'SS 316 / 316L / 316Ti', description: 'Better resistance for marine, coastal & chemical environments.' },
      { name: 'SS 202 / 201', description: 'Budget-friendly with moderate corrosion resistance.' },
      { name: 'Other (317L, 321, 347, 904L, 430)', description: 'Specialized grades for specific industrial requirements.' },
    ],
    finishes: [
      { name: 'Mill Finish', description: 'Raw industrial surface for fabrication & hidden structural use.' },
      { name: 'Brushed / 2B', description: 'Subtle matte finish, fingerprint-resistant — ideal for railings & gates.' },
      { name: 'Polished (#120–600 grit)', description: 'Progressive shine levels for decorative & architectural applications.' },
      { name: 'Mirror Polished', description: 'High-gloss reflective surface for premium installations.' },
      { name: 'Pickled', description: 'Chemically cleaned surface for industrial piping & fabrication.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.3–1.0 mm (Light)', description: 'Decorative trim, light furniture & interior accents.' },
      { name: '1.0–1.5 mm (Standard)', description: 'Railings, gates, general architectural use.' },
      { name: '1.5–3.0 mm (Medium)', description: 'Structural frames, handrails & outdoor furniture.' },
      { name: '3.0–6.0 mm (Heavy)', description: 'Industrial supports, heavy structural frameworks.' },
      { name: '6.0–20 mm (Extra Heavy)', description: 'Heavy industrial, load-bearing & specialized applications.' },
    ],
    applications: [
      'Structural frames & supports',
      'Handrails & balustrades',
      'Gates & fencing',
      'Furniture & shelving',
      'Industrial framework',
      'Architectural accents & facades',
    ],
  },
};

export const getProductSpecs = (slug: string): ProductSpecDetail | null => {
  return productSpecs[slug] || null;
};
