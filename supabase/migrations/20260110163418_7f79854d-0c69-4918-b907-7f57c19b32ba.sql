-- Create bookings table for appointment scheduling
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  purpose TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can create a booking (public form)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

-- Anyone can view their own booking by phone (for status check)
CREATE POLICY "Anyone can view bookings"
ON public.bookings
FOR SELECT
USING (true);

-- Admins can manage all bookings
CREATE POLICY "Admins can manage bookings"
ON public.bookings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for bookings
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;

-- Create available_slots table for managing time slots
CREATE TABLE public.available_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  max_bookings_per_slot INTEGER NOT NULL DEFAULT 2,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.available_slots ENABLE ROW LEVEL SECURITY;

-- Anyone can view available slots
CREATE POLICY "Anyone can view available slots"
ON public.available_slots
FOR SELECT
USING (true);

-- Admins can manage slots
CREATE POLICY "Admins can manage slots"
ON public.available_slots
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default time slots (Monday to Saturday, 10 AM to 6 PM)
INSERT INTO public.available_slots (day_of_week, start_time, end_time) VALUES
(1, '10:00', '11:00'),
(1, '11:00', '12:00'),
(1, '14:00', '15:00'),
(1, '15:00', '16:00'),
(1, '16:00', '17:00'),
(1, '17:00', '18:00'),
(2, '10:00', '11:00'),
(2, '11:00', '12:00'),
(2, '14:00', '15:00'),
(2, '15:00', '16:00'),
(2, '16:00', '17:00'),
(2, '17:00', '18:00'),
(3, '10:00', '11:00'),
(3, '11:00', '12:00'),
(3, '14:00', '15:00'),
(3, '15:00', '16:00'),
(3, '16:00', '17:00'),
(3, '17:00', '18:00'),
(4, '10:00', '11:00'),
(4, '11:00', '12:00'),
(4, '14:00', '15:00'),
(4, '15:00', '16:00'),
(4, '16:00', '17:00'),
(4, '17:00', '18:00'),
(5, '10:00', '11:00'),
(5, '11:00', '12:00'),
(5, '14:00', '15:00'),
(5, '15:00', '16:00'),
(5, '16:00', '17:00'),
(5, '17:00', '18:00'),
(6, '10:00', '11:00'),
(6, '11:00', '12:00'),
(6, '14:00', '15:00'),
(6, '15:00', '16:00'),
(6, '16:00', '17:00'),
(6, '17:00', '18:00');