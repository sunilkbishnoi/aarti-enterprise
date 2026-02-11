import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MessageCircle, Plus, Minus, ShoppingBag, Check, Loader2, Ruler, Shield, Paintbrush, Layers, Wrench, Target } from 'lucide-react';
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
import { getProductSpecs } from '@/data/productSpecs';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, isLoading, error } = useProducts();
  const product = getProductById(id || '');
  const { addItem } = useInquiry();
  const { toast } = useToast();

  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const specs = product ? getProductSpecs(product.slug || '') : null;

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
  if (specs && !selectedFinish && specs.finishes.length > 0) {
    setSelectedFinish(specs.finishes[0].name);
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

  // Get variant-specific price if specs available
  const variantPrice = specs?.variants.find(v => {
    const sizeKey = selectedSize?.replace('mm ', '').trim();
    return v.dimensions.includes(sizeKey) || v.name.toLowerCase().includes(sizeKey.toLowerCase());
  })?.price;

  const price = variantPrice || Math.round(product.basePrice * (product.priceMultiplier[selectedGrade] || 1));
  const gradeMultipliedPrice = specs 
    ? Math.round(price * (selectedGrade === '316' ? 1.3 : 1))
    : price;
  const totalPrice = gradeMultipliedPrice * quantity;

  const handleAddToInquiry = () => {
    const finishText = selectedFinish ? ` | Finish: ${selectedFinish}` : '';
    addItem({
      productId: product.id,
      productName: product.name,
      grade: selectedGrade,
      size: selectedSize,
      thickness: selectedThickness + finishText,
      quantity,
      price: gradeMultipliedPrice,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);

    toast({
      title: "Added to Inquiry",
      description: `${product.name} added to your inquiry list.`,
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello AARTI ENTERPRISE,\n\nI'm interested in:\n*${product.name}*\nGrade: ${selectedGrade}\nSize: ${selectedSize}\nGlass Thickness: ${selectedThickness}${selectedFinish ? `\nFinish: ${selectedFinish}` : ''}\nQuantity: ${quantity} pcs\n\nPlease provide the best quotation.\n\nThank you!`
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
                      {specs ? 'Select Clamp Size' : 'Select Size'}
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
                      {specs ? 'Glass Thickness' : 'Select Thickness'}
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

                {/* Finish Selection (for products with specs) */}
                {specs && specs.finishes.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select Finish
                    </label>
                    <Select value={selectedFinish} onValueChange={setSelectedFinish}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select finish" />
                      </SelectTrigger>
                      <SelectContent>
                        {specs.finishes.map((finish) => (
                          <SelectItem key={finish.name} value={finish.name}>
                            {finish.name}
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
                  <span className="text-lg font-medium">₹{gradeMultipliedPrice.toLocaleString('en-IN')}</span>
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
                <div className="flex-1">
                  <Button
                    size="lg"
                    onClick={handleAddToInquiry}
                    variant="outline"
                    className={`w-full gap-2 h-12 text-base ${added ? 'border-green-500 bg-green-500 text-white hover:bg-green-600' : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'}`}
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
                </div>
                
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
          {/* Detailed Product Specifications */}
          {(() => {
            const specs = getProductSpecs(product.slug || '');
            if (!specs) return null;
            const isGlassProduct = specs.glassThickness.length > 0;
            return (
              <div className="mt-16 space-y-10">
                {/* Variants Table */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
                    <Ruler className="w-6 h-6 text-primary" />
                    {isGlassProduct ? 'Standard Clamp Sizes & Shapes' : 'Available Sizes & Specifications'}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">Available models with indicative pricing</p>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/60">
                          <th className="text-left px-4 py-3 font-semibold text-foreground">Model</th>
                          <th className="text-left px-4 py-3 font-semibold text-foreground">Dimensions</th>
                          <th className="text-right px-4 py-3 font-semibold text-foreground">Price (approx.)</th>
                          <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {specs.variants.map((v, i) => (
                          <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3 font-medium text-foreground">{v.name}</td>
                            <td className="px-4 py-3 text-muted-foreground">{v.dimensions}</td>
                            <td className="px-4 py-3 text-right font-semibold text-primary">₹{v.price.toLocaleString('en-IN')}</td>
                            <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{v.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">* Prices are indicative and may vary based on quantity and current market rates.</p>
                </div>

                {/* Material Grades & Finishes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-xl border border-border p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Material Grades
                    </h3>
                    <div className="space-y-3">
                      {specs.materialGrades.map((g, i) => (
                        <div key={i}>
                          <span className="font-semibold text-foreground">{g.name}</span>
                          <p className="text-sm text-muted-foreground">{g.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Paintbrush className="w-5 h-5 text-primary" />
                      Surface Finishes
                    </h3>
                    <div className="space-y-3">
                      {specs.finishes.map((f, i) => (
                        <div key={i}>
                          <span className="font-semibold text-foreground">{f.name}</span>
                          <p className="text-sm text-muted-foreground">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Thickness/Schedule & Mount/Schedule Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isGlassProduct && specs.glassThickness.length > 0 && (
                    <div className="rounded-xl border border-border p-6">
                      <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" />
                        Glass Thickness Compatibility
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {specs.glassThickness.map((t, i) => (
                          <Badge key={i} variant="outline" className="border-primary/30 text-foreground px-3 py-1.5">{t}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">Most common range for railings and partitions.</p>
                    </div>
                  )}

                  {specs.mountTypes.length > 0 && (
                    <div className="rounded-xl border border-border p-6">
                      <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-primary" />
                        {isGlassProduct ? 'Mount Types' : 'Schedule / Wall Thickness'}
                      </h3>
                      <div className="space-y-2">
                        {specs.mountTypes.map((m, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            <div>
                              <span className="font-medium text-foreground">{m.name}</span>
                              <span className="text-sm text-muted-foreground"> — {m.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Applications */}
                <div className="rounded-xl border border-border p-6">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Common Applications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {specs.applications.map((a, i) => (
                      <Badge key={i} className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">{a}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </main>

        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </>
  );
};

export default ProductDetail;
