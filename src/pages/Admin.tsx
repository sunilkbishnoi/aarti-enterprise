import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, Plus, Pencil, Trash2, Upload, Package, 
  Tag, Layers, Image, RefreshCw, Home, AlertCircle,
  IndianRupee, Check, X, Star, Eye, Search, CalendarCheck
} from 'lucide-react';
import BookingManagement from '@/components/BookingManagement';
import logo from '@/assets/logo.png';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
}

interface Grade {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  base_price: number;
  image_url: string | null;
  images: string[];
  sizes: string[];
  thicknesses: string[];
  in_stock: boolean;
  is_featured: boolean;
  display_order: number;
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Inline price editing
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  
  // Dialogs
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [gradeDialog, setGradeDialog] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  
  // Edit states
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form states
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '', description: '', image_url: '' });
  const [gradeForm, setGradeForm] = useState({ name: '', description: '' });
  const [productForm, setProductForm] = useState({
    name: '', slug: '', description: '', category_id: '', base_price: 0,
    image_url: '', sizes: '', thicknesses: '', in_stock: true, is_featured: false
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    } else if (!loading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [user, isAdmin, loading, navigate, toast]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
      const cleanup = setupRealtimeSubscription();
      return cleanup;
    }
  }, [user, isAdmin]);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('admin-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => fetchProducts())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => fetchCategories())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'grades' }, () => fetchGrades())
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  };

  const fetchData = async () => {
    setIsLoading(true);
    await Promise.all([fetchCategories(), fetchGrades(), fetchProducts()]);
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setCategories(data || []);
    }
  };

  const fetchGrades = async () => {
    const { data, error } = await supabase
      .from('grades')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setGrades(data || []);
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setProducts(data || []);
    }
  };

  const handleImageUpload = async (file: File, type: 'product' | 'category') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);
    
    if (error) {
      toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
      return null;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);
    
    return publicUrl;
  };

  // Quick price update
  const startPriceEdit = (product: Product) => {
    setEditingPriceId(product.id);
    setTempPrice(product.base_price);
  };

  const savePriceEdit = async () => {
    if (!editingPriceId) return;
    
    const { error } = await supabase
      .from('products')
      .update({ base_price: tempPrice })
      .eq('id', editingPriceId);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Price Updated", description: `Price changed to ₹${tempPrice}` });
      setEditingPriceId(null);
    }
  };

  const cancelPriceEdit = () => {
    setEditingPriceId(null);
    setTempPrice(0);
  };

  // Toggle stock status
  const toggleStock = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({ in_stock: !product.in_stock })
      .eq('id', product.id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  // Toggle featured status
  const toggleFeatured = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({ is_featured: !product.is_featured })
      .eq('id', product.id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  // Category CRUD
  const saveCategory = async () => {
    const slug = categoryForm.slug || categoryForm.name.toLowerCase().replace(/\s+/g, '-');
    
    if (editingCategory) {
      const { error } = await supabase
        .from('categories')
        .update({ ...categoryForm, slug })
        .eq('id', editingCategory.id);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Category updated" });
        setCategoryDialog(false);
        resetCategoryForm();
      }
    } else {
      const { error } = await supabase
        .from('categories')
        .insert({ ...categoryForm, slug });
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Category created" });
        setCategoryDialog(false);
        resetCategoryForm();
      }
    }
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Category removed" });
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: '', slug: '', description: '', image_url: '' });
    setEditingCategory(null);
  };

  // Grade CRUD
  const saveGrade = async () => {
    if (editingGrade) {
      const { error } = await supabase
        .from('grades')
        .update(gradeForm)
        .eq('id', editingGrade.id);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Grade updated" });
        setGradeDialog(false);
        resetGradeForm();
      }
    } else {
      const { error } = await supabase.from('grades').insert(gradeForm);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Grade created" });
        setGradeDialog(false);
        resetGradeForm();
      }
    }
  };

  const deleteGrade = async (id: string) => {
    const { error } = await supabase.from('grades').delete().eq('id', id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Grade removed" });
    }
  };

  const resetGradeForm = () => {
    setGradeForm({ name: '', description: '' });
    setEditingGrade(null);
  };

  // Product CRUD
  const saveProduct = async () => {
    const slug = productForm.slug || productForm.name.toLowerCase().replace(/\s+/g, '-');
    const sizes = productForm.sizes.split(',').map(s => s.trim()).filter(Boolean);
    const thicknesses = productForm.thicknesses.split(',').map(s => s.trim()).filter(Boolean);
    
    const productData = {
      name: productForm.name,
      slug,
      description: productForm.description,
      category_id: productForm.category_id || null,
      base_price: productForm.base_price,
      image_url: productForm.image_url,
      images: productForm.image_url ? [productForm.image_url] : [],
      sizes,
      thicknesses,
      in_stock: productForm.in_stock,
      is_featured: productForm.is_featured,
    };
    
    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Product updated" });
        setProductDialog(false);
        resetProductForm();
      }
    } else {
      const { error } = await supabase.from('products').insert(productData);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Product created" });
        setProductDialog(false);
        resetProductForm();
      }
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Product removed" });
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '', slug: '', description: '', category_id: '', base_price: 0,
      image_url: '', sizes: '', thicknesses: '', in_stock: true, is_featured: false
    });
    setEditingProduct(null);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Uncategorized';
    const cat = categories.find(c => c.id === categoryId);
    return cat?.name || 'Unknown';
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
        <Card className="bg-charcoal-light/50 backdrop-blur-xl border-charcoal-medium max-w-md">
          <CardContent className="pt-8 text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-6">You don't have admin privileges.</p>
            <Button onClick={() => navigate('/')} className="btn-modern">
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-xl border-b border-charcoal-medium shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg">
                <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <h1 className="font-display font-bold text-foreground text-xl">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')} 
                className="border-charcoal-medium text-foreground hover:bg-charcoal-medium gap-2"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">View Site</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchData} 
                className="border-charcoal-medium text-foreground hover:bg-charcoal-medium"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-charcoal-light/80 border border-charcoal-medium p-1.5 rounded-xl">
            <TabsTrigger 
              value="products" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 rounded-lg px-4"
            >
              <Package className="w-4 h-4" />
              Products ({products.length})
            </TabsTrigger>
            <TabsTrigger 
              value="categories" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 rounded-lg px-4"
            >
              <Layers className="w-4 h-4" />
              Categories ({categories.length})
            </TabsTrigger>
            <TabsTrigger 
              value="grades" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 rounded-lg px-4"
            >
              <Tag className="w-4 h-4" />
              Grades ({grades.length})
            </TabsTrigger>
            <TabsTrigger 
              value="bookings" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 rounded-lg px-4"
            >
              <CalendarCheck className="w-4 h-4" />
              Bookings
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">Products</h2>
                <p className="text-muted-foreground text-sm">Manage your product catalog and pricing</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-charcoal-light border-charcoal-medium text-foreground w-full sm:w-64"
                  />
                </div>
                <Dialog open={productDialog} onOpenChange={setProductDialog}>
                  <DialogTrigger asChild>
                    <Button className="btn-modern whitespace-nowrap" onClick={resetProductForm}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-charcoal-light border-charcoal-medium max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                      <DialogDescription>Fill in the product details below.</DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-foreground">Name *</Label>
                          <Input
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            className="bg-charcoal border-charcoal-medium text-foreground"
                            placeholder="SS Round Pipe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-foreground">Slug</Label>
                          <Input
                            value={productForm.slug}
                            onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                            className="bg-charcoal border-charcoal-medium text-foreground"
                            placeholder="ss-round-pipe"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-foreground">Description</Label>
                        <Textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          className="bg-charcoal border-charcoal-medium text-foreground"
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-foreground">Category</Label>
                          <Select
                            value={productForm.category_id}
                            onValueChange={(v) => setProductForm({ ...productForm, category_id: v })}
                          >
                            <SelectTrigger className="bg-charcoal border-charcoal-medium text-foreground">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-charcoal border-charcoal-medium">
                              {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id} className="text-foreground">
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-foreground">Base Price (₹) *</Label>
                          <Input
                            type="number"
                            value={productForm.base_price}
                            onChange={(e) => setProductForm({ ...productForm, base_price: Number(e.target.value) })}
                            className="bg-charcoal border-charcoal-medium text-foreground"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-foreground">Image URL</Label>
                        <div className="flex gap-2">
                          <Input
                            value={productForm.image_url}
                            onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                            className="bg-charcoal border-charcoal-medium text-foreground flex-1"
                            placeholder="https://..."
                          />
                          <Label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = await handleImageUpload(file, 'product');
                                  if (url) setProductForm({ ...productForm, image_url: url });
                                }
                              }}
                            />
                            <div className="h-10 px-4 flex items-center gap-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 cursor-pointer">
                              <Upload className="w-4 h-4" />
                              Upload
                            </div>
                          </Label>
                        </div>
                        {productForm.image_url && (
                          <img src={productForm.image_url} alt="Preview" className="w-24 h-24 object-cover rounded-lg mt-2" />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-foreground">Sizes (comma-separated)</Label>
                          <Input
                            value={productForm.sizes}
                            onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                            className="bg-charcoal border-charcoal-medium text-foreground"
                            placeholder='1", 2", 3"'
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-foreground">Thicknesses (comma-separated)</Label>
                          <Input
                            value={productForm.thicknesses}
                            onChange={(e) => setProductForm({ ...productForm, thicknesses: e.target.value })}
                            className="bg-charcoal border-charcoal-medium text-foreground"
                            placeholder="1.0mm, 1.2mm, 1.5mm"
                          />
                        </div>
                      </div>
                      
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={productForm.in_stock}
                            onCheckedChange={(v) => setProductForm({ ...productForm, in_stock: v })}
                          />
                          <Label className="text-foreground">In Stock</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={productForm.is_featured}
                            onCheckedChange={(v) => setProductForm({ ...productForm, is_featured: v })}
                          />
                          <Label className="text-foreground">Featured</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setProductDialog(false)} className="border-charcoal-medium text-foreground">
                        Cancel
                      </Button>
                      <Button onClick={saveProduct} className="btn-modern">
                        {editingProduct ? 'Update' : 'Create'} Product
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid gap-4">
              {filteredProducts.length === 0 ? (
                <Card className="bg-charcoal-light/50 border-charcoal-medium border-dashed">
                  <CardContent className="py-16 text-center">
                    <div className="w-20 h-20 bg-charcoal rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Package className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {searchTerm ? 'No products found' : 'No products yet'}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm ? 'Try a different search term' : 'Add your first product to get started!'}
                    </p>
                    {!searchTerm && (
                      <Button className="btn-modern" onClick={() => { resetProductForm(); setProductDialog(true); }}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="bg-charcoal-light/30 rounded-xl border border-charcoal-medium overflow-hidden">
                  {/* Table Header */}
                  <div className="hidden md:grid md:grid-cols-[80px_1fr_150px_120px_100px_100px_120px] gap-4 p-4 bg-charcoal/50 border-b border-charcoal-medium text-sm font-medium text-muted-foreground">
                    <div>Image</div>
                    <div>Product Details</div>
                    <div>Category</div>
                    <div>Price</div>
                    <div className="text-center">Stock</div>
                    <div className="text-center">Featured</div>
                    <div className="text-right">Actions</div>
                  </div>
                  
                  {/* Table Rows */}
                  {filteredProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className={`grid md:grid-cols-[80px_1fr_150px_120px_100px_100px_120px] gap-4 p-4 items-center hover:bg-charcoal/30 transition-colors ${
                        index !== filteredProducts.length - 1 ? 'border-b border-charcoal-medium/50' : ''
                      }`}
                    >
                      {/* Image */}
                      <div>
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="w-16 h-16 object-cover rounded-lg shadow-md" 
                          />
                        ) : (
                          <div className="w-16 h-16 bg-charcoal rounded-lg flex items-center justify-center">
                            <Image className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      
                      {/* Product Details */}
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{product.description || 'No description'}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.sizes.slice(0, 3).map((size, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-charcoal-medium">
                              {size}
                            </Badge>
                          ))}
                          {product.sizes.length > 3 && (
                            <Badge variant="outline" className="text-xs border-charcoal-medium">
                              +{product.sizes.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Category */}
                      <div className="hidden md:block">
                        <Badge className="bg-charcoal text-foreground border-0">
                          {getCategoryName(product.category_id)}
                        </Badge>
                      </div>
                      
                      {/* Price - Inline Edit */}
                      <div className="flex items-center gap-2">
                        {editingPriceId === product.id ? (
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(Number(e.target.value))}
                              className="w-20 h-8 text-sm bg-charcoal border-primary text-foreground"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') savePriceEdit();
                                if (e.key === 'Escape') cancelPriceEdit();
                              }}
                            />
                            <Button size="icon" variant="ghost" onClick={savePriceEdit} className="h-7 w-7 text-emerald-400 hover:text-emerald-300">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={cancelPriceEdit} className="h-7 w-7 text-destructive hover:text-destructive/80">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startPriceEdit(product)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors group"
                          >
                            <IndianRupee className="w-3.5 h-3.5" />
                            <span className="font-semibold">{product.base_price.toLocaleString()}</span>
                            <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                          </button>
                        )}
                      </div>
                      
                      {/* Stock Toggle */}
                      <div className="flex justify-center">
                        <button
                          onClick={() => toggleStock(product)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            product.in_stock 
                              ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
                              : 'bg-destructive/20 text-destructive hover:bg-destructive/30'
                          }`}
                        >
                          {product.in_stock ? 'In Stock' : 'Out'}
                        </button>
                      </div>
                      
                      {/* Featured Toggle */}
                      <div className="flex justify-center">
                        <button
                          onClick={() => toggleFeatured(product)}
                          className={`p-2 rounded-lg transition-colors ${
                            product.is_featured 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-charcoal text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${product.is_featured ? 'fill-primary' : ''}`} />
                        </button>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingProduct(product);
                            setProductForm({
                              name: product.name,
                              slug: product.slug,
                              description: product.description || '',
                              category_id: product.category_id || '',
                              base_price: product.base_price,
                              image_url: product.image_url || '',
                              sizes: product.sizes.join(', '),
                              thicknesses: product.thicknesses.join(', '),
                              in_stock: product.in_stock,
                              is_featured: product.is_featured,
                            });
                            setProductDialog(true);
                          }}
                          className="border-charcoal-medium text-foreground hover:bg-charcoal-medium h-8 w-8 p-0"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteProduct(product.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">Categories</h2>
                <p className="text-muted-foreground text-sm">Organize your products into categories</p>
              </div>
              <Dialog open={categoryDialog} onOpenChange={setCategoryDialog}>
                <DialogTrigger asChild>
                  <Button className="btn-modern" onClick={resetCategoryForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-charcoal-light border-charcoal-medium">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-foreground">Name *</Label>
                      <Input
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        className="bg-charcoal border-charcoal-medium text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Description</Label>
                      <Textarea
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                        className="bg-charcoal border-charcoal-medium text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Image URL</Label>
                      <div className="flex gap-2">
                        <Input
                          value={categoryForm.image_url}
                          onChange={(e) => setCategoryForm({ ...categoryForm, image_url: e.target.value })}
                          className="bg-charcoal border-charcoal-medium text-foreground flex-1"
                        />
                        <Label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await handleImageUpload(file, 'category');
                                if (url) setCategoryForm({ ...categoryForm, image_url: url });
                              }
                            }}
                          />
                          <div className="h-10 px-4 flex items-center gap-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 cursor-pointer">
                            <Upload className="w-4 h-4" />
                          </div>
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setCategoryDialog(false)} className="border-charcoal-medium text-foreground">
                      Cancel
                    </Button>
                    <Button onClick={saveCategory} className="btn-modern">
                      {editingCategory ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Card key={category.id} className="bg-charcoal-light/50 border-charcoal-medium hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      {category.image_url ? (
                        <img src={category.image_url} alt={category.name} className="w-16 h-16 object-cover rounded-lg" />
                      ) : (
                        <div className="w-16 h-16 bg-charcoal rounded-lg flex items-center justify-center">
                          <Layers className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.slug}</p>
                        {category.description && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{category.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-charcoal-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingCategory(category);
                          setCategoryForm({
                            name: category.name,
                            slug: category.slug,
                            description: category.description || '',
                            image_url: category.image_url || '',
                          });
                          setCategoryDialog(true);
                        }}
                        className="border-charcoal-medium text-foreground hover:bg-charcoal-medium"
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteCategory(category.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">Grades</h2>
                <p className="text-muted-foreground text-sm">Manage steel grades (304, 316, etc.)</p>
              </div>
              <Dialog open={gradeDialog} onOpenChange={setGradeDialog}>
                <DialogTrigger asChild>
                  <Button className="btn-modern" onClick={resetGradeForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Grade
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-charcoal-light border-charcoal-medium">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">{editingGrade ? 'Edit Grade' : 'Add New Grade'}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-foreground">Name *</Label>
                      <Input
                        value={gradeForm.name}
                        onChange={(e) => setGradeForm({ ...gradeForm, name: e.target.value })}
                        className="bg-charcoal border-charcoal-medium text-foreground"
                        placeholder="304"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Description</Label>
                      <Textarea
                        value={gradeForm.description}
                        onChange={(e) => setGradeForm({ ...gradeForm, description: e.target.value })}
                        className="bg-charcoal border-charcoal-medium text-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setGradeDialog(false)} className="border-charcoal-medium text-foreground">
                      Cancel
                    </Button>
                    <Button onClick={saveGrade} className="btn-modern">
                      {editingGrade ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {grades.map((grade) => (
                <Card key={grade.id} className="bg-charcoal-light/50 border-charcoal-medium hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-5">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span className="text-xl font-bold text-primary-foreground">{grade.name}</span>
                      </div>
                      <h3 className="font-semibold text-foreground">Grade {grade.name}</h3>
                      {grade.description && (
                        <p className="text-sm text-muted-foreground mt-1">{grade.description}</p>
                      )}
                    </div>
                    <div className="flex justify-center gap-2 pt-4 border-t border-charcoal-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingGrade(grade);
                          setGradeForm({
                            name: grade.name,
                            description: grade.description || '',
                          });
                          setGradeDialog(true);
                        }}
                        className="border-charcoal-medium text-foreground hover:bg-charcoal-medium"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteGrade(grade.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Bookings</h2>
              <p className="text-muted-foreground text-sm">Manage customer appointments and consultations</p>
            </div>
            <BookingManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
