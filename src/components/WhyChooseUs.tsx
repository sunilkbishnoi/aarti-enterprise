import { Shield, IndianRupee, Package, Truck, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Shield,
    title: 'Certified Quality',
    description: 'Premium grade SS 202, 304, 316 materials with mill test certificates & quality assurance',
    highlight: 'ISO Certified',
  },
  {
    icon: IndianRupee,
    title: 'Best Market Price',
    description: 'Competitive wholesale rates with transparent pricing. No hidden costs, guaranteed best deal',
    highlight: 'Price Match',
  },
  {
    icon: Package,
    title: 'Massive Inventory',
    description: 'Largest stock in Vadodara region - over 500+ products ready for immediate dispatch',
    highlight: '500+ Products',
  },
  {
    icon: Truck,
    title: 'Express Delivery',
    description: 'Same-day delivery in Vadodara, 24-48 hours across Gujarat with real-time tracking',
    highlight: 'Same Day',
  },
  {
    icon: Award,
    title: 'Industry Experience',
    description: 'Over a decade of trusted service to builders, architects & industrial clients',
    highlight: '10+ Years',
  },
  {
    icon: Users,
    title: 'Expert Installation',
    description: 'Skilled technical team for railings, glass fittings & custom fabrication work',
    highlight: 'Full Service',
  },
];

const benefits = [
  'Free Technical Consultation',
  'Custom Fabrication Services',
  'Bulk Order Discounts',
  'After-Sales Support',
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding section-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          <div>
            <span className="badge-modern mb-4">Why Choose Us</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Trusted by <span className="text-gradient-gold">5000+ Clients</span> Across Gujarat
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              AARTI ENTERPRISE has been the preferred choice for builders, architects, and industrial 
              clients seeking premium stainless steel and aluminium products with uncompromising quality.
            </p>
          </div>
          
          <div className="glass-dark rounded-2xl p-8">
            <h3 className="font-display text-xl font-semibold text-white mb-6">What You Get</h3>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="mt-8 block">
              <Button className="w-full btn-modern h-12 gap-2 group">
                Get Free Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group card-premium p-8 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Highlight Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                  {feature.highlight}
                </span>
              </div>
              
              {/* Icon */}
              <div className="icon-modern mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              
              {/* Content */}
              <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-gold group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-white/50 mb-6">Ready to start your project?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919427055205">
              <Button size="lg" className="btn-modern h-14 px-8 gap-3">
                Call Now: +91 94270 55205
              </Button>
            </a>
            <Link to="/products">
              <Button size="lg" variant="outline" className="h-14 px-8 border-2 border-primary/30 text-primary hover:bg-primary hover:text-charcoal gap-2">
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;