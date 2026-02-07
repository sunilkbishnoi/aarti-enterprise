import { Helmet } from 'react-helmet-async';
import { CheckCircle, Users, Target, Eye, MapPin, Wrench } from 'lucide-react';
import teamKishanlal from '@/assets/team-kishanlal.jpg';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import Breadcrumbs from '@/components/Breadcrumbs';

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

  const serviceAreas = [
    'Vadodara', 'Ahmedabad', 'Anand', 'Halol', 'Dabhoi', 'Padra',
    'Waghodia', 'Pratapnagar', 'Akota', 'Alkapuri', 'Fatehgunj',
    'Makarpura', 'Karelibagh', 'Soma Talav', 'Chhani',
  ];

  const serviceCategories = [
    {
      title: 'Steel Distributor',
      badge: 'Primary',
      items: [
        'S.S 304 Round Pipes – ½" to 12" OD, Polished / Matte / Brushed finishes',
        'S.S 304 Square Pipes – 10×10 mm to 100×100 mm',
        'S.S 202 Round & Square Pipes – budget-friendly decorative & fabrication grade',
        'S.S 316 Round & Square Pipes – marine & industrial grade, corrosion-resistant',
        'S.S 304 / 202 / 316 Patti (Flat Strips) – 12 mm to 150 mm widths',
        'S.S 304 / 202 / 316 Rods – 4 mm to 100 mm diameters',
      ],
    },
    {
      title: 'Aluminium Window & Supplier',
      items: [
        'Sliding Windows – smooth glide, space-saving, powder-coated & anodized',
        'Casement Windows – hinged opening, maximum ventilation, soundproof glass',
        'Fixed Windows – stationary glass, unobstructed views, Low-E glass',
        'Tilt and Turn Windows – dual function, triple-glazed, UV-resistant coating',
        'Awning Windows – top-hinged, rainproof ventilation, tempered glass',
        'Aluminum Extrusions – L-angles, T-sections, U-channels, Z-profiles',
        'Aluminum Sheets & Plates – 0.5 mm to 100 mm thickness',
        'Aluminum Composite Panels (ACP) – weather-resistant cladding & signage',
      ],
    },
    {
      title: 'Railing Contractor',
      items: [
        'Stainless Steel Railings – polished, matte, brushed, mirror finishes',
        'Glass Railings – frameless & supported, tempered & laminated options',
        'Aluminum Railings – lightweight, rust-proof, powder-coated',
        'Iron & Steel Railings – strong, customizable intricate designs',
      ],
    },
    {
      title: 'Iron & Steel Store',
      items: [
        'Mild Steel (MS) sheets, plates, rods & pipes',
        'Alloy Steel, Carbon Steel & Tool Steel',
      ],
    },
    {
      title: 'Steelwork Design Service',
      items: [
        'Structural Steel Design – buildings, bridges, warehouses',
        'Ornamental Steel Design – decorative railings, gates, fences',
        'Custom Fabrication – tailored components, machinery parts, platforms',
        'Architectural Steelwork – facades, canopies, skylights',
      ],
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About AARTI ENTERPRISE",
    "description": "AARTI ENTERPRISE – Steel Railing & Steel Pipe Distributor in Vadodara, Gujarat. Aluminium window supplier, railing contractor, iron & steel store, and steelwork design service.",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "AARTI ENTERPRISE",
      "alternateName": ["Aarti Enterprise Vadodara", "Aarti Steel", "Arti Enterprise Vadodara"],
      "description": "Steel distributor, aluminium supplier, railing contractor, iron & steel store, and steelwork design service in Vadodara, Gujarat",
      "foundingDate": "2014",
      "numberOfEmployees": "10-20",
      "telephone": ["+91-94270-55205", "+91-98253-55205"],
      "email": "aartienterprise05@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No. 7, Yamuna Mill Complex, Pratapnagar - Dabhoi Road",
        "addressLocality": "Vadodara",
        "addressRegion": "Gujarat",
        "postalCode": "390004",
        "addressCountry": "IN"
      },
      "areaServed": [
        { "@type": "State", "name": "Gujarat, India" },
        { "@type": "City", "name": "Vadodara, Gujarat" },
        { "@type": "City", "name": "Ahmedabad, Gujarat" },
        { "@type": "City", "name": "Anand, Gujarat" },
        { "@type": "City", "name": "Halol, Gujarat" },
        { "@type": "City", "name": "Dabhoi, Gujarat" },
        { "@type": "City", "name": "Padra, Gujarat" },
        { "@type": "City", "name": "Waghodia, Gujarat" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Steel & Aluminium Products",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Steel Distributor" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Aluminium Window Supplier" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Railing Contractor" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Iron & Steel Store" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Steelwork Design Service" } },
        ]
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>About AARTI ENTERPRISE | Steel Railing & Pipe Distributor Vadodara</title>
        <meta name="description" content="AARTI ENTERPRISE – Vadodara's trusted steel distributor, aluminium window supplier, railing contractor & steelwork design service. SS 304, 202, 316 pipes, sheets, rods. Serving Gujarat – Ahmedabad, Anand, Halol, Dabhoi, Padra & more." />
        <meta name="keywords" content="aarti enterprise vadodara, aarti steel, steel distributor vadodara, aluminium window vadodara, aluminium supplier vadodara, railing contractor vadodara, iron steel store vadodara, steelwork design service, SS 304 round pipes, SS 202 square pipes, SS 316 pipes, aluminium patti, railing design, steel fabricator vadodara, glass railing, stainless steel railing, aluminium company vadodara, custom fabrication vadodara" />
        <link rel="canonical" href="https://aartienterprise.com/about" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />

        <main>
          {/* Hero */}
          <section className="bg-charcoal py-20">
            <div className="container mx-auto px-4">
              <Breadcrumbs />
              <div className="max-w-3xl">
                <p className="text-primary font-medium mb-4">ABOUT US</p>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-6">
                  Steel Railing & Steel Pipe Distributor in Vadodara
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong>AARTI ENTERPRISE</strong> is Vadodara's trusted <strong>steel distributor</strong>, <strong>aluminium window supplier</strong>, <strong>railing contractor</strong>, <strong>iron &amp; steel store</strong>, and <strong>steelwork design service</strong> provider. 
                  With 10+ years of experience serving Gujarat, we supply premium stainless steel pipes, sheets, rods, designer panels, glass railings, aluminium sections, and custom fabrication solutions to architects, builders, interior designers, and homeowners across <strong>Ahmedabad, Anand, Halol, Dabhoi, Padra, Waghodia</strong>, and all of Gujarat.
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
                    Kapil Bishnoi, we continue to uphold the values of quality, integrity, and 
                    customer-first service.
                  </p>
                  <p className="leading-relaxed">
                    With two strategically located outlets in Vadodara — including our main store at 
                    <strong> Shop No. 7, Yamuna Mill Complex, Pratapnagar–Dabhoi Road</strong> — and an extensive product 
                    range covering SS pipes, sheets, designer panels, railings, glass fittings, 
                    aluminium sections, and custom steel fabrication, we serve customers across Gujarat and beyond.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Services & Products */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <p className="text-primary font-medium mb-2">WHAT WE OFFER</p>
                <h2 className="font-display text-3xl font-bold">Our Services & Products</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceCategories.map((cat, index) => (
                  <div key={index} className="bg-card rounded-xl border border-border p-6 animate-fade-up" style={{ animationDelay: `${index * 80}ms` }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Wrench className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold">{cat.title}</h3>
                        {cat.badge && (
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {cat.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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

          {/* Service Areas */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <p className="text-primary font-medium mb-2">SERVICE AREAS</p>
                <h2 className="font-display text-3xl font-bold">We Deliver Across Gujarat</h2>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                  AARTI ENTERPRISE proudly serves customers across Gujarat with fast delivery of stainless steel pipes, aluminium windows, railings, and steel products.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                {serviceAreas.map((area, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-4 py-2 text-sm text-foreground animate-fade-up"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-center mb-12">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="bg-card rounded-xl border border-border p-6 text-center animate-fade-up">
                  <img 
                    src={teamKishanlal} 
                    alt="Kishanlal Bishnoi - Founder & Director of AARTI ENTERPRISE Vadodara" 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover object-top border-2 border-primary/20"
                  />
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
                  <h3 className="font-display text-xl font-bold mb-1">Kapil Bishnoi</h3>
                  <p className="text-muted-foreground mb-4">Director - Operations</p>
                  <a href="tel:+919825355205" className="text-primary hover:underline">
                    +91 98253 55205
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </>
  );
};

export default About;
