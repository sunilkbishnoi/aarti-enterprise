import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Sparkles, Crown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { useProducts } from '@/hooks/useProducts';

const FeaturedProducts = () => {
  const { products, isLoading } = useProducts();
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute inset-0 bg-mesh opacity-40" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 mb-6 animate-fade-up">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wider uppercase">Best Sellers</span>
            <Crown className="w-4 h-4 text-primary" />
          </div>
          
          {/* Main Title */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
            Our <span className="text-gradient-gold">Premium</span> Collection
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up animation-delay-200">
            Discover our most popular stainless steel products, trusted by architects and builders across Gujarat.
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12 mb-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-up" 
                style={{ animationDelay: `${150 + index * 75}ms` }}
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-16">
            <p className="text-muted-foreground">No featured products available.</p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-up animation-delay-500">
          <Link to="/products">
            <Button 
              variant="outline" 
              className="group h-14 px-8 text-base font-semibold rounded-2xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-gold"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          
          <Link to="/contact">
            <Button className="group h-14 px-8 text-base font-semibold rounded-2xl bg-gradient-to-r from-charcoal to-charcoal-light hover:from-charcoal-light hover:to-charcoal text-white transition-all duration-300 hover:shadow-xl">
              <Sparkles className="w-5 h-5 mr-2 text-primary" />
              <span>Request Custom Quote</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
