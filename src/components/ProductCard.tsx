import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Plus, Check, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useInquiry } from '@/context/InquiryContext';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [added, setAdded] = useState(false);
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
    <div className="group card-modern rounded-2xl overflow-hidden">
      <Link to={`/products/${product.id}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.grades.slice(0, 2).map((grade) => (
              <Badge 
                key={grade} 
                className="bg-charcoal/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider border-0"
              >
                {grade}
              </Badge>
            ))}
          </div>

          {product.inStock && (
            <Badge className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold border-0">
              In Stock
            </Badge>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <a
              href={`https://wa.me/919427055205?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-medium hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <button
              onClick={handleQuickAdd}
              className={`p-2.5 rounded-xl transition-all ${
                added 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-primary text-primary-foreground hover:scale-105'
              }`}
            >
              {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
            {product.description}
          </p>
          
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Starting from</p>
              <p className="text-xl font-bold text-gradient-gold">₹{price.toLocaleString('en-IN')}</p>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs h-9 border-border hover:border-primary hover:bg-primary/5 gap-1.5 rounded-lg"
            >
              <Eye className="w-3.5 h-3.5" />
              Details
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;