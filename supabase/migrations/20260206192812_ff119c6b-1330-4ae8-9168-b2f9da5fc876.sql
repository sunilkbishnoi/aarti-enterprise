
-- Fix: Remove the overly permissive public SELECT policy on bookings
DROP POLICY IF EXISTS "Anyone can view bookings" ON public.bookings;

-- Add a restricted policy that only allows reading non-PII columns for slot availability
-- We use a security definer function to return only needed data
CREATE OR REPLACE FUNCTION public.get_booking_counts(start_date date)
RETURNS TABLE(booking_date date, booking_time text, booking_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT b.booking_date, b.booking_time, COUNT(*) as booking_count
  FROM public.bookings b
  WHERE b.booking_date >= start_date
    AND b.status IN ('pending', 'confirmed')
  GROUP BY b.booking_date, b.booking_time;
$$;
