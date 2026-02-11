import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle2, Loader2, CalendarCheck, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';

// Validation schema
const bookingSchema = z.object({
  customer_name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  customer_phone: z.string()
    .trim()
    .min(10, 'Phone must be at least 10 digits')
    .max(15, 'Phone must be less than 15 digits')
    .regex(/^[+]?[\d\s-]+$/, 'Please enter a valid phone number'),
  customer_email: z.string()
    .trim()
    .email('Please enter a valid email')
    .max(255, 'Email must be less than 255 characters')
    .optional()
    .or(z.literal('')),
  purpose: z.string()
    .min(1, 'Please select a purpose')
    .max(200, 'Purpose must be less than 200 characters'),
  message: z.string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface TimeSlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  max_bookings_per_slot: number;
}

interface Booking {
  id: string;
  booking_date: string;
  booking_time: string;
  status: string;
}

const purposes = [
  'Product Inquiry & Demo',
  'Bulk Order Discussion',
  'Site Visit / Measurement',
  'Custom Fabrication Consultation',
  'Price Quotation',
  'Other'
];

const Booking = () => {
  const { toast } = useToast();
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    purpose: '',
    message: ''
  });

  // Generate next 14 days
  const dateOptions = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1));

  useEffect(() => {
    fetchSlots();
    fetchBookings();
    
    // Real-time subscription for bookings
    const channel = supabase
      .channel('booking-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        fetchBookings();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchSlots = async () => {
    const { data, error } = await supabase
      .from('available_slots')
      .select('*')
      .eq('is_active', true)
      .order('day_of_week')
      .order('start_time');
    
    if (!error && data) {
      setAvailableSlots(data);
    }
    setIsLoading(false);
  };

  const fetchBookings = async () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const { data, error } = await supabase
      .rpc('get_booking_counts', { start_date: today });
    
    if (!error && data) {
      // Convert aggregated counts to individual booking entries for slot availability
      const bookingEntries: Array<{ id: string; booking_date: string; booking_time: string; status: string }> = [];
      (data as Array<{ booking_date: string; booking_time: string; booking_count: number }>).forEach((row) => {
        for (let i = 0; i < row.booking_count; i++) {
          bookingEntries.push({
            id: `${row.booking_date}-${row.booking_time}-${i}`,
            booking_date: row.booking_date,
            booking_time: row.booking_time,
            status: 'confirmed',
          });
        }
      });
      setExistingBookings(bookingEntries);
    }
  };

  const getSlotsForDate = (date: Date) => {
    const dayOfWeek = date.getDay();
    const slotsForDay = availableSlots.filter(s => s.day_of_week === dayOfWeek);
    
    // Count bookings for each slot
    const dateStr = format(date, 'yyyy-MM-dd');
    return slotsForDay.map(slot => {
      const bookingsForSlot = existingBookings.filter(
        b => b.booking_date === dateStr && b.booking_time === slot.start_time
      ).length;
      
      return {
        ...slot,
        available: bookingsForSlot < slot.max_bookings_per_slot,
        remaining: slot.max_bookings_per_slot - bookingsForSlot
      };
    });
  };

  const isDateAvailable = (date: Date) => {
    const slots = getSlotsForDate(date);
    return slots.some(s => s.available);
  };

  const validateForm = (): boolean => {
    try {
      bookingSchema.parse(form);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof BookingFormData, string>> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as keyof BookingFormData] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time slot.",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Sanitize inputs
    const sanitizedData = {
      customer_name: form.customer_name.trim().slice(0, 100),
      customer_phone: form.customer_phone.replace(/[^\d+\s-]/g, '').slice(0, 15),
      customer_email: form.customer_email?.trim().slice(0, 255) || null,
      booking_date: format(selectedDate, 'yyyy-MM-dd'),
      booking_time: selectedTime,
      purpose: form.purpose.slice(0, 200),
      message: form.message?.trim().slice(0, 1000) || null
    };

    const { data, error } = await supabase.from('bookings').insert(sanitizedData).select('booking_id').single();

    if (error) {
      setIsSubmitting(false);
      toast({
        title: "Booking Failed",
        description: "Please check your information and try again.",
        variant: "destructive"
      });
      return;
    }

    // Send email notification
    try {
      if (data?.booking_id) {
        const emailPayload = {
          booking_id: data.booking_id,
          customer_name: sanitizedData.customer_name,
          customer_phone: sanitizedData.customer_phone,
          customer_email: sanitizedData.customer_email ?? undefined,
          booking_date: format(selectedDate, 'EEEE, MMMM d, yyyy'),
          booking_time: selectedTime,
          purpose: sanitizedData.purpose,
          message: sanitizedData.message ?? undefined,
        };

        const { error: fnError } = await supabase.functions.invoke('send-booking-email', {
          body: emailPayload,
        });

        if (fnError) throw fnError;
        console.log('Booking email sent successfully');
      } else {
        console.warn('Booking created but booking_id missing; skipping email send');
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the booking if email fails
    }

    setIsSubmitting(false);
    setBookingId(data?.booking_id || null);
    setIsSuccess(true);
    toast({
      title: "Booking Confirmed!",
      description: `Booking ID: ${data?.booking_id}. We'll contact you shortly.`,
    });
  };

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Booking Confirmed | AARTI ENTERPRISE</title>
        </Helmet>
        <TopBar />
        <Header />
        <main className="min-h-screen bg-background py-12">
          <div className="container mx-auto px-4">
            <Card className="max-w-lg mx-auto bg-card border-border text-center shadow-xl">
              <CardContent className="py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-3">Booking Confirmed!</h2>
                
                {/* Booking ID Display */}
                {bookingId && (
                  <div className="bg-secondary rounded-lg px-4 py-2 mb-4 inline-block">
                    <p className="text-xs text-muted-foreground">Booking ID</p>
                    <p className="text-lg font-mono font-bold text-primary">{bookingId}</p>
                  </div>
                )}
                
                <p className="text-muted-foreground mb-6">
                  Thank you, {form.customer_name}! Your appointment has been scheduled for:
                </p>
                <div className="bg-primary/10 rounded-xl p-4 mb-4 border border-primary/20">
                  <p className="text-lg font-semibold text-primary">
                    {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </p>
                  <p className="text-muted-foreground">at {selectedTime}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 mb-6 text-left space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium text-foreground">{form.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium text-foreground">{form.customer_phone}</span>
                  </div>
                  {form.customer_email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium text-foreground">{form.customer_email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Purpose:</span>
                    <span className="font-medium text-foreground">{form.purpose}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  We'll contact you at <span className="text-foreground font-medium">{form.customer_phone}</span> to confirm.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => { setIsSuccess(false); setBookingId(null); setSelectedDate(null); setSelectedTime(''); setForm({ customer_name: '', customer_phone: '', customer_email: '', purpose: '', message: '' }); }}
                  >
                    Book Another
                  </Button>
                  <Button onClick={() => window.location.href = '/'} className="btn-modern">
                    Go to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book an Appointment | AARTI ENTERPRISE - SS & Aluminium Products</title>
        <meta name="description" content="Schedule a consultation with AARTI ENTERPRISE for stainless steel and aluminium products. Visit our showroom in Vadodara, Gujarat." />
      </Helmet>
      
      <TopBar />
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-background">
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-2xl mx-auto">
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Free Consultation
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                Book an Appointment
              </h1>
              <p className="text-lg text-muted-foreground">
                Schedule a visit to our showroom or request a consultation for your stainless steel & aluminium needs.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-12 -mt-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Left - Info */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Visit Our Shop
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      Shop No.7, Yamuna Mill Complex, Pratapnagar - Dabhoi Road, Vadodara - 390004
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Mon - Sat: 10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>+91 94270 55205</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
                  <CardContent className="py-6">
                    <CalendarCheck className="w-10 h-10 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Why Book Online?</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        Guaranteed time slot
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        Personalized attention
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        Expert consultation
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        Priority service
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Right - Form */}
              <Card className="lg:col-span-2 bg-card border-border shadow-xl">
                <CardHeader>
                  <CardTitle className="text-foreground">Schedule Your Visit</CardTitle>
                  <CardDescription>Select a date and time that works for you</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Date Selection */}
                      <div className="space-y-3">
                        <Label className="text-foreground flex items-center gap-2 text-base font-semibold">
                          <Calendar className="w-4 h-4 text-primary" />
                          Select Date *
                        </Label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
                          {dateOptions.map((date) => {
                            const available = isDateAvailable(date);
                            const isSelected = selectedDate && isSameDay(date, selectedDate);
                            
                            return (
                              <button
                                key={date.toISOString()}
                                type="button"
                                disabled={!available}
                                onClick={() => { setSelectedDate(date); setSelectedTime(''); }}
                                className={`p-3 rounded-xl text-center transition-all border ${
                                  isSelected
                                    ? 'bg-primary text-primary-foreground shadow-lg scale-105 border-primary'
                                    : available
                                    ? 'bg-secondary hover:bg-secondary/80 text-foreground border-border hover:border-primary/50'
                                    : 'bg-muted text-muted-foreground/50 cursor-not-allowed border-transparent'
                                }`}
                              >
                                <p className="text-xs font-medium">{format(date, 'EEE')}</p>
                                <p className="text-lg font-bold">{format(date, 'd')}</p>
                                <p className="text-xs opacity-70">{format(date, 'MMM')}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Selection */}
                      {selectedDate && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                          <Label className="text-foreground flex items-center gap-2 text-base font-semibold">
                            <Clock className="w-4 h-4 text-primary" />
                            Select Time *
                          </Label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {getSlotsForDate(selectedDate).map((slot) => (
                              <button
                                key={slot.id}
                                type="button"
                                disabled={!slot.available}
                                onClick={() => setSelectedTime(slot.start_time)}
                                className={`p-3 rounded-xl text-center transition-all border ${
                                  selectedTime === slot.start_time
                                    ? 'bg-primary text-primary-foreground shadow-lg border-primary'
                                    : slot.available
                                    ? 'bg-secondary hover:bg-secondary/80 text-foreground border-border hover:border-primary/50'
                                    : 'bg-muted text-muted-foreground/50 cursor-not-allowed line-through border-transparent'
                                }`}
                              >
                                <p className="font-medium">{slot.start_time} - {slot.end_time}</p>
                                {slot.available && (
                                  <p className="text-xs opacity-70">{slot.remaining} slot{slot.remaining > 1 ? 's' : ''} left</p>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Purpose Selection */}
                      <div className="space-y-3">
                        <Label className="text-foreground text-base font-semibold">Purpose of Visit *</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {purposes.map((purpose) => (
                            <button
                              key={purpose}
                              type="button"
                              onClick={() => {
                                setForm({ ...form, purpose });
                                if (errors.purpose) setErrors({ ...errors, purpose: undefined });
                              }}
                              className={`p-3 rounded-xl text-sm text-center transition-all border ${
                                form.purpose === purpose
                                  ? 'bg-primary text-primary-foreground shadow-lg border-primary'
                                  : 'bg-secondary hover:bg-secondary/80 text-foreground border-border hover:border-primary/50'
                              }`}
                            >
                              {purpose}
                            </button>
                          ))}
                        </div>
                        {errors.purpose && (
                          <p className="text-destructive text-sm flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.purpose}
                          </p>
                        )}
                      </div>

                      {/* Contact Details */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-foreground flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Your Name *
                          </Label>
                          <Input
                            value={form.customer_name}
                            onChange={(e) => {
                              setForm({ ...form, customer_name: e.target.value });
                              if (errors.customer_name) setErrors({ ...errors, customer_name: undefined });
                            }}
                            placeholder="Enter your full name"
                            className={`bg-background border-input ${errors.customer_name ? 'border-destructive' : ''}`}
                            maxLength={100}
                          />
                          {errors.customer_name && (
                            <p className="text-destructive text-sm flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.customer_name}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-foreground flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            Phone Number *
                          </Label>
                          <Input
                            type="tel"
                            value={form.customer_phone}
                            onChange={(e) => {
                              setForm({ ...form, customer_phone: e.target.value });
                              if (errors.customer_phone) setErrors({ ...errors, customer_phone: undefined });
                            }}
                            placeholder="+91 98765 43210"
                            className={`bg-background border-input ${errors.customer_phone ? 'border-destructive' : ''}`}
                            maxLength={15}
                          />
                          {errors.customer_phone && (
                            <p className="text-destructive text-sm flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.customer_phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-foreground flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          Email (Optional)
                        </Label>
                        <Input
                          type="email"
                          value={form.customer_email}
                          onChange={(e) => {
                            setForm({ ...form, customer_email: e.target.value });
                            if (errors.customer_email) setErrors({ ...errors, customer_email: undefined });
                          }}
                          placeholder="your@email.com"
                          className={`bg-background border-input ${errors.customer_email ? 'border-destructive' : ''}`}
                          maxLength={255}
                        />
                        {errors.customer_email && (
                          <p className="text-destructive text-sm flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.customer_email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-foreground flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-primary" />
                          Additional Message
                        </Label>
                        <Textarea
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us more about what you're looking for..."
                          className="bg-background border-input"
                          rows={3}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full btn-modern h-12 text-base"
                        disabled={isSubmitting || !selectedDate || !selectedTime || !form.customer_name || !form.customer_phone || !form.purpose}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Booking...
                          </>
                        ) : (
                          <>
                            <CalendarCheck className="w-5 h-5 mr-2" />
                            Confirm Booking
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Booking;
