import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { getFeaturedProducts } from '@/data/products';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-14">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="badge-modern flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" />
                Best Sellers
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Popular <span className="text-gradient-gold">Products</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Most ordered products by our clients. High-quality materials with competitive pricing.
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 h-12 rounded-xl group">
              View All Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-up" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Looking for something specific?</p>
          <Link to="/contact">
            <Button className="btn-modern h-12 px-8 gap-2 group">
              Request Custom Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;