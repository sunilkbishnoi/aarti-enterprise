import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    const whatsappMessage = encodeURIComponent(
      `New Inquiry from Website:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
    );

    window.open(`https://wa.me/919427055205?text=${whatsappMessage}`, '_blank');

    toast({
      title: "Message Sent!",
      description: "We'll get back to you shortly.",
    });

    setFormData({ name: '', phone: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const locations = [
    {
      type: 'Office',
      address: '3rd Floor, 316, K.P. Land Mark, Near Bright School, Vasna Bhaili Road, Vadodara, Gujarat - 391410',
      phone: '+91 94270 55205',
      contact: 'Kishanlal Bishnoi',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.5!2d73.12!3d22.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE3JzI0LjAiTiA3M8KwMDcnMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    },
    {
      type: 'Shop',
      address: 'Shop No.7, Yamuna Mill Complex, Pratapnagar - Dabhoi Road, Vadodara, Gujarat - 390004',
      phone: '+91 99825 69415',
      contact: 'Kapil Bishnoi',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.5!2d73.15!3d22.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE2JzQ4LjAiTiA3M8KwMDknMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - AARTI ENTERPRISE Vadodara</title>
        <meta name="description" content="Contact AARTI ENTERPRISE for SS pipes, sheets, railings & aluminium products. Visit our office or shop in Vadodara. Call +91 94270 55205" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />

        <main>
          {/* Hero */}
          <section className="bg-charcoal py-12">
            <div className="container mx-auto px-4">
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
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email (Optional)</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Message *</label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                    {isSubmitting ? 'Sending...' : (
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
                        <a href="tel:+919982569415" className="block text-muted-foreground hover:text-primary transition-colors">
                          +91 99825 69415 (Kapil Bishnoi)
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
                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {location.phone} ({location.contact})
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
      </div>
    </>
  );
};

export default Contact;
