import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroRailing from '@/assets/hero-railing.jpg';
import heroWarehouse from '@/assets/hero-warehouse.jpg';
import heroDesigner from '@/assets/hero-designer.jpg';

const slides = [
  {
    title: "Premium Stainless Steel Solutions",
    subtitle: "Vadodara's Most Trusted SS & Aluminium Supplier",
    description: "Quality pipes, sheets, designer panels & railing systems",
    cta: "View Products",
    image: heroRailing,
  },
  {
    title: "Largest Stock Inventory",
    subtitle: "SS 202, 304, 316 – All Grades Available",
    description: "Ready stock for immediate dispatch across Gujarat",
    cta: "Explore Products",
    image: heroWarehouse,
  },
  {
    title: "Designer SS Sheets",
    subtitle: "Gold, Rose Gold & Black Mirror Finishes",
    description: "Transform your interiors with PVD coated luxury sheets",
    cta: "View Collection",
    image: heroDesigner,
  },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "5000+", label: "Happy Clients" },
  { value: "500+", label: "Products" },
  { value: "24/7", label: "Support" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/60 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <div className="overflow-hidden">
            <p className="text-primary font-medium mb-4 animate-fade-up">
              AARTI ENTERPRISE
            </p>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight animate-fade-up animation-delay-100">
            {slides[currentSlide].title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gold-light font-display mb-4 animate-fade-up animation-delay-200">
            {slides[currentSlide].subtitle}
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 animate-fade-up animation-delay-300">
            {slides[currentSlide].description}
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-400">
            <Link to="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-base">
                {slides[currentSlide].cta}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a
              href="https://wa.me/919427055205?text=Hello%20AARTI%20ENTERPRISE%2C%20I%20need%20a%20quotation."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-charcoal gap-2 text-base">
                <MessageCircle className="w-5 h-5" />
                Get Quote on WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="hidden lg:grid grid-cols-4 gap-6 mt-16 animate-fade-up animation-delay-500">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-charcoal/50 backdrop-blur-sm rounded-lg border border-charcoal-light">
              <p className="text-3xl font-display font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-charcoal/50 backdrop-blur-sm text-secondary hover:bg-primary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-charcoal/50 backdrop-blur-sm text-secondary hover:bg-primary transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
