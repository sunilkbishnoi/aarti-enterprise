// Detailed product specifications for all products — Vadodara wholesale/dealer rates (2026)

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
  // ─── SS PIPES ─────────────────────────────────────────────────────
  'ss-round-pipe': {
    variants: [
      { name: 'SS Round Pipe ½"', dimensions: '12.7 mm OD', price: 380, description: 'Light railing & furniture applications (per 20ft length, 202 grade).' },
      { name: 'SS Round Pipe ¾"', dimensions: '19 mm OD', price: 520, description: 'Baluster inserts & handrail supports.' },
      { name: 'SS Round Pipe 1"', dimensions: '25.4 mm OD', price: 780, description: 'Popular for railings, handrails & decorative work.' },
      { name: 'SS Round Pipe 1¼"', dimensions: '31.8 mm OD', price: 1200, description: 'Standard railing post size for balcony & staircase.' },
      { name: 'SS Round Pipe 1½"', dimensions: '38.1 mm OD', price: 1500, description: 'Heavy-duty railing & structural applications.' },
      { name: 'SS Round Pipe 2"', dimensions: '50.8 mm OD', price: 2400, description: 'Structural columns & industrial piping.' },
      { name: 'SS Round Pipe 3"', dimensions: '76.2 mm OD', price: 4800, description: 'Large structural & plumbing applications.' },
      { name: 'SS Round Pipe 4"', dimensions: '101.6 mm OD', price: 7500, description: 'Heavy industrial piping & structural framework.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget-friendly option with moderate corrosion resistance.' },
      { name: 'SS 304 / 304L', description: 'General purpose — architectural, railing, plumbing & industrial use.' },
      { name: 'SS 316 / 316L', description: 'Superior corrosion resistance for outdoor, marine & corrosive environments.' },
    ],
    finishes: [
      { name: 'Mill Finish', description: 'Raw industrial finish for structural & hidden applications.' },
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
    ],
    applications: [
      'Railings, balustrades & handrails',
      'Plumbing & sanitary piping',
      'Industrial & chemical plant piping',
      'Structural columns & framework',
      'Pergolas & architectural features',
    ],
  },
  'ss-square-pipe': {
    variants: [
      { name: 'SS Square Pipe ½×½"', dimensions: '12.7 × 12.7 mm', price: 400, description: 'Small size for decorative elements (per 20ft, 202).' },
      { name: 'SS Square Pipe ¾×¾"', dimensions: '19 × 19 mm', price: 550, description: 'Furniture frames & light structural.' },
      { name: 'SS Square Pipe 1×1"', dimensions: '25 × 25 mm', price: 850, description: 'Popular for railing verticals & gates.' },
      { name: 'SS Square Pipe 1¼×1¼"', dimensions: '32 × 32 mm', price: 1250, description: 'Gate frames & railing posts.' },
      { name: 'SS Square Pipe 1½×1½"', dimensions: '38 × 38 mm', price: 1600, description: 'Heavy railing & structural framing.' },
      { name: 'SS Square Pipe 2×2"', dimensions: '50 × 50 mm', price: 2600, description: 'Structural frameworks & gates.' },
      { name: 'SS Square Pipe 3×3"', dimensions: '76 × 76 mm', price: 5200, description: 'Large structural & industrial frames.' },
      { name: 'SS Square Pipe 4×4"', dimensions: '102 × 102 mm', price: 8000, description: 'Heavy industrial structural supports.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget-friendly with moderate corrosion resistance.' },
      { name: 'SS 304 / 304L', description: 'General corrosion resistance for architectural & structural.' },
      { name: 'SS 316 / 316L', description: 'Better resistance for marine, coastal & chemical environments.' },
    ],
    finishes: [
      { name: 'Mill Finish', description: 'Raw industrial surface for fabrication & hidden use.' },
      { name: 'Brushed / Satin', description: 'Subtle matte finish, fingerprint-resistant.' },
      { name: 'Polished (#120–600 grit)', description: 'Progressive shine for decorative applications.' },
      { name: 'Mirror Polished', description: 'High-gloss reflective surface.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.8–1.2 mm (Light)', description: 'Decorative trim, light furniture & interior accents.' },
      { name: '1.2–1.5 mm (Standard)', description: 'Railings, gates, general architectural use.' },
      { name: '1.5–2.5 mm (Medium)', description: 'Structural frames, handrails & outdoor furniture.' },
      { name: '2.5–4.0 mm (Heavy)', description: 'Industrial supports & heavy structural frameworks.' },
    ],
    applications: [
      'Structural frames & supports',
      'Handrails & balustrades',
      'Gates & fencing',
      'Furniture & shelving',
      'Architectural accents & facades',
    ],
  },
  'ss-rect-pipe': {
    variants: [
      { name: 'SS Rect Pipe ½×1"', dimensions: '12.7 × 25.4 mm', price: 480, description: 'Small section for light framing (per 20ft, 202).' },
      { name: 'SS Rect Pipe ¾×1½"', dimensions: '19 × 38 mm', price: 650, description: 'Furniture frames & decorative use.' },
      { name: 'SS Rect Pipe 1×2"', dimensions: '25 × 50 mm', price: 950, description: 'Popular for railings & gate infills.' },
      { name: 'SS Rect Pipe 1½×3"', dimensions: '38 × 76 mm', price: 1800, description: 'Structural framing & heavy railings.' },
      { name: 'SS Rect Pipe 2×3"', dimensions: '50 × 76 mm', price: 2800, description: 'Heavy structural applications.' },
      { name: 'SS Rect Pipe 2×4"', dimensions: '50 × 102 mm', price: 3400, description: 'Large structural & framework.' },
      { name: 'SS Rect Pipe 3×6"', dimensions: '76 × 152 mm', price: 6500, description: 'Heavy industrial structural supports.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget option for light-duty structural uses.' },
      { name: 'SS 304 / 304L', description: 'Most widely used for general structural & fabrication work.' },
      { name: 'SS 316 / 316L', description: 'Higher corrosion resistance for marine & chemical environments.' },
    ],
    finishes: [
      { name: 'Mill Finish', description: 'Raw as produced — basic industrial surface.' },
      { name: 'Brushed / Satin', description: 'Decorative look, reduces visible scratches.' },
      { name: 'Polished / Mirror', description: 'High finish for architectural appeal.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.8–1.5 mm (Light)', description: 'Small sections for decorative & light framing.' },
      { name: '1.5–2.0 mm (Standard)', description: 'Mid-range sections for railings & furniture.' },
      { name: '2.0–3.0 mm (Heavy)', description: 'Large sections for structural frames.' },
    ],
    applications: [
      'Architectural frameworks & railings',
      'Furniture & interior fixtures',
      'Structural support columns & beams',
      'Gate frames & infills',
      'Industrial fabrication works',
    ],
  },
  'ss-oval-pipe': {
    variants: [
      { name: 'SS Oval Pipe 25×50 mm', dimensions: '25 × 50 mm', price: 1200, description: 'Compact oval for decorative railings (per 20ft, 202).' },
      { name: 'SS Oval Pipe 30×60 mm', dimensions: '30 × 60 mm', price: 1600, description: 'Standard oval for handrails & designer railings.' },
      { name: 'SS Oval Pipe 40×80 mm', dimensions: '40 × 80 mm', price: 2400, description: 'Large oval for premium railing systems.' },
      { name: 'SS Oval Pipe 50×100 mm', dimensions: '50 × 100 mm', price: 3800, description: 'Extra-large oval for architectural features.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Lower-cost option for indoor decorative use.' },
      { name: 'SS 304 / 304L', description: 'Good corrosion resistance for railing & fabrication.' },
      { name: 'SS 316 / 316L', description: 'Better for outdoor & coastal environments.' },
    ],
    finishes: [
      { name: 'Brushed / Satin', description: 'Decorative look, reduces visible scratches.' },
      { name: 'Polished (Mirror/Satin)', description: 'High finish for architectural appeal.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.8–1.5 mm (Light)', description: 'Decorative railing trims & light framing.' },
      { name: '1.5–2.0 mm (Standard)', description: 'Handrails, balustrades & general structural.' },
    ],
    applications: [
      'Handrails & balustrades',
      'Designer railing systems',
      'Architectural & decorative features',
      'Furniture & interior accents',
    ],
  },

  // ─── SS SHEETS & PLATES ───────────────────────────────────────────
  'ss-sheet-plain': {
    variants: [
      { name: 'SS 202 Plain Sheet 0.5 mm', dimensions: '4 × 8 ft', price: 2200, description: 'Budget thin sheet for light cladding & fabrication.' },
      { name: 'SS 202 Plain Sheet 0.8 mm', dimensions: '4 × 8 ft', price: 3500, description: 'Standard 202 sheet for general use.' },
      { name: 'SS 304 Plain Sheet 0.8 mm', dimensions: '4 × 8 ft', price: 4800, description: 'Popular 304 grade for kitchen & architectural.' },
      { name: 'SS 304 Plain Sheet 1.0 mm', dimensions: '4 × 8 ft', price: 6000, description: 'Standard thickness for fabrication & cladding.' },
      { name: 'SS 304 Plain Sheet 1.2 mm', dimensions: '4 × 8 ft', price: 7200, description: 'Heavier gauge for structural panels.' },
      { name: 'SS 304 Plain Sheet 1.5 mm', dimensions: '4 × 8 ft', price: 9000, description: 'Thick sheet for heavy-duty applications.' },
      { name: 'SS 304 Plain Sheet 2.0 mm', dimensions: '4 × 8 ft', price: 12000, description: 'Heavy fabrication & industrial panels.' },
      { name: 'SS 316 Plain Sheet 1.0 mm', dimensions: '4 × 8 ft', price: 9500, description: 'Corrosion-resistant for outdoor & marine use.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Lower-cost general-purpose sheet for indoor applications.' },
      { name: 'SS 304 / 304L', description: 'Most common — corrosion-resistant, kitchen, automotive, architectural.' },
      { name: 'SS 316 / 316L', description: 'Higher corrosion resistance for marine & chemical industries.' },
    ],
    finishes: [
      { name: '2B / Cold Rolled', description: 'Smooth, general-purpose finish.' },
      { name: 'BA (Bright Annealed)', description: 'Brighter reflective finish, cleaner aesthetic.' },
      { name: 'No.4 / Satin / Brushed', description: 'Architectural interior/exterior aesthetic.' },
      { name: 'Mirror / No.8', description: 'Highly polished decorative surface.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.3–0.8 mm (Thin)', description: 'Cladding, appliance panels & light fabrication.' },
      { name: '0.8–1.5 mm (Standard)', description: 'General fabrication, kitchen equipment & architectural.' },
      { name: '1.5–3.0 mm (Medium)', description: 'Structural panels & heavy fabrication.' },
      { name: '3.0 mm+ (Plate)', description: 'Heavy-duty industrial & structural applications.' },
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
      { name: 'SS 304 Mirror Sheet 0.5 mm', dimensions: '4 × 8 ft', price: 5500, description: 'Thin mirror sheet for decorative accents & signage.' },
      { name: 'SS 304 Mirror Sheet 0.8 mm', dimensions: '4 × 8 ft', price: 7500, description: 'Standard mirror sheet for elevator interiors & cladding.' },
      { name: 'SS 304 Mirror Sheet 1.0 mm', dimensions: '4 × 8 ft', price: 9500, description: 'Popular thickness for architectural wall panels.' },
      { name: 'SS 304 Mirror Sheet 1.2 mm', dimensions: '4 × 8 ft', price: 11500, description: 'Heavy-duty mirror sheet for facades & feature walls.' },
      { name: 'SS 304 Mirror Sheet (4×10 ft)', dimensions: '4 × 10 ft', price: 12000, description: 'Large format mirror sheet for continuous cladding.' },
      { name: 'SS 316 Mirror Sheet 1.0 mm', dimensions: '4 × 8 ft', price: 13500, description: 'Corrosion-resistant mirror for outdoor/coastal use.' },
      { name: 'SS 304 8K Mirror Surface Sheet', dimensions: '4 × 8 ft', price: 8500, description: '8K polished for premium interiors.' },
      { name: 'SS 304 Coloured Mirror (PVD)', dimensions: '4 × 8 ft', price: 10500, description: 'Mirror finish with PVD colour coating.' },
    ],
    materialGrades: [
      { name: 'SS 304 / 304L', description: 'General purpose architectural & decorative, good corrosion resistance.' },
      { name: 'SS 316 / 316L', description: 'Outdoor, coastal or chemical exposure — high corrosion resistance.' },
      { name: 'SS 430', description: 'Ferritic grade where magnetic property is acceptable.' },
    ],
    finishes: [
      { name: 'No.8 / 8K Mirror', description: 'Super-bright highly reflective surface comparable to a mirror.' },
      { name: 'Coloured Mirror (PVD)', description: 'Mirror finish with PVD colour coating (gold, rose gold, black, blue).' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.3–0.8 mm (Thin)', description: 'Decorative accents, signage & craft applications.' },
      { name: '0.8–1.2 mm (Standard)', description: 'Cladding panels, elevator interiors & wall panels.' },
      { name: '1.2–2.0 mm (Thick)', description: 'Architectural cladding & structural facades.' },
    ],
    applications: [
      'Architectural cladding & facades',
      'Interior decorative panels & accent walls',
      'Kitchen backsplashes & appliances',
      'Signage & lettering',
      'Elevator interiors & wall panels',
    ],
  },
  'ss-sheet-hairline': {
    variants: [
      { name: 'SS 304 Hairline Sheet 0.5 mm', dimensions: '4 × 8 ft', price: 4800, description: 'Thin hairline sheet for cladding & panels.' },
      { name: 'SS 304 Hairline Sheet 0.8 mm', dimensions: '4 × 8 ft', price: 6800, description: 'Standard hairline sheet for elevator & wall panels.' },
      { name: 'SS 304 Hairline Sheet 1.0 mm', dimensions: '4 × 8 ft', price: 8500, description: 'Popular thickness for architectural interiors.' },
      { name: 'SS 304 Hairline Sheet 1.2 mm', dimensions: '4 × 8 ft', price: 10200, description: 'Heavy-duty for escalator cladding & facades.' },
      { name: 'SS 304 Silver Hairline Sheet', dimensions: '4 × 8 ft', price: 8500, description: 'Classic silver SS304 hairline for premium finishes.' },
      { name: 'SS 304 Black Hairline Sheet', dimensions: '4 × 8 ft', price: 9500, description: 'PVD black with brushed texture for modern interiors.' },
      { name: 'SS 304 Gold Hairline Sheet', dimensions: '4 × 8 ft', price: 9500, description: 'PVD gold-tint with linear brush for luxury applications.' },
      { name: 'SS 304 Rose Gold Hairline Sheet', dimensions: '4 × 8 ft', price: 9500, description: 'PVD rose gold finish for premium decor.' },
    ],
    materialGrades: [
      { name: 'SS 304 / 304L', description: 'Most common grade for interior/exterior architectural applications.' },
      { name: 'SS 316 / 316L', description: 'Superior corrosion resistance for coastal/chemical exposure.' },
      { name: 'SS 202', description: 'Budget option for light decorative sheet applications.' },
    ],
    finishes: [
      { name: 'Silver Hairline', description: 'Classic brushed linear finish — natural stainless steel tone.' },
      { name: 'Black Hairline', description: 'PVD coated black with brushed texture for modern interiors.' },
      { name: 'Gold Hairline', description: 'PVD gold-tint with linear brush for luxury applications.' },
      { name: 'Rose Gold Hairline', description: 'PVD rose gold finish for premium branding & decor.' },
      { name: 'Copper / Blue Hairline', description: 'Colour-tinted hairline for specialty decorative work.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.5–0.8 mm (Thin)', description: 'Light decorative panels & signage.' },
      { name: '0.8–1.0 mm (Standard)', description: 'Elevator panels, wall cladding & furniture trim.' },
      { name: '1.0–1.5 mm (Medium)', description: 'Architectural cladding, wall panels & interiors.' },
      { name: '1.5–2.0 mm (Thick)', description: 'Heavy-duty panels & structural facades.' },
    ],
    applications: [
      'Architectural cladding & facades',
      'Elevator panels & cabin interiors',
      'Kitchen equipment & decor',
      'Escalator cladding & wall panels',
      'Hotel, mall & office interiors',
      'Furniture, fixtures & signage',
    ],
  },

  // ─── DESIGNER SHEETS ──────────────────────────────────────────────
  'designer-gold': {
    variants: [
      { name: 'Gold PVD Mirror Sheet 0.5 mm', dimensions: '4 × 8 ft', price: 7500, description: 'Mirror finish gold PVD for elevators & cladding.' },
      { name: 'Gold PVD Mirror Sheet 0.8 mm', dimensions: '4 × 8 ft', price: 10000, description: 'Standard gold mirror for wall panels.' },
      { name: 'Gold PVD Mirror Sheet 1.0 mm', dimensions: '4 × 8 ft', price: 12500, description: 'Heavy-duty gold mirror for premium interiors.' },
      { name: 'Gold Hairline Sheet 0.8 mm', dimensions: '4 × 8 ft', price: 9500, description: 'Brushed gold look with hairline finish.' },
      { name: 'Gold Vibration PVD Sheet', dimensions: '4 × 8 ft', price: 11000, description: 'Textured vibration finish — adds depth.' },
      { name: 'Gold Embossed Etched Sheet', dimensions: '4 × 8 ft', price: 13000, description: 'Patterned decorative option for premium interiors.' },
      { name: 'Gold PVD Sheet (4×10 ft)', dimensions: '4 × 10 ft', price: 14500, description: 'Large format gold PVD for continuous cladding.' },
      { name: 'Gold PVD Strip Bundle', dimensions: 'Strip', price: 3500, description: 'Strip format for borders, trims & detailing.' },
    ],
    materialGrades: [
      { name: 'SS 304 / 304L', description: 'General architectural & decorative use.' },
      { name: 'SS 316 / 316L', description: 'Better corrosion resistance for coastal/exterior environments.' },
      { name: 'SS 202', description: 'Lower-cost alternative for indoor decorative applications.' },
    ],
    finishes: [
      { name: 'Gold Mirror (8K)', description: 'Bright reflective gold PVD surface.' },
      { name: 'Gold Hairline / Brushed', description: 'Linear fine texture with gold tone.' },
      { name: 'Gold Vibration / Patterned', description: 'Textured gold finish for design variation.' },
      { name: 'Gold Embossed / Etched', description: 'Decorative patterned gold surface for premium interiors.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.5–0.8 mm (Thin)', description: 'Signage, accents & light decorative panels.' },
      { name: '0.8–1.0 mm (Standard)', description: 'Elevator panels, wall cladding & partitions.' },
      { name: '1.0–1.5 mm (Medium)', description: 'Architectural facades & premium interiors.' },
      { name: '1.5–2.0 mm (Thick)', description: 'Heavy-duty decorative panels.' },
    ],
    applications: [
      'Elevator cabins & doors',
      'Wall cladding & partitions',
      'Hotel lobbies & reception areas',
      'Luxury interiors & furniture accents',
      'Signage & branding panels',
      'Architectural facades',
    ],
  },
  'designer-rosegold': {
    variants: [
      { name: 'Rose Gold PVD Mirror Sheet 0.5 mm', dimensions: '4 × 8 ft', price: 7500, description: 'Mirror finish rose gold PVD for elevators & cladding.' },
      { name: 'Rose Gold PVD Mirror Sheet 0.8 mm', dimensions: '4 × 8 ft', price: 10000, description: 'Standard rose gold mirror for wall panels.' },
      { name: 'Rose Gold PVD Mirror Sheet 1.0 mm', dimensions: '4 × 8 ft', price: 12500, description: 'Heavy-duty rose gold mirror for premium interiors.' },
      { name: 'Rose Gold Hairline Sheet 0.8 mm', dimensions: '4 × 8 ft', price: 9500, description: 'Subtle linear texture with rose gold tone.' },
      { name: 'Rose Gold Starlight PVD Sheet', dimensions: '4 × 8 ft', price: 11500, description: 'Textured starlight finish for boutique interiors.' },
      { name: 'Rose Gold Vibration Sheet', dimensions: '4 × 8 ft', price: 11000, description: 'Vibration textured rose gold for design variation.' },
      { name: 'Rose Gold PVD Sheet (4×10 ft)', dimensions: '4 × 10 ft', price: 14500, description: 'Large format rose gold for continuous cladding.' },
      { name: 'Rose Gold PVD Strip', dimensions: 'Strip', price: 3500, description: 'Strip format for borders & trim detailing.' },
    ],
    materialGrades: [
      { name: 'SS 304 / 304L', description: 'Primary substrate for rose gold PVD coating.' },
      { name: 'SS 316 / 316L', description: 'Better corrosion resistance for outdoor/coastal use.' },
      { name: 'SS 202', description: 'Budget substrate for indoor decorative applications.' },
    ],
    finishes: [
      { name: 'Rose Gold Mirror (8K)', description: 'Bright reflective rose gold PVD surface.' },
      { name: 'Rose Gold Hairline / Brushed', description: 'Linear fine texture with rose gold tone.' },
      { name: 'Rose Gold Starlight / Vibration', description: 'Textured decorative finishes for design variation.' },
      { name: 'Rose Gold Embossed / Beadblast', description: 'Specialty decorative textures.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.5–0.8 mm (Thin)', description: 'Signage, accents & light decorative panels.' },
      { name: '0.8–1.0 mm (Standard)', description: 'Elevator panels, wall cladding & partitions.' },
      { name: '1.0–1.5 mm (Medium)', description: 'Architectural facades & premium interiors.' },
      { name: '1.5–2.0 mm (Thick)', description: 'Heavy-duty decorative panels.' },
    ],
    applications: [
      'Elevator cabin interiors & doors',
      'Wall cladding & partitions',
      'Architectural facades & columns',
      'Luxury signage & decorative accents',
      'Feature walls in hotels, malls & offices',
      'Kitchen backsplashes & high-end furniture',
    ],
  },
  'designer-black': {
    variants: [
      { name: 'Black PVD Mirror Sheet 0.5 mm', dimensions: '4 × 8 ft', price: 6500, description: 'Thin black mirror for decorative accents.' },
      { name: 'Black PVD Mirror Sheet 0.8 mm', dimensions: '4 × 8 ft', price: 9000, description: 'Standard black mirror for elevator & wall panels.' },
      { name: 'Black PVD Mirror Sheet 1.0 mm', dimensions: '4 × 8 ft', price: 11500, description: 'Premium black mirror for luxury interiors.' },
      { name: 'Black Hairline Sheet 0.8 mm', dimensions: '4 × 8 ft', price: 8500, description: 'Brushed black for modern interiors.' },
      { name: 'Black Vibration PVD Sheet', dimensions: '4 × 8 ft', price: 10000, description: 'Textured black finish for design variation.' },
      { name: 'SS316L Black Mirror Sheet', dimensions: '4 × 8 ft', price: 13000, description: 'Corrosion-resistant black mirror for outdoor use.' },
      { name: 'Black PVD Sheet (4×10 ft)', dimensions: '4 × 10 ft', price: 13500, description: 'Large format black mirror for continuous cladding.' },
      { name: 'Black Mirror Strip Bundle', dimensions: 'Strip', price: 3200, description: 'Strip format for borders & architectural trims.' },
    ],
    materialGrades: [
      { name: 'SS 304 / 304L', description: 'Most common substrate for black PVD mirror finish.' },
      { name: 'SS 316 / 316L', description: 'Better corrosion resistance for outdoor/coastal applications.' },
      { name: 'SS 201', description: 'Budget option for indoor decorative use.' },
    ],
    finishes: [
      { name: 'Black Mirror (8K) PVD', description: 'Deep reflective black mirror surface via PVD coating.' },
      { name: 'Black Hairline / Brushed', description: 'Linear texture with black PVD tone.' },
      { name: 'Black Vibration / Etched', description: 'Textured black finishes for design variation.' },
      { name: 'Black Beadblast / Mist', description: 'Matte-effect black decorative surface.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '0.5–0.8 mm (Thin)', description: 'Signage, accents & light decorative panels.' },
      { name: '0.8–1.0 mm (Standard)', description: 'Elevator panels, wall cladding & partitions.' },
      { name: '1.0–1.5 mm (Medium)', description: 'Architectural facades & premium interiors.' },
      { name: '1.5–2.0 mm (Thick)', description: 'Heavy-duty decorative panels.' },
    ],
    applications: [
      'Elevator doors & interiors',
      'Decorative wall cladding & partitions',
      'Retail & showroom facades',
      'Furniture trim & accents',
      'Signage & branding panels',
      'Commercial interior design',
    ],
  },

  // ─── SS RAILING ───────────────────────────────────────────────────
  'ss-baluster': {
    variants: [
      { name: 'SS Baluster 2½ ft (202)', dimensions: '2½ ft', price: 350, description: 'Short baluster for interior railings & partitions.' },
      { name: 'SS Baluster 3 ft (202)', dimensions: '3 ft', price: 420, description: 'Standard height for staircase railings.' },
      { name: 'SS Baluster 3½ ft (202)', dimensions: '3½ ft', price: 490, description: 'Balcony railing height baluster.' },
      { name: 'SS Baluster 4 ft (202)', dimensions: '4 ft', price: 560, description: 'Tall baluster for terrace & balcony railings.' },
      { name: 'SS Baluster 3 ft (304)', dimensions: '3 ft', price: 570, description: 'Premium 304 grade for corrosion resistance.' },
      { name: 'SS Baluster 3½ ft (304)', dimensions: '3½ ft', price: 660, description: 'Premium 304 grade balcony baluster.' },
      { name: 'SS Baluster 4 ft (304)', dimensions: '4 ft', price: 760, description: 'Premium 304 grade tall baluster.' },
      { name: 'SS Designer Baluster', dimensions: 'Custom', price: 850, description: 'Designer pattern baluster with decorative elements.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget-friendly for indoor staircase railings.' },
      { name: 'SS 304', description: 'Corrosion-resistant for indoor/outdoor railings.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine reflective finish.' },
      { name: 'Satin / Brushed', description: 'Matte finish, hides fingerprints.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '1.0 mm Wall', description: 'Standard wall thickness for light-duty railings.' },
      { name: '1.2 mm Wall', description: 'Medium-duty for residential railings.' },
      { name: '1.5 mm Wall', description: 'Heavy-duty for commercial & balcony railings.' },
    ],
    applications: [
      'Staircase railings',
      'Balcony & terrace railings',
      'Interior partition railings',
      'Commercial building railings',
    ],
  },
  'ss-handrail': {
    variants: [
      { name: 'SS Handrail 1½" (202)', dimensions: '38.1 mm OD', price: 280, description: 'Standard handrail for residential stairs (per ft).' },
      { name: 'SS Handrail 2" (202)', dimensions: '50.8 mm OD', price: 350, description: 'Popular size for commercial railings (per ft).' },
      { name: 'SS Handrail 2½" (202)', dimensions: '63.5 mm OD', price: 450, description: 'Heavy-duty handrail for wide railings (per ft).' },
      { name: 'SS Handrail 1½" (304)', dimensions: '38.1 mm OD', price: 380, description: 'Premium grade for indoor/outdoor use (per ft).' },
      { name: 'SS Handrail 2" (304)', dimensions: '50.8 mm OD', price: 480, description: 'Premium commercial handrail (per ft).' },
      { name: 'SS Handrail 2½" (304)', dimensions: '63.5 mm OD', price: 600, description: 'Premium heavy-duty handrail (per ft).' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget-friendly for indoor railings.' },
      { name: 'SS 304', description: 'Corrosion-resistant for indoor/outdoor use.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine smooth finish.' },
      { name: 'Satin / Brushed', description: 'Anti-fingerprint matte finish.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '1.2 mm Wall', description: 'Standard for residential handrails.' },
      { name: '1.5 mm Wall', description: 'Medium-duty for commercial use.' },
      { name: '2.0 mm Wall', description: 'Heavy-duty for public buildings.' },
    ],
    applications: [
      'Staircase handrails',
      'Balcony railing top rails',
      'Commercial building handrails',
      'Hospital & public building handrails',
    ],
  },
  'ss-railing-bracket': {
    variants: [
      { name: 'SS Flat Wall Bracket', dimensions: 'Flat', price: 180, description: 'Simple flat bracket for wall-mounted handrails.' },
      { name: 'SS Curved Wall Bracket', dimensions: 'Curved', price: 220, description: 'Curved design bracket for elegant look.' },
      { name: 'SS Adjustable Bracket', dimensions: 'Adjustable', price: 280, description: 'Angle-adjustable bracket for angled walls.' },
      { name: 'SS Heavy Duty Bracket (304)', dimensions: 'Heavy', price: 350, description: 'Premium 304 grade heavy-duty bracket.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget for indoor use.' },
      { name: 'SS 304', description: 'Corrosion-resistant for all environments.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine finish.' },
      { name: 'Satin Brushed', description: 'Anti-fingerprint matte look.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: 'Wall Mount', description: 'Direct wall mounting with screws.' },
      { name: 'Post Mount', description: 'Mount on railing post.' },
    ],
    applications: [
      'Handrail wall mounting',
      'Staircase railing supports',
      'Balcony railing connections',
    ],
  },
  'ss-base-plate': {
    variants: [
      { name: 'SS Round Base Plate 80 mm', dimensions: 'Round 80 mm', price: 150, description: 'Standard round base for baluster posts.' },
      { name: 'SS Round Base Plate 105 mm', dimensions: 'Round 105 mm', price: 200, description: 'Larger round base for heavy posts.' },
      { name: 'SS Square Base Plate 80 mm', dimensions: 'Square 80 mm', price: 180, description: 'Square base plate for railing posts.' },
      { name: 'SS Square Base Plate 100 mm', dimensions: 'Square 100 mm', price: 250, description: 'Large square base for heavy-duty posts.' },
      { name: 'SS Base Plate (304 Grade)', dimensions: 'Various', price: 280, description: 'Premium 304 grade base plate.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget for indoor railings.' },
      { name: 'SS 304', description: 'Corrosion-resistant for all use.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine finish.' },
      { name: 'Satin Brushed', description: 'Matte anti-fingerprint.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '5 mm Thick', description: 'Standard for residential railings.' },
      { name: '8 mm Thick', description: 'Heavy-duty for commercial use.' },
    ],
    applications: [
      'Railing post mounting',
      'Baluster base fixing',
      'Staircase & balcony railing bases',
    ],
  },
  'ss-elbow-connector': {
    variants: [
      { name: 'SS Elbow 25 mm (202)', dimensions: '25 mm', price: 80, description: '90-degree elbow for 25 mm pipes.' },
      { name: 'SS Elbow 38 mm (202)', dimensions: '38 mm', price: 120, description: '90-degree elbow for 38 mm pipes.' },
      { name: 'SS Elbow 50 mm (202)', dimensions: '50 mm', price: 160, description: '90-degree elbow for 50 mm pipes.' },
      { name: 'SS Elbow 38 mm (304)', dimensions: '38 mm', price: 165, description: 'Premium grade elbow connector.' },
      { name: 'SS Elbow 50 mm (304)', dimensions: '50 mm', price: 220, description: 'Premium grade large elbow.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget for indoor use.' },
      { name: 'SS 304', description: 'Corrosion-resistant for all environments.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine finish.' },
      { name: 'Satin Brushed', description: 'Matte look.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '90° Elbow', description: 'Standard right-angle connector.' },
      { name: '135° Elbow', description: 'Obtuse angle for angled railings.' },
    ],
    applications: [
      'Handrail corners & turns',
      'Railing direction changes',
      'Pipe connections in railings',
    ],
  },
  'ss-end-cap': {
    variants: [
      { name: 'SS End Cap 25 mm (202)', dimensions: '25 mm', price: 45, description: 'Flat end cap for 25 mm pipe.' },
      { name: 'SS End Cap 38 mm (202)', dimensions: '38 mm', price: 60, description: 'Flat end cap for 38 mm pipe.' },
      { name: 'SS End Cap 50 mm (202)', dimensions: '50 mm', price: 80, description: 'Flat end cap for 50 mm pipe.' },
      { name: 'SS Dome End Cap 38 mm', dimensions: '38 mm Dome', price: 85, description: 'Dome-shaped end cap for elegant look.' },
      { name: 'SS End Cap 50 mm (304)', dimensions: '50 mm', price: 110, description: 'Premium grade end cap.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget for indoor use.' },
      { name: 'SS 304', description: 'Corrosion-resistant.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine finish.' },
      { name: 'Satin Brushed', description: 'Matte finish.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: 'Flat Cap', description: 'Flat surface end cap.' },
      { name: 'Dome Cap', description: 'Rounded dome-shaped cap.' },
    ],
    applications: [
      'Handrail pipe ends',
      'Railing post caps',
      'Furniture pipe endings',
    ],
  },

  // ─── SS GATE & GRILLS ─────────────────────────────────────────────
  'ss-main-gate': {
    variants: [
      { name: 'SS Main Gate 4×7 ft (202)', dimensions: '4 × 7 ft', price: 25000, description: 'Standard single door SS gate.' },
      { name: 'SS Main Gate 5×7 ft (202)', dimensions: '5 × 7 ft', price: 32000, description: 'Medium width SS gate for homes.' },
      { name: 'SS Main Gate 6×7 ft (202)', dimensions: '6 × 7 ft', price: 40000, description: 'Wide single panel SS gate.' },
      { name: 'SS Main Gate 8×7 ft (202)', dimensions: '8 × 7 ft', price: 55000, description: 'Double-panel wide SS gate.' },
      { name: 'SS Main Gate 5×7 ft (304)', dimensions: '5 × 7 ft', price: 45000, description: 'Premium 304 grade gate.' },
      { name: 'SS Designer Gate (Custom)', dimensions: 'Custom', price: 65000, description: 'Custom designer SS gate with patterns.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget-friendly for residential gates.' },
      { name: 'SS 304', description: 'Premium corrosion-resistant for all locations.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine reflective finish.' },
      { name: 'Satin Brushed', description: 'Elegant matte finish.' },
      { name: 'Gold PVD Accents', description: 'Gold-toned decorative elements.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: 'Swing Gate', description: 'Traditional single/double swing opening.' },
      { name: 'Sliding Gate', description: 'Space-saving sliding mechanism.' },
    ],
    applications: [
      'Residential main entrance',
      'Villa & bungalow gates',
      'Commercial property entrance',
      'Farmhouse gates',
    ],
  },
  'ss-window-grill': {
    variants: [
      { name: 'SS Window Grill 3×3 ft (202)', dimensions: '3 × 3 ft', price: 2500, description: 'Small window grill for bathrooms.' },
      { name: 'SS Window Grill 3×4 ft (202)', dimensions: '3 × 4 ft', price: 3200, description: 'Standard window grill.' },
      { name: 'SS Window Grill 4×4 ft (202)', dimensions: '4 × 4 ft', price: 4000, description: 'Medium window grill.' },
      { name: 'SS Window Grill 4×5 ft (202)', dimensions: '4 × 5 ft', price: 5000, description: 'Large window grill.' },
      { name: 'SS Window Grill 4×4 ft (304)', dimensions: '4 × 4 ft', price: 5600, description: 'Premium 304 grade window grill.' },
      { name: 'SS Designer Window Grill', dimensions: 'Custom', price: 6500, description: 'Custom pattern designer window grill.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget-friendly for indoor/sheltered windows.' },
      { name: 'SS 304', description: 'Corrosion-resistant for all locations.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine finish.' },
      { name: 'Satin Brushed', description: 'Matte anti-fingerprint.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: 'Fixed Grill', description: 'Permanently fixed window grill.' },
      { name: 'Openable Grill', description: 'Grill with opening for cleaning.' },
    ],
    applications: [
      'Residential window security',
      'Commercial building windows',
      'Ventilation window grills',
    ],
  },
  'ss-balcony-grill': {
    variants: [
      { name: 'SS Balcony Grill 3×3 ft (202)', dimensions: '3 × 3 ft', price: 3500, description: 'Small balcony grill panel.' },
      { name: 'SS Balcony Grill 4×3 ft (202)', dimensions: '4 × 3 ft', price: 4200, description: 'Standard balcony grill panel.' },
      { name: 'SS Balcony Grill 5×3 ft (202)', dimensions: '5 × 3 ft', price: 5200, description: 'Medium balcony grill.' },
      { name: 'SS Balcony Grill 6×3 ft (202)', dimensions: '6 × 3 ft', price: 6200, description: 'Long balcony grill panel.' },
      { name: 'SS Balcony Grill 5×3 ft (304)', dimensions: '5 × 3 ft', price: 7200, description: 'Premium 304 grade balcony grill.' },
      { name: 'SS Designer Balcony Grill', dimensions: 'Custom', price: 8500, description: 'Custom designer balcony grill.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget-friendly for sheltered balconies.' },
      { name: 'SS 304', description: 'Corrosion-resistant for all locations.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine reflective finish.' },
      { name: 'Satin Brushed', description: 'Elegant matte finish.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: 'Fixed Panel', description: 'Permanently fixed balcony grill.' },
      { name: 'Modular Panel', description: 'Modular sections for easy installation.' },
    ],
    applications: [
      'Balcony safety grills',
      'Terrace railings',
      'Apartment balcony grills',
      'Commercial building balconies',
    ],
  },

  // ─── GLASS RAILING ────────────────────────────────────────────────
  'glass-clamp': {
    variants: [
      { name: 'Glass Clamp 45×45×27 mm Flat', dimensions: '45 × 45 × 27 mm', price: 280, description: 'Compact square clamp for flat surface installations.' },
      { name: 'Glass Clamp 45×45×25 mm Ø42', dimensions: '45 × 45 × 25 mm', price: 380, description: 'Square clamp sized for round tube posts.' },
      { name: 'Glass Clamp 50×40×26 mm Ø42.4', dimensions: '50 × 40 × 26 mm', price: 320, description: 'Wider clamp for 42.4 mm posts.' },
      { name: 'Glass Clamp 52×52×32.5 mm Flat', dimensions: '52 × 52 × 32.5 mm', price: 450, description: 'Larger clamp for thicker glass panels.' },
      { name: 'Glass Clamp 63×45×28 mm Flat', dimensions: '63 × 45 × 28 mm', price: 420, description: 'Wide rectangular clamp for heavy glass.' },
      { name: '180° SS Glass Clamp', dimensions: '180° Inline', price: 550, description: 'For joining panels at straight line connections.' },
      { name: 'Glass Clamp D-Shape', dimensions: 'D-Shape', price: 350, description: 'D-shaped for aesthetic minimalist design.' },
      { name: 'Premium Architectural Clamp', dimensions: 'Premium', price: 850, description: 'Premium architectural style for high-end finishes.' },
    ],
    materialGrades: [
      { name: 'SS 304 (A2)', description: 'Good corrosion resistance for indoor & sheltered areas.' },
      { name: 'SS 316 (A4)', description: 'Superior corrosion resistance for outdoor/exposed areas.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High shine, modern look.' },
      { name: 'Satin Brushed', description: 'Subtle matte finish, hides fingerprints.' },
    ],
    glassThickness: ['6 mm', '8 mm', '10 mm', '12 mm'],
    mountTypes: [
      { name: 'Flat Surface', description: 'Mount directly on flat surfaces or plates.' },
      { name: 'Round Post (Ø42 / Ø42.4)', description: 'Attach to round tubing.' },
      { name: 'Square Post', description: 'Attach to square tubing.' },
      { name: 'Corner / 180°', description: 'For panel connections at angles or inline.' },
    ],
    applications: [
      'Balcony railing',
      'Staircase glass panels',
      'Shower partitions',
      'Office glass partitions',
      'Pool fencing',
    ],
  },
  'glass-u-channel': {
    variants: [
      { name: 'U-Channel 12 mm Glass', dimensions: '12 mm', price: 380, description: 'Standard U-channel for 12 mm glass (per ft).' },
      { name: 'U-Channel 15 mm Glass', dimensions: '15 mm', price: 450, description: 'For 15 mm toughened glass (per ft).' },
      { name: 'U-Channel 19 mm Glass', dimensions: '19 mm', price: 550, description: 'For 19 mm heavy glass panels (per ft).' },
      { name: 'U-Channel 21 mm Glass', dimensions: '21 mm', price: 650, description: 'For 21 mm laminated glass (per ft).' },
      { name: 'U-Channel 12 mm (304 Grade)', dimensions: '12 mm, SS304', price: 520, description: 'Premium 304 grade channel.' },
      { name: 'U-Channel 15 mm (304 Grade)', dimensions: '15 mm, SS304', price: 620, description: 'Premium 304 grade for larger glass.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget-friendly for indoor applications.' },
      { name: 'SS 304', description: 'Corrosion-resistant for indoor/outdoor.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine reflective finish.' },
      { name: 'Satin Brushed', description: 'Matte anti-fingerprint finish.' },
    ],
    glassThickness: ['12 mm', '15 mm', '19 mm', '21 mm'],
    mountTypes: [
      { name: '1.5 mm Wall', description: 'Standard wall thickness.' },
      { name: '2.0 mm Wall', description: 'Heavy-duty wall thickness.' },
    ],
    applications: [
      'Frameless glass railing base',
      'Glass balcony railing',
      'Glass partition base',
      'Terrace glass railing',
    ],
  },
  'glass-top-rail': {
    variants: [
      { name: 'Top Rail 25 mm', dimensions: '25 mm', price: 250, description: 'Slim top rail profile for glass railings (per ft).' },
      { name: 'Top Rail 38 mm', dimensions: '38 mm', price: 320, description: 'Standard top rail for balcony railings (per ft).' },
      { name: 'Top Rail 50 mm', dimensions: '50 mm', price: 400, description: 'Wide top rail for commercial railings (per ft).' },
      { name: 'Top Rail 38 mm (304)', dimensions: '38 mm, SS304', price: 430, description: 'Premium grade top rail.' },
      { name: 'Top Rail 50 mm (304)', dimensions: '50 mm, SS304', price: 540, description: 'Premium wide top rail.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget for indoor railings.' },
      { name: 'SS 304', description: 'Corrosion-resistant for all use.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine finish.' },
      { name: 'Satin Brushed', description: 'Matte finish.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '1.5 mm Wall', description: 'Standard thickness.' },
      { name: '2.0 mm Wall', description: 'Heavy-duty thickness.' },
    ],
    applications: [
      'Glass railing top cap',
      'Balcony railing finish',
      'Staircase glass railing top',
    ],
  },
  'glass-cover-plate': {
    variants: [
      { name: 'Round Cover Plate 80 mm', dimensions: 'Round 80 mm', price: 120, description: 'Standard round cover plate for post bases.' },
      { name: 'Square Cover Plate 80 mm', dimensions: 'Square 80 mm', price: 140, description: 'Square cover plate for post bases.' },
      { name: 'Round Cover Plate 105 mm', dimensions: 'Round 105 mm', price: 180, description: 'Larger round cover for heavy posts.' },
      { name: 'Cover Plate 80 mm (304)', dimensions: 'Round 80 mm, SS304', price: 165, description: 'Premium grade cover plate.' },
    ],
    materialGrades: [
      { name: 'SS 202', description: 'Budget for indoor use.' },
      { name: 'SS 304', description: 'Corrosion-resistant.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine finish.' },
      { name: 'Satin Brushed', description: 'Matte finish.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: 'Round', description: 'Circular cover plate.' },
      { name: 'Square', description: 'Square cover plate.' },
    ],
    applications: [
      'Railing post base covers',
      'Glass railing post bases',
      'Decorative base finishing',
    ],
  },
  'glass-patch-fitting': {
    variants: [
      { name: 'Patch Fitting Standard', dimensions: 'Standard', price: 850, description: 'Standard patch fitting for glass doors.' },
      { name: 'Patch Fitting Heavy Duty', dimensions: 'Heavy Duty', price: 1200, description: 'Heavy-duty for large glass doors.' },
      { name: 'Patch Fitting Corner', dimensions: 'Corner', price: 950, description: 'Corner patch fitting for glass partitions.' },
      { name: 'Patch Fitting (304 Grade)', dimensions: 'SS304', price: 1100, description: 'Premium 304 grade patch fitting.' },
      { name: 'Patch Fitting Set (Top+Bottom)', dimensions: 'Set', price: 2200, description: 'Complete set with top & bottom fittings.' },
    ],
    materialGrades: [
      { name: 'SS 304', description: 'Standard for glass door fittings.' },
      { name: 'SS 316', description: 'For outdoor/coastal glass installations.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine finish.' },
      { name: 'Satin Brushed', description: 'Matte anti-fingerprint.' },
    ],
    glassThickness: ['10 mm', '12 mm'],
    mountTypes: [
      { name: 'Top Patch', description: 'Ceiling/header mounted.' },
      { name: 'Bottom Patch', description: 'Floor/pivot mounted.' },
      { name: 'Corner Patch', description: 'For glass-to-glass corners.' },
    ],
    applications: [
      'Frameless glass doors',
      'Glass partition doors',
      'Showroom glass entrances',
      'Office glass doors',
    ],
  },
  'spider-glass-fitting': {
    variants: [
      { name: 'Spider Fitting 1-Arm', dimensions: '1 Arm', price: 450, description: 'Single arm spider fitting.' },
      { name: 'Spider Fitting 2-Arm', dimensions: '2 Arm', price: 650, description: 'Two-arm spider for panel edges.' },
      { name: 'Spider Fitting 3-Arm', dimensions: '3 Arm', price: 850, description: 'Three-arm for T-junctions.' },
      { name: 'Spider Fitting 4-Arm', dimensions: '4 Arm', price: 1050, description: 'Four-arm for panel intersections.' },
      { name: 'Spider Fitting 2-Arm (316)', dimensions: '2 Arm, SS316', price: 850, description: 'Marine grade two-arm spider.' },
      { name: 'Spider Fitting 4-Arm (316)', dimensions: '4 Arm, SS316', price: 1350, description: 'Marine grade four-arm spider.' },
    ],
    materialGrades: [
      { name: 'SS 304', description: 'Standard for architectural glazing.' },
      { name: 'SS 316', description: 'For outdoor/coastal spider glazing.' },
    ],
    finishes: [
      { name: 'Mirror Polished', description: 'High-shine architectural finish.' },
      { name: 'Satin Brushed', description: 'Modern matte finish.' },
    ],
    glassThickness: ['10 mm', '12 mm', '15 mm'],
    mountTypes: [
      { name: '1-Arm (Point)', description: 'Single point fixing.' },
      { name: '2-Arm (Edge)', description: 'Two-point edge fixing.' },
      { name: '3-Arm (T-Joint)', description: 'Three-point T-junction.' },
      { name: '4-Arm (Cross)', description: 'Four-point intersection.' },
    ],
    applications: [
      'Spider glazing facades',
      'Glass curtain walls',
      'Canopy & awning glazing',
      'Structural glass installations',
    ],
  },
  'toughened-glass-panel': {
    variants: [
      { name: 'Toughened Glass 8 mm', dimensions: 'Per sq ft', price: 150, description: '8 mm toughened glass for railings & partitions.' },
      { name: 'Toughened Glass 10 mm', dimensions: 'Per sq ft', price: 185, description: '10 mm for balcony railings & doors.' },
      { name: 'Toughened Glass 12 mm', dimensions: 'Per sq ft', price: 220, description: '12 mm for heavy-duty railing & facades.' },
      { name: 'Toughened Glass 15 mm', dimensions: 'Per sq ft', price: 300, description: '15 mm for structural glazing.' },
      { name: 'Clear Toughened Panel (Custom)', dimensions: 'Custom', price: 200, description: 'Custom-cut clear toughened panel.' },
    ],
    materialGrades: [
      { name: 'Clear Float', description: 'Standard transparent toughened glass.' },
      { name: 'Low Iron (Ultra Clear)', description: 'Extra-clear glass without green tint.' },
    ],
    finishes: [
      { name: 'Clear', description: 'Standard transparent finish.' },
      { name: 'Green Tint', description: 'Standard float glass with slight green tint.' },
      { name: 'Bronze Tint', description: 'Tinted for reduced glare.' },
    ],
    glassThickness: ['8 mm', '10 mm', '12 mm', '15 mm'],
    mountTypes: [
      { name: 'Polished Edge', description: 'Smooth polished edges.' },
      { name: 'Bevelled Edge', description: 'Chamfered decorative edges.' },
    ],
    applications: [
      'Glass railings & balustrades',
      'Glass partitions',
      'Glass doors & facades',
      'Shower enclosures',
      'Canopy glazing',
    ],
  },
  'laminated-glass': {
    variants: [
      { name: 'Laminated Glass 5+5 mm', dimensions: 'Per sq ft', price: 220, description: '10 mm total (5+5) for railings & safety glazing.' },
      { name: 'Laminated Glass 6+6 mm', dimensions: 'Per sq ft', price: 280, description: '12 mm total (6+6) for balcony railings.' },
      { name: 'Laminated Glass 8+8 mm', dimensions: 'Per sq ft', price: 380, description: '16 mm total for structural glazing.' },
      { name: 'Laminated Glass (Custom)', dimensions: 'Custom', price: 300, description: 'Custom configuration laminated glass.' },
    ],
    materialGrades: [
      { name: 'PVB Interlayer', description: 'Standard PVB laminated for safety glazing.' },
      { name: 'SGP Interlayer', description: 'SentryGlas Plus for structural applications.' },
    ],
    finishes: [
      { name: 'Clear', description: 'Standard transparent laminated.' },
      { name: 'Milky White', description: 'Translucent white interlayer.' },
      { name: 'Colour Tinted', description: 'Tinted interlayer options.' },
    ],
    glassThickness: ['5+5 mm', '6+6 mm', '8+8 mm', '10+10 mm'],
    mountTypes: [
      { name: 'Polished Edge', description: 'Smooth finished edges.' },
      { name: 'Flat Edge', description: 'Standard flat ground edges.' },
    ],
    applications: [
      'Safety railings & balustrades',
      'Overhead glazing & canopies',
      'Glass floors & treads',
      'Security glazing',
      'Sound insulation panels',
    ],
  },
  'frosted-glass': {
    variants: [
      { name: 'Frosted Glass 8 mm', dimensions: 'Per sq ft', price: 180, description: '8 mm frosted for privacy partitions.' },
      { name: 'Frosted Glass 10 mm', dimensions: 'Per sq ft', price: 220, description: '10 mm for bathroom & office partitions.' },
      { name: 'Frosted Glass 12 mm', dimensions: 'Per sq ft', price: 280, description: '12 mm for heavy-duty privacy panels.' },
      { name: 'Acid Etched Glass 10 mm', dimensions: 'Per sq ft', price: 250, description: 'Acid-etched for premium frosted look.' },
    ],
    materialGrades: [
      { name: 'Sand Blasted', description: 'Mechanically frosted surface.' },
      { name: 'Acid Etched', description: 'Chemically etched smooth frosted surface.' },
    ],
    finishes: [
      { name: 'Full Frosted', description: 'Completely frosted surface.' },
      { name: 'Partial Frosted', description: 'Selective frosting with clear areas.' },
      { name: 'Gradient Frosted', description: 'Gradual frosting effect.' },
    ],
    glassThickness: ['8 mm', '10 mm', '12 mm'],
    mountTypes: [
      { name: 'Polished Edge', description: 'Smooth polished edges.' },
      { name: 'Flat Edge', description: 'Standard ground edges.' },
    ],
    applications: [
      'Bathroom partitions & doors',
      'Office cabin partitions',
      'Privacy screens',
      'Decorative glazing',
    ],
  },

  // ─── SHOWER ───────────────────────────────────────────────────────
  'shower-partition': {
    variants: [
      { name: 'Shower Partition 3×3 ft', dimensions: '3 × 3 ft', price: 8500, description: 'Standard L-shaped shower partition.' },
      { name: 'Shower Partition 3×4 ft', dimensions: '3 × 4 ft', price: 10500, description: 'Medium shower partition with door.' },
      { name: 'Shower Partition 4×4 ft', dimensions: '4 × 4 ft', price: 13000, description: 'Large shower enclosure.' },
      { name: 'Shower Partition (Custom)', dimensions: 'Custom', price: 12000, description: 'Custom-sized shower partition.' },
    ],
    materialGrades: [
      { name: '8 mm Toughened', description: 'Standard toughened glass shower partition.' },
      { name: '10 mm Toughened', description: 'Heavy-duty toughened glass.' },
    ],
    finishes: [
      { name: 'Clear Glass', description: 'Transparent shower partition.' },
      { name: 'Frosted Glass', description: 'Privacy frosted partition.' },
      { name: 'Printed Glass', description: 'Decorative printed partition.' },
    ],
    glassThickness: ['8 mm', '10 mm'],
    mountTypes: [
      { name: 'Wall-to-Wall', description: 'Fixed between two walls.' },
      { name: 'L-Shape', description: 'Corner partition with two panels.' },
    ],
    applications: [
      'Bathroom shower enclosure',
      'Hotel bathroom partitions',
      'Residential bathrooms',
    ],
  },
  'shower-sliding': {
    variants: [
      { name: 'Sliding Shower 3×6.5 ft', dimensions: '3 × 6.5 ft', price: 12000, description: 'Standard sliding shower door.' },
      { name: 'Sliding Shower 3.5×6.5 ft', dimensions: '3.5 × 6.5 ft', price: 15000, description: 'Wide sliding shower door.' },
      { name: 'Sliding Shower 4×6.5 ft', dimensions: '4 × 6.5 ft', price: 18000, description: 'Extra-wide sliding shower.' },
      { name: 'Sliding Shower (Custom)', dimensions: 'Custom', price: 16000, description: 'Custom-sized sliding shower.' },
    ],
    materialGrades: [
      { name: '8 mm Toughened', description: 'Standard toughened glass.' },
      { name: '10 mm Toughened', description: 'Premium toughened glass.' },
    ],
    finishes: [
      { name: 'Clear Glass', description: 'Transparent sliding door.' },
      { name: 'Frosted Glass', description: 'Privacy sliding door.' },
    ],
    glassThickness: ['8 mm', '10 mm'],
    mountTypes: [
      { name: 'Top Hung', description: 'Track mounted on top header.' },
      { name: 'Bottom Rolling', description: 'Track on bottom rail.' },
    ],
    applications: [
      'Bathroom sliding shower door',
      'Compact bathroom enclosures',
      'Hotel bathroom doors',
    ],
  },
  'shower-frameless': {
    variants: [
      { name: 'Frameless Shower 3×6.5 ft', dimensions: '3 × 6.5 ft', price: 15000, description: 'Standard frameless shower enclosure.' },
      { name: 'Frameless Shower 3.5×6.5 ft', dimensions: '3.5 × 6.5 ft', price: 18000, description: 'Wide frameless shower.' },
      { name: 'Frameless Shower 4×6.5 ft', dimensions: '4 × 6.5 ft', price: 22000, description: 'Premium large frameless shower.' },
      { name: 'Frameless Shower L-Shape', dimensions: 'L-Shape', price: 25000, description: 'L-shaped frameless corner shower.' },
      { name: 'Frameless Shower (Custom)', dimensions: 'Custom', price: 20000, description: 'Custom frameless shower enclosure.' },
    ],
    materialGrades: [
      { name: '10 mm Toughened', description: 'Standard for frameless showers.' },
      { name: '12 mm Toughened', description: 'Premium heavy-duty frameless.' },
    ],
    finishes: [
      { name: 'Clear Glass', description: 'Transparent frameless look.' },
      { name: 'Nano Coated', description: 'Easy-clean nano coated glass.' },
    ],
    glassThickness: ['10 mm', '12 mm'],
    mountTypes: [
      { name: 'Hinged Door', description: 'Swing-open frameless door.' },
      { name: 'Pivot Door', description: 'Center-pivot frameless door.' },
    ],
    applications: [
      'Premium bathroom showers',
      'Luxury hotel bathrooms',
      'Modern residential bathrooms',
    ],
  },

  // ─── ALUMINIUM ────────────────────────────────────────────────────
  'alu-sliding': {
    variants: [
      { name: 'Aluminium Sliding 2-Track (Standard)', dimensions: '2 Track', price: 185, description: 'Standard 2-track sliding section (per kg).' },
      { name: 'Aluminium Sliding 3-Track (Standard)', dimensions: '3 Track', price: 210, description: '3-track for wider openings (per kg).' },
      { name: 'Aluminium Sliding 2-Track (Heavy)', dimensions: '2 Track Heavy', price: 240, description: 'Heavy-duty 2-track for large windows (per kg).' },
      { name: 'Aluminium Sliding 3-Track (Heavy)', dimensions: '3 Track Heavy', price: 270, description: 'Heavy-duty 3-track section (per kg).' },
      { name: 'Aluminium Sliding 4-Track', dimensions: '4 Track', price: 300, description: 'Extra-wide 4-track sliding section (per kg).' },
    ],
    materialGrades: [
      { name: 'Standard (6063-T5)', description: 'Standard aluminium alloy for windows.' },
      { name: 'Heavy Duty (6063-T6)', description: 'Stronger alloy for large openings.' },
    ],
    finishes: [
      { name: 'Natural Anodized', description: 'Silver anodized aluminium.' },
      { name: 'Powder Coated', description: 'Colour powder coat finish.' },
      { name: 'Wood Grain', description: 'Wood-look finish for aesthetics.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: '2 Track', description: 'Two-panel sliding system.' },
      { name: '3 Track', description: 'Three-panel for wider openings.' },
      { name: '4 Track', description: 'Four-panel for extra-wide openings.' },
    ],
    applications: [
      'Residential sliding windows',
      'Balcony sliding doors',
      'Office sliding windows',
      'Commercial building windows',
    ],
  },
  'alu-door': {
    variants: [
      { name: 'Aluminium Door Section (Standard)', dimensions: 'Single Door', price: 240, description: 'Standard aluminium door section (per kg).' },
      { name: 'Aluminium Door Section (Heavy)', dimensions: 'Single Door Heavy', price: 310, description: 'Heavy-duty aluminium door (per kg).' },
      { name: 'Aluminium Sliding Door Section', dimensions: 'Sliding Door', price: 280, description: 'Sliding door section (per kg).' },
      { name: 'Aluminium Double Door Section', dimensions: 'Double Door', price: 350, description: 'Double-door section for wide entrances (per kg).' },
      { name: 'Aluminium French Door Section', dimensions: 'French Door', price: 380, description: 'French door style section (per kg).' },
    ],
    materialGrades: [
      { name: 'Standard (6063-T5)', description: 'Standard alloy for residential doors.' },
      { name: 'Heavy Duty (6063-T6)', description: 'Stronger alloy for commercial doors.' },
    ],
    finishes: [
      { name: 'Natural Anodized', description: 'Silver anodized finish.' },
      { name: 'Powder Coated', description: 'Colour powder coat finish.' },
      { name: 'Wood Grain', description: 'Wood-look finish for aesthetics.' },
    ],
    glassThickness: [],
    mountTypes: [
      { name: 'Swing Door', description: 'Traditional swing opening.' },
      { name: 'Sliding Door', description: 'Space-saving sliding mechanism.' },
    ],
    applications: [
      'Residential entrance doors',
      'Balcony doors',
      'Office doors',
      'Commercial building doors',
    ],
  },
};

export const getProductSpecs = (slug: string): ProductSpecDetail | null => {
  return productSpecs[slug] || null;
};
