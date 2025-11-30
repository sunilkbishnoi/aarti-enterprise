import { Link } from 'react-router-dom';
import { ArrowRight, Cylinder, Square, Sparkles, Fence, GlassWater, LayoutGrid } from 'lucide-react';

const categories = [
  {
    id: 'ss-pipes',
    name: 'SS Pipes',
    description: 'Round, Square, Rectangle & Oval pipes in all grades',
    icon: Cylinder,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
    color: 'from-steel/20 to-steel-dark/30',
  },
  {
    id: 'ss-sheets',
    name: 'SS Sheets & Plates',
    description: 'Plain, Mirror & Hairline finish sheets',
    icon: Square,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    color: 'from-charcoal-light/20 to-charcoal/30',
  },
  {
    id: 'designer-sheets',
    name: 'Designer Sheets',
    description: 'Gold, Rose Gold, Black PVD coated sheets',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
    color: 'from-gold/20 to-rosegold/30',
  },
  {
    id: 'ss-railing',
    name: 'SS Railing',
    description: 'Balusters, Handrails & Accessories',
    icon: Fence,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    color: 'from-steel-dark/20 to-charcoal/30',
  },
  {
    id: 'glass-railing',
    name: 'Glass Railing',
    description: 'Spider fittings, Clamps & U-Channels',
    icon: GlassWater,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    color: 'from-blue-500/10 to-steel/20',
  },
  {
    id: 'aluminium',
    name: 'Aluminium Sections',
    description: 'Windows, Doors & Partitions',
    icon: LayoutGrid,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80',
    color: 'from-muted/50 to-steel/30',
  },
];

const CategoryCards = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary font-medium mb-3">OUR PRODUCTS</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of premium stainless steel and aluminium products. 
            All available in various grades, sizes, and finishes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-xl bg-card border border-border card-hover animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} to-charcoal/90`} />
              </div>

              {/* Content */}
              <div className="relative p-6 h-64 flex flex-col justify-end">
                <div className="absolute top-6 left-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    View Products
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
