
-- Add 3 new categories
INSERT INTO public.categories (name, slug, description, display_order) VALUES
  ('Shower Enclosures', 'shower-enclosures', 'Glass shower enclosures, cubicles & accessories', 7),
  ('Toughened Glass', 'toughened-glass', 'Toughened/tempered glass panels for railings, partitions & facades', 8),
  ('SS Gate & Grills', 'ss-gate-grills', 'Stainless steel gates, window grills & security grills', 9);

-- Add products for Shower Enclosures
INSERT INTO public.products (name, slug, description, category_id, base_price, sizes, thicknesses, in_stock, is_featured, display_order)
SELECT 
  'Frameless Shower Enclosure', 'shower-frameless',
  'Premium frameless glass shower enclosure for modern bathrooms. Sleek, minimal design with toughened glass.',
  id, 12000, ARRAY['3×3 ft','3×4 ft','4×4 ft','4×6 ft','Custom'], ARRAY['8mm','10mm','12mm'],
  true, true, 1
FROM categories WHERE slug = 'shower-enclosures';

INSERT INTO public.products (name, slug, description, category_id, base_price, sizes, thicknesses, in_stock, is_featured, display_order)
SELECT 
  'Sliding Shower Cubicle', 'shower-sliding',
  'Space-saving sliding door shower cubicle with SS hardware and tempered glass panels.',
  id, 15000, ARRAY['3×3 ft','3×4 ft','4×4 ft','4×6 ft','Custom'], ARRAY['8mm','10mm','12mm'],
  true, true, 2
FROM categories WHERE slug = 'shower-enclosures';

INSERT INTO public.products (name, slug, description, category_id, base_price, sizes, thicknesses, in_stock, is_featured, display_order)
SELECT 
  'Shower Partition Glass', 'shower-partition',
  'Fixed glass shower partition with SS fittings. Ideal for walk-in showers.',
  id, 6500, ARRAY['3×6 ft','3×7 ft','4×7 ft','Custom'], ARRAY['8mm','10mm','12mm'],
  true, false, 3
FROM categories WHERE slug = 'shower-enclosures';

-- Add products for Toughened Glass
INSERT INTO public.products (name, slug, description, category_id, base_price, sizes, thicknesses, in_stock, is_featured, display_order)
SELECT 
  'Toughened Glass Panel', 'toughened-panel',
  'Heat-treated safety glass panels for railings, partitions and facades. 5x stronger than regular glass.',
  id, 250, ARRAY['2×3 ft','3×4 ft','4×5 ft','4×8 ft','Custom'], ARRAY['8mm','10mm','12mm','15mm'],
  true, true, 1
FROM categories WHERE slug = 'toughened-glass';

INSERT INTO public.products (name, slug, description, category_id, base_price, sizes, thicknesses, in_stock, is_featured, display_order)
SELECT 
  'Laminated Safety Glass', 'laminated-glass',
  'Two layers of toughened glass with PVB interlayer. Maximum safety for balconies and staircases.',
  id, 450, ARRAY['2×3 ft','3×4 ft','4×5 ft','4×8 ft','Custom'], ARRAY['10+10mm','12+12mm'],
  true, true, 2
FROM categories WHERE slug = 'toughened-glass';

INSERT INTO public.products (name, slug, description, category_id, base_price, sizes, thicknesses, in_stock, is_featured, display_order)
SELECT 
  'Frosted Toughened Glass', 'frosted-glass',
  'Acid-etched frosted toughened glass for privacy partitions, bathroom doors and office cabins.',
  id, 320, ARRAY['2×3 ft','3×4 ft','4×5 ft','4×8 ft','Custom'], ARRAY['8mm','10mm','12mm'],
  true, false, 3
FROM categories WHERE slug = 'toughened-glass';

-- Add products for SS Gate & Grills
INSERT INTO public.products (name, slug, description, category_id, base_price, sizes, thicknesses, in_stock, is_featured, display_order)
SELECT 
  'SS Main Gate', 'ss-main-gate',
  'Premium stainless steel main gates with modern and classic designs. Custom fabrication available.',
  id, 35000, ARRAY['4×7 ft','5×7 ft','6×7 ft','8×7 ft','Custom'], ARRAY['Standard'],
  true, true, 1
FROM categories WHERE slug = 'ss-gate-grills';

INSERT INTO public.products (name, slug, description, category_id, base_price, sizes, thicknesses, in_stock, is_featured, display_order)
SELECT 
  'SS Window Grill', 'ss-window-grill',
  'Decorative stainless steel window grills for security and aesthetics. Multiple design options.',
  id, 3500, ARRAY['3×3 ft','3×4 ft','4×4 ft','4×5 ft','Custom'], ARRAY['Standard'],
  true, true, 2
FROM categories WHERE slug = 'ss-gate-grills';

INSERT INTO public.products (name, slug, description, category_id, base_price, sizes, thicknesses, in_stock, is_featured, display_order)
SELECT 
  'SS Balcony Grill', 'ss-balcony-grill',
  'Modern stainless steel balcony grills with glass or pipe infill options.',
  id, 4500, ARRAY['3×3 ft','4×3 ft','5×3 ft','6×3 ft','Custom'], ARRAY['Standard'],
  true, false, 3
FROM categories WHERE slug = 'ss-gate-grills';

-- Update existing product base_prices to approximate Gujarat market rates
-- SS Pipes (per kg approx)
UPDATE products SET base_price = 195 WHERE slug = 'ss-round-pipe';
UPDATE products SET base_price = 235 WHERE slug = 'ss-square-pipe';
UPDATE products SET base_price = 265 WHERE slug = 'ss-rect-pipe';
UPDATE products SET base_price = 340 WHERE slug = 'ss-oval-pipe';

-- SS Sheets (per sheet approx)
UPDATE products SET base_price = 3200 WHERE slug = 'ss-sheet-plain';
UPDATE products SET base_price = 4800 WHERE slug = 'ss-sheet-mirror';
UPDATE products SET base_price = 4200 WHERE slug = 'ss-sheet-hairline';

-- Designer Sheets (per sheet)
UPDATE products SET base_price = 9500 WHERE slug = 'designer-gold';
UPDATE products SET base_price = 9500 WHERE slug = 'designer-rosegold';
UPDATE products SET base_price = 8500 WHERE slug = 'designer-black';

-- SS Railing components
UPDATE products SET base_price = 520 WHERE slug = 'ss-baluster';
UPDATE products SET base_price = 420 WHERE slug = 'ss-handrail';

-- Glass railing fittings
UPDATE products SET base_price = 950 WHERE slug = 'glass-spider';
UPDATE products SET base_price = 320 WHERE slug = 'glass-clamp';

-- Aluminium sections (per kg)
UPDATE products SET base_price = 210 WHERE slug = 'alu-sliding';
UPDATE products SET base_price = 310 WHERE slug = 'alu-door';

-- Add product_grades for new products that use SS grades
-- Shower enclosures don't need SS grades, they use glass thickness
-- Toughened glass products don't need SS grades
-- SS Gates & Grills need grades
INSERT INTO public.product_grades (product_id, grade_id, price_multiplier)
SELECT p.id, g.id, 
  CASE g.name 
    WHEN '202' THEN 1.00 
    WHEN '304' THEN 1.40 
    WHEN '316' THEN 1.90 
  END
FROM products p, grades g 
WHERE p.slug IN ('ss-main-gate', 'ss-window-grill', 'ss-balcony-grill')
AND g.name IN ('202', '304', '316');
