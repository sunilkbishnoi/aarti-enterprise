-- Add booking_id column with auto-generated human-readable ID
ALTER TABLE public.bookings ADD COLUMN booking_id TEXT;

-- Create function to generate booking ID
CREATE OR REPLACE FUNCTION public.generate_booking_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.booking_id := 'AE-' || TO_CHAR(NOW(), 'YYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger to auto-generate booking_id
CREATE TRIGGER generate_booking_id_trigger
BEFORE INSERT ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.generate_booking_id();

-- Update existing bookings with a booking_id
UPDATE public.bookings 
SET booking_id = 'AE-' || TO_CHAR(created_at, 'YYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0')
WHERE booking_id IS NULL;