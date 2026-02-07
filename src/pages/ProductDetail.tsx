import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MessageCircle, Plus, Minus, ShoppingBag, Check, Loader2 } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductImageGallery from '@/components/ProductImageGallery';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInquiry } from '@/context/InquiryContext';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/hooks/useProducts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, isLoading, error } = useProducts();
  const product = getProductById(id || '');
  const { addItem } = useInquiry();
  const { toast } = useToast();

  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Set defaults once product loads
  if (product && !selectedGrade && product.grades.length > 0) {
    setSelectedGrade(product.grades[0]);
  }
  if (product && !selectedSize && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }
  if (product && !selectedThickness && product.thicknesses.length > 0) {
    setSelectedThickness(product.thicknesses[0]);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Link to="/products">
              <Button className="btn-modern">Back to Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const price = Math.round(product.basePrice * (product.priceMultiplier[selectedGrade] || 1));
  const totalPrice = price * quantity;

  const handleAddToInquiry = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      grade: selectedGrade,
      size: selectedSize,
      thickness: selectedThickness,
      quantity,
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
    `Hello AARTI ENTERPRISE,\n\nI'm interested in:\n*${product.name}*\nGrade: ${selectedGrade}\nSize: ${selectedSize}\nThickness: ${selectedThickness}\nQuantity: ${quantity} pcs\n\nPlease provide the best quotation.\n\nThank you!`
  );

  return (
    <>
      <Helmet>
        <title>{product.name} - AARTI ENTERPRISE Vadodara</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />

        <main className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[
            { label: 'Home', path: '/' },
            { label: 'Products', path: '/products' },
            { label: product.name }
          ]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
            {/* Product Image Gallery */}
            <div className="space-y-4">
              <ProductImageGallery images={product.images} productName={product.name} />
              
              <div className="flex flex-wrap gap-2">
                {product.grades.map((grade) => (
                  <Badge key={grade} variant="outline" className="border-primary/30">
                    Grade {grade}
                  </Badge>
                ))}
                {product.inStock && (
                  <Badge className="bg-green-500/90">In Stock</Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Configuration */}
              <div className="space-y-6 mb-8">
                {/* Grade Selection */}
                {product.grades.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select Grade
                    </label>
                    <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.grades.map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            SS {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select Size
                    </label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Thickness Selection */}
                {product.thicknesses.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select Thickness
                    </label>
                    <Select value={selectedThickness} onValueChange={setSelectedThickness}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select thickness" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.thicknesses.map((thickness) => (
                          <SelectItem key={thickness} value={thickness}>
                            {thickness}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Quantity (pcs)
                  </label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-muted/50 rounded-xl p-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Price per piece</span>
                  <span className="text-lg font-medium">₹{price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-4">
                  <span className="font-medium">Total (approx.)</span>
                  <span className="text-2xl font-bold text-primary">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * Final price may vary based on quantity and current market rates
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={handleAddToInquiry}
                  className={`flex-1 gap-2 h-12 text-base ${added ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'}`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Inquiry
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      Add to Inquiry
                    </>
                  )}
                </Button>
                
                <a
                  href={`https://wa.me/919427055205?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button size="lg" variant="outline" className="w-full gap-2 h-12 text-base border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Inquiry
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </>
  );
};

export default ProductDetail;
