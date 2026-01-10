import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
    image: categorySsPipes,
    count: '120+',
  },
  {
    id: 'ss-sheets',
    name: 'SS Sheets & Plates',
    description: 'Plain, Mirror & Hairline finish sheets',
    image: categorySsSheets,
    count: '80+',
  },
  {
    id: 'designer-sheets',
    name: 'Designer Sheets',
    description: 'Gold, Rose Gold, Black PVD coated sheets',
    image: categoryDesignerSheets,
    count: '60+',
  },
  {
    id: 'ss-railing',
    name: 'SS Railing',
    description: 'Balusters, Handrails & Accessories',
    image: categorySsRailing,
    count: '100+',
  },
  {
    id: 'glass-railing',
    name: 'Glass Railing',
    description: 'Spider fittings, Clamps & U-Channels',
    image: categoryGlassRailing,
    count: '75+',
  },
  {
    id: 'aluminium',
    name: 'Aluminium Sections',
    description: 'Windows, Doors & Partitions',
    image: categoryAluminium,
    count: '90+',
  },
];

const CategoryCards = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Product Categories
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Explore our extensive collection of high-grade stainless steel and aluminium products.
            </p>
          </div>
          <Link 
            to="/products" 
            className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid - Clean Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] animate-fade-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Clean Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Subtle Gradient Overlay - Only at bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              {/* Product Count Badge - Top Right */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-bold text-white bg-primary/90 backdrop-blur-sm rounded-full shadow-lg">
                  {category.count} Products
                </span>
              </div>

              {/* Content - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1.5 group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-white/70 text-sm mb-3 line-clamp-1">
                  {category.description}
                </p>
                <div className="flex items-center gap-1.5 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/60 transition-colors duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;