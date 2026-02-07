import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroRailing from '@/assets/hero-railing.jpg';
import heroWarehouse from '@/assets/hero-warehouse.jpg';
import heroDesigner from '@/assets/hero-designer.jpg';
const slides = [{
  title: "Premium Stainless Steel Solutions",
  subtitle: "Gujarat's Most Trusted Industrial Supplier",
  description: "High-grade SS pipes, sheets, designer panels & custom railing systems for commercial & residential projects",
  cta: "Explore Products",
  image: heroRailing
}, {
  title: "Massive Stock Inventory",
  subtitle: "SS 202, 304, 316 – All Grades Available",
  description: "Ready stock for immediate dispatch. Bulk orders fulfilled within 24 hours across Gujarat",
  cta: "View Inventory",
  image: heroWarehouse
}, {
  title: "Designer SS Sheets",
  subtitle: "Gold, Rose Gold & Black Mirror PVD Finishes",
  description: "Transform your commercial spaces with premium PVD coated luxury sheets",
  cta: "View Collection",
  image: heroDesigner
}];
const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "5000+", label: "Satisfied Clients" },
  { value: "500+", label: "Product Range" },
  { value: "24hr", label: "Fast Delivery" },
];
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  return <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => <div key={index} className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/70 z-10" />
          <div className="absolute inset-0 bg-mesh z-10 opacity-50" />
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
        </div>)}

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft z-10" />
      <div className="absolute bottom-40 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-soft animation-delay-300 z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 sm:gap-4 px-4 sm:px-6 sm:py-3 rounded-full border border-primary/30 bg-gradient-to-r from-primary/20 via-charcoal/80 to-primary/20 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-500 group my-[30px] py-[16px]">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-pulse flex-shrink-0"></div>
              <span className="text-sm sm:text-xl md:text-2xl font-display font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase text-white group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
                AARTI ENTERPRISE
              </span>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-pulse flex-shrink-0"></div>
            </div>
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
            <a href="https://wa.me/919427055205?text=Hello%20AARTI%20ENTERPRISE%2C%20I%20need%20a%20quotation." target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-14 px-8 border-2 border-white/30 text-white bg-white/5 backdrop-blur-sm hover:bg-primary hover:text-charcoal hover:border-primary gap-3 text-base transition-all duration-300">
                <MessageCircle className="w-5 h-5" />
                Get Instant Quote
              </Button>
            </a>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 lg:mt-24 animate-fade-up animation-delay-500">
          <div className="grid grid-cols-2 lg:grid-cols-4 relative">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative text-center py-6 px-4 lg:px-6"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                {/* Divider between items */}
                {index > 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />
                )}
                {/* Top divider for mobile second row */}
                {index >= 2 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent lg:hidden" />
                )}
                <p className="text-4xl lg:text-5xl font-display font-bold text-gradient-gold tracking-tight leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-white/50 font-medium uppercase tracking-[0.15em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation - minimal dots only, positioned above stats */}
      <div className="absolute bottom-[200px] lg:bottom-[160px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'w-8 h-2 bg-gradient-gold'
                : 'w-2 h-2 bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>;
};
export default HeroSection;