import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight, Sparkles, TrendingUp, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroRailing from '@/assets/hero-railing.jpg';
import heroWarehouse from '@/assets/hero-warehouse.jpg';
import heroDesigner from '@/assets/hero-designer.jpg';

const slides = [
  {
    title: "Premium Stainless Steel Solutions",
    subtitle: "Gujarat's Most Trusted Industrial Supplier",
    description: "High-grade SS pipes, sheets, designer panels & custom railing systems for commercial & residential projects",
    cta: "Explore Products",
    image: heroRailing,
  },
  {
    title: "Massive Stock Inventory",
    subtitle: "SS 202, 304, 316 – All Grades Available",
    description: "Ready stock for immediate dispatch. Bulk orders fulfilled within 24 hours across Gujarat",
    cta: "View Inventory",
    image: heroWarehouse,
  },
  {
    title: "Designer SS Sheets",
    subtitle: "Gold, Rose Gold & Black Mirror PVD Finishes",
    description: "Transform your commercial spaces with premium PVD coated luxury sheets",
    cta: "View Collection",
    image: heroDesigner,
  },
];

const stats = [
  { value: "10+", label: "Years Experience", icon: TrendingUp },
  { value: "5000+", label: "Satisfied Clients", icon: ShieldCheck },
  { value: "500+", label: "Product Range", icon: Sparkles },
  { value: "24hr", label: "Fast Delivery", icon: Truck },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/70 z-10" />
          <div className="absolute inset-0 bg-mesh z-10 opacity-50" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft z-10" />
      <div className="absolute bottom-40 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-soft animation-delay-300 z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="overflow-hidden mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase whitespace-nowrap animate-fade-up tracking-[0.15em] text-transparent bg-clip-text bg-[length:200%_auto] animate-shine bg-gradient-to-r from-primary via-gold-light via-50% to-primary drop-shadow-[0_0_40px_rgba(212,175,55,0.5)]">
              AARTI ENTERPRISE
            </h2>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] animate-fade-up animation-delay-100">
            {slides[currentSlide].title}
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gradient-gold font-display font-semibold mb-4 animate-fade-up animation-delay-200">
            {slides[currentSlide].subtitle}
          </p>
          
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed animate-fade-up animation-delay-300">
            {slides[currentSlide].description}
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-400">
            <Link to="/products">
              <Button size="lg" className="btn-modern h-14 px-8 text-base gap-3 group">
                {slides[currentSlide].cta}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a
              href="https://wa.me/919427055205?text=Hello%20AARTI%20ENTERPRISE%2C%20I%20need%20a%20quotation."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="h-14 px-8 border-2 border-white/30 text-white bg-white/5 backdrop-blur-sm hover:bg-primary hover:text-charcoal hover:border-primary gap-3 text-base transition-all duration-300">
                <MessageCircle className="w-5 h-5" />
                Get Instant Quote
              </Button>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 lg:mt-24 animate-fade-up animation-delay-500">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="counter-card group"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-3xl lg:text-4xl font-display font-bold text-gradient-gold">{stat.value}</p>
              </div>
              <p className="text-sm text-white/60 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full glass-dark text-white hover:bg-primary hover:text-charcoal transition-all duration-300 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'w-10 bg-gradient-gold' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          className="p-3 rounded-full glass-dark text-white hover:bg-primary hover:text-charcoal transition-all duration-300 group"
        >
          <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs font-medium tracking-widest uppercase rotate-90 origin-center translate-y-8">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent mt-12"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;