import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Plus, Check } from 'lucide-react';
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
    <div className="group bg-card rounded-xl border border-border overflow-hidden card-hover">
      <Link to={`/products/${product.id}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.grades.map((grade) => (
              <Badge key={grade} variant="secondary" className="bg-charcoal/80 text-secondary text-xs">
                {grade}
              </Badge>
            ))}
          </div>

          {product.inStock && (
            <Badge className="absolute top-3 right-3 bg-green-500/90 text-white text-xs">
              In Stock
            </Badge>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <a
              href={`https://wa.me/919427055205?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-3 rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={handleQuickAdd}
              className={`p-3 rounded-full transition-all ${
                added 
                  ? 'bg-green-500 text-white' 
                  : 'bg-primary text-primary-foreground hover:scale-110'
              }`}
            >
              {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-lg font-bold text-primary">₹{price.toLocaleString('en-IN')}</p>
            </div>
            <Button size="sm" variant="outline" className="text-xs border-primary/30 hover:border-primary hover:bg-primary/10">
              View Details
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
