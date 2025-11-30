import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MessageCircle, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInquiry } from '@/context/InquiryContext';
import { useToast } from '@/hooks/use-toast';
import { getProductById } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addItem } = useInquiry();
  const { toast } = useToast();

  const [selectedGrade, setSelectedGrade] = useState(product?.grades[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedThickness, setSelectedThickness] = useState(product?.thicknesses[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
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
          {/* Breadcrumb */}
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl bg-muted overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
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
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select Grade
                  </label>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger>
                      <SelectValue />
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

                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select Size
                  </label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue />
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

                {/* Thickness Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select Thickness
                  </label>
                  <Select value={selectedThickness} onValueChange={setSelectedThickness}>
                    <SelectTrigger>
                      <SelectValue />
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
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={handleAddToInquiry}
                  className={`flex-1 gap-2 ${added ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'}`}
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
                  <Button size="lg" variant="outline" className="w-full gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white">
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
      </div>
    </>
  );
};

export default ProductDetail;
