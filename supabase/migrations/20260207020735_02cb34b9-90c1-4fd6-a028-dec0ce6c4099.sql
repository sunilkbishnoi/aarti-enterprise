
-- Drop all existing RESTRICTIVE policies and recreate as PERMISSIVE

-- PRODUCTS
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;

CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- CATEGORIES
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
DROP POLICY IF EXISTS "Anyone can view categories" ON public.categories;

CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- GRADES
DROP POLICY IF EXISTS "Admins can manage grades" ON public.grades;
DROP POLICY IF EXISTS "Anyone can view grades" ON public.grades;

CREATE POLICY "Anyone can view grades" ON public.grades FOR SELECT USING (true);
CREATE POLICY "Admins can manage grades" ON public.grades FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- PRODUCT_GRADES
DROP POLICY IF EXISTS "Admins can manage product_grades" ON public.product_grades;
DROP POLICY IF EXISTS "Anyone can view product_grades" ON public.product_grades;

CREATE POLICY "Anyone can view product_grades" ON public.product_grades FOR SELECT USING (true);
CREATE POLICY "Admins can manage product_grades" ON public.product_grades FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- GALLERY_ITEMS
DROP POLICY IF EXISTS "Admins can manage gallery items" ON public.gallery_items;
DROP POLICY IF EXISTS "Anyone can view active gallery items" ON public.gallery_items;

CREATE POLICY "Anyone can view active gallery items" ON public.gallery_items FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage gallery items" ON public.gallery_items FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- AVAILABLE_SLOTS
DROP POLICY IF EXISTS "Admins can manage slots" ON public.available_slots;
DROP POLICY IF EXISTS "Anyone can view available slots" ON public.available_slots;

CREATE POLICY "Anyone can view available slots" ON public.available_slots FOR SELECT USING (true);
CREATE POLICY "Admins can manage slots" ON public.available_slots FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- BOOKINGS
DROP POLICY IF EXISTS "Admins can manage bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can create bookings with valid data" ON public.bookings;

CREATE POLICY "Admins can view bookings" ON public.bookings FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage bookings" ON public.bookings FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can create bookings with valid data" ON public.bookings FOR INSERT WITH CHECK (
  customer_name IS NOT NULL AND length(customer_name) >= 2 AND length(customer_name) <= 100
  AND customer_phone IS NOT NULL AND length(customer_phone) >= 10 AND length(customer_phone) <= 15
  AND purpose IS NOT NULL AND length(purpose) <= 200
  AND booking_date IS NOT NULL AND booking_time IS NOT NULL
);

-- CONTACT_INQUIRIES
DROP POLICY IF EXISTS "Admins can manage contact inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Admins can view contact inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Anyone can submit contact inquiries with valid data" ON public.contact_inquiries;

CREATE POLICY "Admins can view contact inquiries" ON public.contact_inquiries FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage contact inquiries" ON public.contact_inquiries FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can submit contact inquiries with valid data" ON public.contact_inquiries FOR INSERT WITH CHECK (
  name IS NOT NULL AND length(name) >= 2 AND length(name) <= 100
  AND phone IS NOT NULL AND length(phone) >= 10 AND length(phone) <= 15
  AND message IS NOT NULL AND length(message) >= 10 AND length(message) <= 2000
);

-- USER_ROLES
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
