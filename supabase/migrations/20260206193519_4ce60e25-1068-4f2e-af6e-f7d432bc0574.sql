
-- Add SELECT policy for bookings: only admins can view
CREATE POLICY "Admins can view bookings"
ON public.bookings
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add SELECT policy for contact_inquiries: only admins can view
CREATE POLICY "Admins can view contact inquiries"
ON public.contact_inquiries
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));
