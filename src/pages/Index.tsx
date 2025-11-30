import { Helmet } from 'react-helmet-async';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryCards from '@/components/CategoryCards';
import FeaturedProducts from '@/components/FeaturedProducts';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import LocationCards from '@/components/LocationCards';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>AARTI ENTERPRISE - Premium Stainless Steel & Aluminium Products in Vadodara</title>
        <meta name="description" content="Vadodara's trusted supplier of SS pipes, sheets, designer panels, glass railings & aluminium sections. Best wholesale prices in Gujarat. Call +91 94270 55205" />
        <meta name="keywords" content="stainless steel Vadodara, SS pipes Gujarat, designer sheets, glass railing, aluminium sections, SS 304, SS 316" />
        <link rel="canonical" href="https://aartienterprise.in" />
        
        <meta property="og:title" content="AARTI ENTERPRISE - Premium SS & Aluminium Products" />
        <meta property="og:description" content="Vadodara's trusted supplier of stainless steel and aluminium products. Best wholesale prices in Gujarat." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aartienterprise.in" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "AARTI ENTERPRISE",
            "description": "Premium stainless steel and aluminium products supplier in Vadodara, Gujarat",
            "telephone": ["+91-94270-55205", "+91-99825-69415"],
            "email": "aartienterprise05@gmail.com",
            "address": [
              {
                "@type": "PostalAddress",
                "streetAddress": "316, K.P. Land Mark, 3rd Floor, Near Bright School, Vasna Bhaili Road",
                "addressLocality": "Vadodara",
                "addressRegion": "Gujarat",
                "postalCode": "391410",
                "addressCountry": "IN"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "Shop No.7, Yamuna Mill Complex, Pratapnagar - Dabhoi Road",
                "addressLocality": "Vadodara",
                "addressRegion": "Gujarat",
                "postalCode": "390004",
                "addressCountry": "IN"
              }
            ],
            "openingHours": "Mo-Sa 09:00-19:00",
            "priceRange": "$$"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <TopBar />
        <Header />
        <main>
          <HeroSection />
          <CategoryCards />
          <FeaturedProducts />
          <WhyChooseUs />
          <Testimonials />
          <LocationCards />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
