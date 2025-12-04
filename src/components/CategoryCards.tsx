import { Link } from 'react-router-dom';
import { ArrowRight, Cylinder, Square, Sparkles, Fence, GlassWater, LayoutGrid } from 'lucide-react';
import categorySsPipes from '@/assets/category-ss-pipes.jpg';
import categorySsSheets from '@/assets/category-ss-sheets.jpg';
import categoryDesignerSheets from '@/assets/category-designer-sheets.jpg';
import categorySsRailing from '@/assets/category-ss-railing.jpg';
import categoryGlassRailing from '@/assets/category-glass-railing.jpg';
import categoryAluminium from '@/assets/category-aluminium.jpg';

const categories = [
  {
    id: 'ss-pipes',
    name: 'SS Pipes',
    description: 'Round, Square, Rectangle & Oval pipes in all grades',
    icon: Cylinder,
    image: categorySsPipes,
    count: '120+ Products',
  },
  {
    id: 'ss-sheets',
    name: 'SS Sheets & Plates',
    description: 'Plain, Mirror & Hairline finish sheets',
    icon: Square,
    image: categorySsSheets,
    count: '80+ Products',
  },
  {
    id: 'designer-sheets',
    name: 'Designer Sheets',
    description: 'Gold, Rose Gold, Black PVD coated sheets',
    icon: Sparkles,
    image: categoryDesignerSheets,
    count: '60+ Products',
  },
  {
    id: 'ss-railing',
    name: 'SS Railing',
    description: 'Balusters, Handrails & Accessories',
    icon: Fence,
    image: categorySsRailing,
    count: '100+ Products',
  },
  {
    id: 'glass-railing',
    name: 'Glass Railing',
    description: 'Spider fittings, Clamps & U-Channels',
    icon: GlassWater,
    image: categoryGlassRailing,
    count: '75+ Products',
  },
  {
    id: 'aluminium',
    name: 'Aluminium Sections',
    description: 'Windows, Doors & Partitions',
    icon: LayoutGrid,
    image: categoryAluminium,
    count: '90+ Products',
  },
];

const CategoryCards = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="badge-modern mb-4">Product Categories</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Browse Our <span className="text-gradient-gold">Premium Range</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explore our extensive collection of high-grade stainless steel and aluminium products. 
              Available in various grades, sizes, and custom finishes.
            </p>
          </div>
          <Link 
            to="/products" 
            className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl bg-card animate-fade-up card-modern"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6 h-72 flex flex-col justify-between">
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <category.icon className="w-7 h-7 text-white group-hover:text-charcoal transition-colors" />
                  </div>
                  <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    {category.count}
                  </span>
                </div>

                {/* Bottom Section */}
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                    <span>Explore Category</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;