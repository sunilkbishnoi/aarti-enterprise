import { Shield, IndianRupee, Package, Truck, Award, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Quality Products',
    description: 'Premium grade SS 202, 304, 316 materials with mill test certificates',
  },
  {
    icon: IndianRupee,
    title: 'Best Price in Gujarat',
    description: 'Competitive wholesale prices with transparent pricing - no hidden costs',
  },
  {
    icon: Package,
    title: 'Ready Stock',
    description: 'Largest inventory in Vadodara - immediate dispatch for urgent orders',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery in Vadodara, 2-3 days across Gujarat',
  },
  {
    icon: Award,
    title: '10+ Years Experience',
    description: 'Trusted family business serving Gujarat since over a decade',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Skilled installation team for railings, glass fittings & more',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-charcoal text-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary font-medium mb-3">WHY CHOOSE US</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AARTI ENTERPRISE has been serving Vadodara and Gujarat with premium stainless steel 
            and aluminium products. Here's why customers choose us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-charcoal-light/50 border border-charcoal-light hover:border-primary/50 transition-all duration-300 group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
