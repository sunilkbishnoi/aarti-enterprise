import { Helmet } from 'react-helmet-async';
import { CheckCircle, Users, Award, MapPin, Target, Eye } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const About = () => {
  const achievements = [
    { number: '10+', label: 'Years of Experience' },
    { number: '5000+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '2', label: 'Locations in Vadodara' },
  ];

  const values = [
    'Premium quality stainless steel (202, 304, 316 grades)',
    'Largest stock inventory in Vadodara',
    'Competitive wholesale pricing',
    'Expert technical guidance',
    'Fast delivery across Gujarat',
    'Professional installation services',
  ];

  return (
    <>
      <Helmet>
        <title>About Us - AARTI ENTERPRISE | 10+ Years in SS Business</title>
        <meta name="description" content="AARTI ENTERPRISE - Vadodara's trusted family business for premium stainless steel and aluminium products since 10+ years." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />

        <main>
          {/* Hero */}
          <section className="bg-charcoal py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <p className="text-primary font-medium mb-4">ABOUT US</p>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-6">
                  Vadodara's Trusted SS & Aluminium Partner
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  AARTI ENTERPRISE has been serving Gujarat with premium stainless steel and aluminium 
                  products for over a decade. Our commitment to quality, competitive pricing, and 
                  customer satisfaction has made us a preferred choice for architects, builders, 
                  interior designers, and homeowners.
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {achievements.map((item, index) => (
                  <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                      {item.number}
                    </p>
                    <p className="text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card rounded-xl border border-border p-8 animate-fade-up">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide premium quality stainless steel and aluminium products at competitive 
                    prices while ensuring excellent customer service. We aim to be the one-stop 
                    solution for all SS and aluminium requirements in Gujarat.
                  </p>
                </div>

                <div className="bg-card rounded-xl border border-border p-8 animate-fade-up animation-delay-200">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To become Gujarat's leading supplier of stainless steel and aluminium products, 
                    known for quality, reliability, and innovation. We envision expanding our reach 
                    while maintaining the personalized service that defines us.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl font-bold text-center mb-8">Our Story</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="leading-relaxed mb-6">
                    AARTI ENTERPRISE was founded with a vision to bring premium quality stainless 
                    steel products to Vadodara at fair prices. What started as a small trading 
                    business has grown into one of the most trusted names in the SS industry in Gujarat.
                  </p>
                  <p className="leading-relaxed mb-6">
                    Our founders, the Bishnoi family, brought decades of industry experience and a 
                    deep understanding of customer needs. Today, led by Kishanlal Bishnoi and 
                    Harish Bishnoi, we continue to uphold the values of quality, integrity, and 
                    customer-first service.
                  </p>
                  <p className="leading-relaxed">
                    With two strategically located outlets in Vadodara and an extensive product 
                    range covering SS pipes, sheets, designer panels, railings, glass fittings, 
                    and aluminium sections, we serve customers across Gujarat and beyond.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16 bg-charcoal text-secondary">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-center mb-12">Why Choose AARTI ENTERPRISE?</h2>
              <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start gap-3 animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-center mb-12">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="bg-card rounded-xl border border-border p-6 text-center animate-fade-up">
                  <div className="w-24 h-24 rounded-full bg-gradient-gold mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-1">Kishanlal Bishnoi</h3>
                  <p className="text-muted-foreground mb-4">Founder & Director</p>
                  <a href="tel:+919427055205" className="text-primary hover:underline">
                    +91 94270 55205
                  </a>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 text-center animate-fade-up animation-delay-200">
                  <div className="w-24 h-24 rounded-full bg-gradient-gold mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-1">Harish Bishnoi</h3>
                  <p className="text-muted-foreground mb-4">Director - Operations</p>
                  <a href="tel:+919982569415" className="text-primary hover:underline">
                    +91 99825 69415
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default About;
