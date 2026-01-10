import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Loader2, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Validation schema
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z.string()
    .trim()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^[+]?[\d\s-]+$/, 'Please enter a valid phone number'),
  email: z.string()
    .trim()
    .email('Please enter a valid email')
    .max(255, 'Email must be less than 255 characters')
    .optional()
    .or(z.literal('')),
  message: z.string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as keyof ContactFormData] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize inputs
      const sanitizedData = {
        name: formData.name.trim().slice(0, 100),
        phone: formData.phone.replace(/[^\d+\s-]/g, '').slice(0, 15),
        email: formData.email?.trim().slice(0, 255) || null,
        message: formData.message.trim().slice(0, 2000),
      };

      // Store inquiry in database
      const { error } = await supabase.from('contact_inquiries').insert({
        name: sanitizedData.name,
        phone: sanitizedData.phone,
        email: sanitizedData.email,
        message: sanitizedData.message,
      });

      if (error) throw error;

      // Open WhatsApp with the message (properly encoded)
      const whatsappMessage = encodeURIComponent(
        `New Inquiry from Website:\n\nName: ${sanitizedData.name}\nPhone: ${sanitizedData.phone}\nEmail: ${sanitizedData.email || 'Not provided'}\n\nMessage: ${sanitizedData.message}`
      );

      window.open(`https://wa.me/919427055205?text=${whatsappMessage}`, '_blank');

      toast({
        title: "Message Sent!",
        description: "Your inquiry has been saved. We'll get back to you shortly.",
      });

      setFormData({ name: '', phone: '', email: '', message: '' });
      setErrors({});
    } catch (err: any) {
      console.error('Error submitting inquiry:', err);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const locations = [
    {
      type: 'Office',
      address: '3rd Floor, 316, K.P. Land Mark, Near Bright School, Vasna Bhaili Road, Vadodara, Gujarat - 391410',
      phone: '+91 94270 55205',
      contact: 'Kishanlal Bishnoi',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d73.13277077821304!3d22.29067417452709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE3JzI2LjQiTiA3M8KwMDcnNTguMCJF!5e0!3m2!1sen!2sin!4v1234567890',
      directionsUrl: 'https://maps.app.goo.gl/ZTFu6y63RL9ujm6z6',
    },
    {
      type: 'Shop',
      address: 'Shop No.7, Yamuna Mill Complex, Pratapnagar - Dabhoi Road, Vadodara, Gujarat - 390004',
      phone: '+91 98253 55205',
      contact: 'Kapil Bishnoi',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d73.21792258468683!3d22.281926183008654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE2JzU1LjAiTiA3M8KwMTMnMDQuNSJF!5e0!3m2!1sen!2sin!4v1234567890',
      directionsUrl: 'https://maps.app.goo.gl/8fR9rexnputjvrVB8',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - AARTI ENTERPRISE Vadodara | SS & Aluminium Products</title>
        <meta name="description" content="Contact AARTI ENTERPRISE for SS pipes, sheets, railings & aluminium products. Visit our office or shop in Vadodara. Call +91 94270 55205" />
        <link rel="canonical" href="https://aartienterprise.com/contact" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact AARTI ENTERPRISE",
            "description": "Contact us for SS and aluminium product inquiries",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "AARTI ENTERPRISE",
              "telephone": ["+91-94270-55205", "+91-98253-55205"],
              "email": "aartienterprise05@gmail.com"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />

        <main>
          {/* Hero */}
          <section className="bg-charcoal py-12">
            <div className="container mx-auto px-4">
              <Breadcrumbs />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
                Contact Us
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Get in touch with us for product inquiries, quotations, or any questions. 
                We're here to help you find the perfect SS & aluminium solutions.
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-fade-up">
                <h2 className="font-display text-2xl font-bold mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="Enter your name"
                      className={errors.name ? 'border-destructive' : ''}
                      maxLength={100}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="+91 XXXXX XXXXX"
                      className={errors.phone ? 'border-destructive' : ''}
                      maxLength={15}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email (Optional)</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="your@email.com"
                      className={errors.email ? 'border-destructive' : ''}
                      maxLength={255}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Message *</label>
                    <Textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Tell us about your requirements... (min 10 characters)"
                      className={errors.message ? 'border-destructive' : ''}
                      maxLength={2000}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.message ? (
                        <p className="text-destructive text-sm flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formData.message.length}/2000
                      </span>
                    </div>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-8 p-6 bg-muted/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-4">Prefer to chat directly?</p>
                  <a
                    href="https://wa.me/919427055205?text=Hello%20AARTI%20ENTERPRISE%2C%20I%20have%20an%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white">
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-8 animate-fade-up animation-delay-200">
                <div>
                  <h2 className="font-display text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-2">Phone Numbers</p>
                        <a href="tel:+919427055205" className="block text-muted-foreground hover:text-primary transition-colors">
                          +91 94270 55205 (Kishanlal Bishnoi)
                        </a>
                        <a href="tel:+919825355205" className="block text-muted-foreground hover:text-primary transition-colors">
                          +91 98253 55205 (Kapil Bishnoi)
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-2">Email</p>
                        <a href="mailto:aartienterprise05@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                          aartienterprise05@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-2">Business Hours</p>
                        <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                        <p className="text-muted-foreground">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>GSTIN:</strong> 24AEHPV3369L1ZW
                  </p>
                </div>
              </div>
            </div>

            {/* Location Cards */}
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold mb-8 text-center">Our Locations</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl border border-border overflow-hidden animate-fade-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="aspect-video w-full">
                      <iframe
                        src={location.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${location.type} Location`}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h3 className="font-display text-xl font-bold">{location.type}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {location.address}
                      </p>
                      <a 
                        href={`tel:${location.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-4"
                      >
                        <Phone className="w-4 h-4" />
                        {location.phone} ({location.contact})
                      </a>
                      <a 
                        href={location.directionsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                          <MapPin className="w-4 h-4" />
                          Get Directions
                        </Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </>
  );
};

export default Contact;