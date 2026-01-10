-- Fix overly permissive INSERT policies with rate limiting constraints

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can submit contact inquiries" ON public.contact_inquiries;

-- Create more secure INSERT policies with basic validation
-- For bookings: require valid data format
CREATE POLICY "Anyone can create bookings with valid data" 
ON public.bookings 
FOR INSERT 
WITH CHECK (
  customer_name IS NOT NULL AND 
  length(customer_name) >= 2 AND 
  length(customer_name) <= 100 AND
  customer_phone IS NOT NULL AND 
  length(customer_phone) >= 10 AND 
  length(customer_phone) <= 15 AND
  purpose IS NOT NULL AND
  length(purpose) <= 200 AND
  booking_date IS NOT NULL AND
  booking_time IS NOT NULL
);

-- For contact inquiries: require valid data format
CREATE POLICY "Anyone can submit contact inquiries with valid data" 
ON public.contact_inquiries 
FOR INSERT 
WITH CHECK (
  name IS NOT NULL AND 
  length(name) >= 2 AND 
  length(name) <= 100 AND
  phone IS NOT NULL AND 
  length(phone) >= 10 AND 
  length(phone) <= 15 AND
  message IS NOT NULL AND
  length(message) >= 10 AND
  length(message) <= 2000
);