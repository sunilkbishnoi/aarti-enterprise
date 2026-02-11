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
};

export const getProductSpecs = (slug: string): ProductSpecDetail | null => {
  return productSpecs[slug] || null;
};
