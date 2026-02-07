import { Helmet } from 'react-helmet-async';
import { Users } from 'lucide-react';
import teamKishanlal from '@/assets/team-kishanlal.jpg';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import Breadcrumbs from '@/components/Breadcrumbs';

const About = () => {
  const achievements = [
    { number: '10+', label: 'Years Experience' },
    { number: '5000+', label: 'Satisfied Clients' },
    { number: '500+', label: 'Product Range' },
    { number: '2', label: 'Vadodara Outlets' },
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
        'S.S 304 Round Pipes – ½" to 12" OD, Polished / Matte / Brushed',
        'S.S 304 Square Pipes – 10×10 mm to 100×100 mm',
        'S.S 202 Round & Square Pipes – decorative & fabrication grade',
        'S.S 316 Round & Square Pipes – marine & industrial grade',
        'S.S 304 / 202 / 316 Patti (Flat Strips) – 12–150 mm widths',
        'S.S 304 / 202 / 316 Rods – 4–100 mm diameters',
      ],
    },
    {
      title: 'Aluminium Window & Supplier',
      items: [
        'Sliding Windows – powder-coated & anodized finishes',
        'Casement Windows – soundproof glass, max ventilation',
        'Fixed & Tilt-Turn Windows – Low-E & triple-glazed',
        'Aluminum Extrusions – L-angles, T-sections, U-channels',
        'Aluminum Sheets & Plates – 0.5 mm to 100 mm',
        'Aluminum Composite Panels (ACP) – cladding & signage',
      ],
    },
    {
      title: 'Railing Contractor',
      items: [
        'SS Railings – polished, matte, brushed, mirror finishes',
        'Glass Railings – frameless, tempered & laminated',
        'Aluminum Railings – lightweight, rust-proof',
        'Iron & Steel Railings – customizable intricate designs',
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
        'Structural Steel – buildings, bridges, warehouses',
        'Ornamental Steel – railings, gates, fences',
        'Custom Fabrication – machinery parts, platforms',
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
          <section className="relative bg-charcoal py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-mesh opacity-50" />
            <div className="absolute inset-0 grid-pattern" />
            <div className="container mx-auto px-4 relative z-10">
              <Breadcrumbs />
              <div className="max-w-3xl mt-4">
                <span className="badge-premium mb-6 inline-block">About Us</span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Steel Railing & Pipe{' '}
                  <span className="text-gradient-gold">Distributor</span>{' '}
                  in Vadodara
                </h1>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
                  <strong className="text-white/90">AARTI ENTERPRISE</strong> — Vadodara's trusted steel distributor, aluminium window supplier, railing contractor, iron & steel store, and steelwork design service provider since 2014.
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="relative -mt-16 z-20 pb-12">
            <div className="container mx-auto px-4">
              <div className="glass-dark rounded-2xl p-8 md:p-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 relative">
                  {achievements.map((item, index) => (
                    <div key={index} className="relative text-center py-4 px-2">
                      {index > 0 && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-white/15 to-transparent hidden lg:block" />
                      )}
                      {index >= 2 && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-16 bg-gradient-to-r from-transparent via-white/15 to-transparent lg:hidden" />
                      )}
                      <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-gold font-display">
                        {item.number}
                      </p>
                      <p className="text-xs sm:text-sm text-white/40 uppercase tracking-[0.15em] mt-2">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Story + Mission/Vision */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Our Story</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
                  A Decade of Trust & Quality
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-4 text-left md:text-center">
                  <p>
                    AARTI ENTERPRISE was founded with a vision to bring premium quality stainless steel products to Vadodara at fair prices. What started as a small trading business has grown into one of the most trusted names in the SS industry across Gujarat.
                  </p>
                  <p>
                    Led by <strong className="text-foreground">Kishanlal Bishnoi</strong> and <strong className="text-foreground">Kapil Bishnoi</strong>, we uphold the values of quality, integrity, and customer-first service — operating from two strategic locations including our main store at <strong className="text-foreground">Shop No. 7, Yamuna Mill Complex, Pratapnagar–Dabhoi Road, Vadodara</strong>.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="card-premium p-8 group">
                  <span className="text-primary/80 text-xs font-bold uppercase tracking-[0.2em]">Mission</span>
                  <h3 className="font-display text-xl font-bold text-white mt-3 mb-4">
                    One-Stop SS & Aluminium Solution
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm">
                    To provide premium quality stainless steel and aluminium products at competitive prices while ensuring excellent customer service across Gujarat.
                  </p>
                </div>
                <div className="card-premium p-8 group">
                  <span className="text-primary/80 text-xs font-bold uppercase tracking-[0.2em]">Vision</span>
                  <h3 className="font-display text-xl font-bold text-white mt-3 mb-4">
                    Gujarat's Leading Supplier
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm">
                    To become Gujarat's leading supplier of stainless steel and aluminium products, known for quality, reliability, and innovation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Services & Products */}
          <section className="py-20 bg-charcoal relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh opacity-30" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-14">
                <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">What We Offer</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-4">
                  Our Services & Products
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {serviceCategories.map((cat, index) => (
                  <div
                    key={index}
                    className="glass-dark rounded-2xl p-6 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <h3 className="font-display text-lg font-bold text-white">{cat.title}</h3>
                      {cat.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-2.5 py-1 rounded-full">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-2.5">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-white/50">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
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
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-14">
                <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Why Us</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
                  Why Choose AARTI ENTERPRISE?
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
                {[
                  { title: 'Premium Grades', desc: 'SS 202, 304, 316 — every grade for every need' },
                  { title: 'Largest Stock', desc: 'Biggest inventory of SS & aluminium in Vadodara' },
                  { title: 'Wholesale Pricing', desc: 'Competitive rates for builders, contractors & dealers' },
                  { title: 'Expert Guidance', desc: 'Technical advice from 10+ years of industry experience' },
                  { title: 'Fast Delivery', desc: '24hr delivery across Gujarat — Ahmedabad, Anand, Halol & more' },
                  { title: 'Installation', desc: 'Professional railing & steelwork installation services' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="card-elevated p-6 group"
                  >
                    <h3 className="font-display text-base font-bold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="py-20 bg-charcoal relative overflow-hidden">
            <div className="absolute inset-0 dot-pattern opacity-30" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-14">
                <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Service Areas</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-4">
                  Delivering Across Gujarat
                </h2>
                <p className="text-white/40 mt-4 max-w-xl mx-auto text-sm">
                  Fast delivery of stainless steel pipes, aluminium windows, railings, and steel products to every corner of Gujarat.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                {serviceAreas.map((area, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white/70 hover:border-primary/40 hover:text-primary transition-all duration-300"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-14">
                <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Leadership</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">Meet Our Team</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="card-elevated p-8 text-center">
                  <img
                    src={teamKishanlal}
                    alt="Kishanlal Bishnoi - Founder & Director of AARTI ENTERPRISE Vadodara"
                    className="w-28 h-28 rounded-full mx-auto mb-5 object-cover object-top border-2 border-primary/20"
                  />
                  <h3 className="font-display text-xl font-bold mb-1">Kishanlal Bishnoi</h3>
                  <p className="text-sm text-muted-foreground mb-4">Founder & Director</p>
                  <a href="tel:+919427055205" className="text-primary text-sm font-medium hover:underline">
                    +91 94270 55205
                  </a>
                </div>

                <div className="card-elevated p-8 text-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-gold mx-auto mb-5 flex items-center justify-center">
                    <Users className="w-12 h-12 text-charcoal" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-1">Kapil Bishnoi</h3>
                  <p className="text-sm text-muted-foreground mb-4">Director — Operations</p>
                  <a href="tel:+919825355205" className="text-primary text-sm font-medium hover:underline">
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
