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
  'ss-rect-pipe': {
    variants: [
      { name: 'SS Rect Tube 20×30 mm 1.5 mm Wall SS304', dimensions: '20 × 30 mm', price: 25788, description: 'Heavy-duty SS304 rectangular pipe for structural, fabrication & architectural support.' },
      { name: 'Rectangular Pipe 30×10 mm – Brushed', dimensions: '30 × 10 mm', price: 3700, description: 'Brushed finish for decorative or interior use.' },
      { name: 'Steel Rect Tubing 2"×3" × .125"', dimensions: '2" × 3"', price: 6494, description: 'Standard rectangular tube section for general fabrication.' },
      { name: 'SS Rect Pipes 30×20 mm', dimensions: '30 × 20 mm', price: 230, description: 'Basic rectangular pipe for light framing & construction.' },
      { name: '304 Grade SS Rect Pipe', dimensions: 'Standard', price: 1200, description: 'Economical SS304 rectangular hollow section.' },
      { name: '1" SS Rectangular Hollow Section', dimensions: '1"', price: 450, description: 'Small section for precision fabrications.' },
      { name: 'SS Rectangular Pipe (General)', dimensions: 'Standard', price: 1340, description: 'Generic rectangular pipe — confirm dimensions before order.' },
      { name: '304L SS Rectangular Pipe', dimensions: 'Standard', price: 1900, description: 'SS304L grade for improved weldability & reduced carbide precipitation.' },
    ],
    materialGrades: [
      { name: 'SS 304 / 304L', description: 'Most widely used for general structural, architectural & fabrication work.' },
      { name: 'SS 316 / 316L', description: 'Higher corrosion resistance; ideal for marine & chemical environments.' },
      { name: 'SS 201 (Lower Nickel)', description: 'Budget option for light-duty structural uses.' },
    ],
    finishes: [
      { name: 'Mill Finish', description: 'Raw as produced — basic industrial surface.' },
      { name: 'Brushed / Satin', description: 'Decorative look, reduces visible scratches.' },
      { name: 'Polished / Mirror', description: 'High finish for architectural appeal.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.9–1.5 mm (Light)', description: 'Small sections (10×20 to 15×30 mm) for decorative & light framing.' },
      { name: '1.5–2.0 mm (Standard)', description: 'Mid-range sections (20×40 to 25×50 mm) for railings & furniture.' },
      { name: '2.0–3.0 mm (Medium)', description: 'Larger sections (40×60 mm) for structural frames.' },
      { name: '3.0–5.0 mm (Heavy)', description: 'Large sections (50×100 to 100×200 mm) for heavy structural use.' },
    ],
    applications: [
      'Architectural frameworks & railings',
      'Furniture & interior fixtures',
      'Structural support columns & beams',
      'Automotive & fabrication works',
      'Marine & chemical industry applications',
    ],
  },
  'ss-oval-pipe': {
    variants: [
      { name: 'SS Oval Pipe (Basic)', dimensions: 'Standard', price: 150, description: 'Basic stainless oval pipe for light framing & decorative applications.' },
      { name: 'SS Oval Pipe (General Purpose)', dimensions: 'Standard', price: 200, description: 'General-purpose SS oval pipe for construction or fabrication.' },
      { name: '202 SS Oval Pipe', dimensions: 'Standard', price: 180, description: 'SS202 grade for moderate corrosion resistance at lower cost.' },
      { name: 'Jindal SS Oval/Capsule Polish Pipe', dimensions: 'Capsule', price: 350, description: 'Oval/capsule-shaped polished SS pipe (0.8–1.5 mm wall) for railings or trims.' },
      { name: 'SS Oval Tube 30 Pcs Pack', dimensions: 'Standard', price: 280, description: 'Pack of SS oval tubes for industrial use or bulk projects.' },
      { name: 'SS Oval Pipe 30 Kg', dimensions: 'Standard', price: 320, description: 'Bulk weight-based purchase for construction or fabrication jobs.' },
      { name: 'SS304 Oval Pipe 40 Kg', dimensions: 'Standard', price: 450, description: 'Larger batch of SS304 oval pipes for structural use.' },
      { name: 'SS Oval Tube (Economy)', dimensions: 'Standard', price: 120, description: 'Affordable SS oval tube option for light use.' },
    ],
    materialGrades: [
      { name: 'SS 304 / 304L', description: 'Good corrosion resistance; widely used in railing, structures, HVAC & general fabrication.' },
      { name: 'SS 316 / 316L', description: 'Better for outdoor, coastal & marine environments.' },
      { name: 'SS 201', description: 'Lower-cost option for light, indoor use.' },
    ],
    finishes: [
      { name: 'Mill Finish', description: 'Raw as produced — basic industrial surface.' },
      { name: 'Brushed / Satin', description: 'Decorative look, reduces visible scratches.' },
      { name: 'Polished (Mirror/Satin)', description: 'High finish for architectural appeal.' },
      { name: 'Pickled', description: 'Chemically cleaned surface for industrial use.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.9–1.5 mm (Light)', description: 'Decorative, railing trims & light framing.' },
      { name: '1.5–3.0 mm (Standard)', description: 'Handrails, balustrades & general structural.' },
      { name: '3.0–6.0 mm (Heavy)', description: 'Structural supports & industrial piping.' },
    ],
    applications: [
      'Handrails & balustrades',
      'Structural framing & supports',
      'Exhaust systems & automotive tubing',
      'Industrial fluid or gas conveyance',
      'Architectural & decorative features',
    ],
  },
  'ss-sheet-plain': {
    variants: [
      { name: '304 SS Sheets Pack', dimensions: 'Standard', price: 3398, description: 'Pack of precision SS304 sheets for general fabrication or structural use.' },
      { name: '304 SS Sheet', dimensions: 'Standard', price: 250, description: 'SS304 plain sheet for decoration, cladding, or kitchen equipment.' },
      { name: 'Jindal SS Sheet', dimensions: 'Standard', price: 245, description: 'Industry brand SS sheet for fabrication and architectural projects.' },
      { name: '316 SS Sheet', dimensions: 'Standard', price: 355, description: 'Higher corrosion-resistant SS316 for marine, coastal or chemical environments.' },
      { name: 'Jindal SS304 Sheet (1–2 mm)', dimensions: '1–2 mm', price: 240, description: 'Common thickness range for general industrial and construction.' },
      { name: 'SS 202 Sheet', dimensions: 'Standard', price: 130, description: 'Budget grade SS202 plain sheet for light and indoor use.' },
      { name: 'SS Sheets 4×8 ft', dimensions: '4 × 8 ft', price: 250, description: 'Standard 4×8 ft sheet size with corrosion-resistant finish.' },
      { name: 'SS Plain Sheet 50 Kg', dimensions: 'Bulk', price: 4500, description: 'Bulk sheet option by weight for larger projects.' },
    ],
    materialGrades: [
      { name: 'SS 304 / 304L', description: 'Most common — corrosion-resistant, easy to form & weld; kitchen, automotive, architectural.' },
      { name: 'SS 316 / 316L', description: 'Higher corrosion resistance for marine, chemical & pharmaceutical industries.' },
      { name: 'SS 202', description: 'Lower-cost general-purpose sheet for light/indoor applications.' },
      { name: 'Other (309, 310, 321, 430)', description: 'High-temp or specialized industrial needs.' },
    ],
    finishes: [
      { name: '2B / Cold Rolled', description: 'Smooth, general-purpose finish.' },
      { name: 'BA (Bright Annealed)', description: 'Brighter reflective finish, cleaner aesthetic.' },
      { name: 'No.1 (Hot Rolled)', description: 'Mill surface for industrial use.' },
      { name: 'No.4 / Satin / Brushed', description: 'Architectural interior/exterior aesthetic.' },
      { name: 'Mirror / No.8', description: 'Highly polished decorative surface.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.1–1.0 mm (Thin)', description: 'Cladding, appliance panels & light fabrication.' },
      { name: '1.0–3.0 mm (Standard)', description: 'General fabrication, kitchen equipment & architectural.' },
      { name: '3.0–6.0 mm (Medium)', description: 'Structural panels, heavy fabrication & industrial.' },
      { name: '6.0 mm+ (Plate)', description: 'Heavy-duty industrial use & structural applications.' },
    ],
    applications: [
      'Architectural cladding & decorative panels',
      'Kitchen & food equipment',
      'Automotive parts & trim',
      'Chemical, marine & industrial equipment',
      'Fabrication & structural sheet metal',
    ],
  },
  'ss-sheet-mirror': {
    variants: [
      { name: 'Super Mirror 304 Sheet (4×10 ft)', dimensions: '4 × 10 ft', price: 145703, description: 'Large format high-grade mirror sheet for architectural wall cladding or decorative facades.' },
      { name: '1 mm 304 SS Mirror Polished Plate', dimensions: '1 mm', price: 5101, description: 'Precision polished pieces for prototypes, signage, or interior accents.' },
      { name: '304 SS 8K Mirror Surface Sheet', dimensions: 'Standard', price: 4665, description: '8K polished sheet with pristine reflective finish for premium interiors.' },
      { name: '304 SS Sheet 4X Mirror Finish', dimensions: 'Large', price: 16632, description: 'Larger panel with ASTM-standard specification and mirror finish.' },
      { name: '5 Pcs 304 SS Mirror Surface Sheets', dimensions: 'Pack', price: 8615, description: 'Pack of mirror surface pieces for detailed decorative work.' },
      { name: '304 Mirror SS Plate 0.5 mm', dimensions: '0.5 mm', price: 8080, description: 'Thin mirror-finish sheet with anti-rust properties for furniture or feature panels.' },
      { name: '304 SS Mirror Plate for Decoration', dimensions: 'Standard', price: 3920, description: 'Decorative mirror plate for crafts, cabinetry, or signage.' },
      { name: '304 SS 8K Bright Mirror Sheet', dimensions: 'Standard', price: 3000, description: 'Bright mirror sheet with protective film for finishing and fabrication.' },
    ],
    materialGrades: [
      { name: 'SS 304 / 304L', description: 'General purpose architectural & decorative, good corrosion resistance.' },
      { name: 'SS 316 / 316L', description: 'Outdoor, coastal or chemical exposure — high corrosion resistance.' },
      { name: 'SS 202 / 201', description: 'Budget and light decorative applications.' },
      { name: 'SS 430', description: 'Ferritic grade where magnetic property is acceptable.' },
    ],
    finishes: [
      { name: 'No.8 / 8K Mirror', description: 'Super-bright highly reflective surface comparable to a mirror.' },
      { name: 'Coloured Mirror (PVD)', description: 'Mirror finish with PVD colour coating (gold, rose gold, black, blue).' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.3–0.8 mm (Ultra Thin)', description: 'Decorative accents, signage & craft applications.' },
      { name: '0.8–1.5 mm (Thin)', description: 'Cladding panels, backsplashes & furniture trim.' },
      { name: '1.5–3.0 mm (Standard)', description: 'Architectural cladding, elevator interiors & wall panels.' },
      { name: '3.0–4.0 mm+ (Thick)', description: 'Heavy-duty decorative panels & structural facades.' },
    ],
    applications: [
      'Architectural cladding & facades',
      'Interior decorative panels & accent walls',
      'Kitchen backsplashes & appliances',
      'Signage & lettering',
      'Furniture & retail fixtures',
      'Elevator interiors & wall panels',
    ],
  },
};

export const getProductSpecs = (slug: string): ProductSpecDetail | null => {
  return productSpecs[slug] || null;
};
