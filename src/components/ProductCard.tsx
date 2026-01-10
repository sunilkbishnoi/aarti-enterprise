import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Plus, Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useInquiry } from '@/context/InquiryContext';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  index?: number;
}

const ProductCard = ({ product, compact = false, index = 0 }: ProductCardProps) => {
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useInquiry();
  const { toast } = useToast();

  const defaultGrade = product.grades[0];
  const defaultSize = product.sizes[0];
  const defaultThickness = product.thicknesses[0];
  const price = Math.round(product.basePrice * (product.priceMultiplier[defaultGrade] || 1));

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      productId: product.id,
      productName: product.name,
      grade: defaultGrade,
      size: defaultSize,
      thickness: defaultThickness,
      quantity: 1,
      price,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);

    toast({
      title: "Added to Inquiry",
      description: `${product.name} added to your inquiry list.`,
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello AARTI ENTERPRISE,\n\nI'm interested in:\n${product.name}\nGrade: ${defaultGrade}\nSize: ${defaultSize}\n\nPlease provide quotation.`
  );

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect Behind Card */}
      <div 
        className={`absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-xl transition-all duration-700 ${
          isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
        }`}
      />
      
      <Link 
        to={`/products/${product.id}`}
        className="relative block bg-card rounded-2xl overflow-hidden border border-border/50 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {/* Main Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110 brightness-90' : 'scale-100 brightness-100'
            }`}
          />
          
          {/* Premium Overlay */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            isHovered 
              ? 'bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent' 
              : 'bg-gradient-to-t from-charcoal/30 via-transparent to-transparent'
          }`} />

          {/* Shine Effect */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 ${
              isHovered ? 'translate-x-full' : ''
            }`}
          />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <div className="flex flex-wrap gap-1.5">
              {product.grades.slice(0, 2).map((grade) => (
                <span 
                  key={grade} 
                  className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-charcoal/80 backdrop-blur-md text-white rounded-md border border-white/10"
                >
                  {grade}
                </span>
              ))}
            </div>
            {product.inStock && (
              <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-emerald-500/90 backdrop-blur-md text-white rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                In Stock
              </span>
            )}
          </div>

          {/* View Details Arrow - Appears on Hover */}
          <div className={`absolute top-3 right-3 transition-all duration-300 ${
            isHovered && !product.inStock ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}>
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors duration-300">
              <ArrowUpRight className="w-5 h-5 text-charcoal group-hover:text-primary-foreground transition-colors" />
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/919427055205?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Inquiry</span>
              </a>
              <button
                onClick={handleQuickAdd}
                className={`p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 ${
                  added 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white/95 text-charcoal hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={`relative ${compact ? 'p-4' : 'p-5'}`}>
          {/* Subtle top border accent */}
          <div className={`absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-border to-transparent transition-all duration-500 ${
            isHovered ? 'via-primary/50' : 'via-border'
          }`} />
          
          {/* Product Name */}
          <h3 className={`font-semibold text-foreground line-clamp-2 leading-snug transition-colors duration-300 ${
            compact ? 'text-sm mb-2' : 'text-base mb-3'
          } ${isHovered ? 'text-primary' : ''}`}>
            {product.name}
          </h3>
          
          {/* Description (non-compact) */}
          {!compact && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {product.description}
            </p>
          )}
          
          {/* Price Section */}
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mb-0.5">Starting from</p>
              <p className={`font-bold ${compact ? 'text-lg' : 'text-xl'}`}>
                <span className="text-gradient-gold">₹{price.toLocaleString('en-IN')}</span>
              </p>
            </div>
            
            {/* Quick View Hint */}
            {!compact && (
              <div className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-300 ${
                isHovered ? 'text-primary translate-x-0 opacity-100' : 'text-muted-foreground -translate-x-2 opacity-0'
              }`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>View Details</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
