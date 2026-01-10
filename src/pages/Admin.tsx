import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, Plus, Pencil, Trash2, Upload, Package, 
  Tag, Layers, Image, RefreshCw, Home, AlertCircle
} from 'lucide-react';
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
      setupRealtimeSubscription();
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
            <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
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
      <header className="sticky top-0 z-50 bg-charcoal/90 backdrop-blur-xl border-b border-charcoal-medium">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="font-display font-bold text-white text-lg">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate('/')} className="border-charcoal-medium text-white hover:bg-charcoal-medium">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Button>
              <Button variant="outline" size="sm" onClick={fetchData} className="border-charcoal-medium text-white hover:bg-charcoal-medium">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-charcoal-light/50 border border-charcoal-medium p-1">
            <TabsTrigger value="products" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Package className="w-4 h-4" />
              Products ({products.length})
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Layers className="w-4 h-4" />
              Categories ({categories.length})
            </TabsTrigger>
            <TabsTrigger value="grades" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Tag className="w-4 h-4" />
              Grades ({grades.length})
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold text-white">Products</h2>
              <Dialog open={productDialog} onOpenChange={setProductDialog}>
                <DialogTrigger asChild>
                  <Button className="btn-modern" onClick={resetProductForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-charcoal-light border-charcoal-medium max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-white">{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    <DialogDescription>Fill in the product details below.</DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Name *</Label>
                        <Input
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          className="bg-charcoal border-charcoal-medium text-white"
                          placeholder="SS Round Pipe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Slug</Label>
                        <Input
                          value={productForm.slug}
                          onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                          className="bg-charcoal border-charcoal-medium text-white"
                          placeholder="ss-round-pipe"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white">Description</Label>
                      <Textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="bg-charcoal border-charcoal-medium text-white"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Category</Label>
                        <Select
                          value={productForm.category_id}
                          onValueChange={(v) => setProductForm({ ...productForm, category_id: v })}
                        >
                          <SelectTrigger className="bg-charcoal border-charcoal-medium text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-charcoal border-charcoal-medium">
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id} className="text-white">
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Base Price (₹) *</Label>
                        <Input
                          type="number"
                          value={productForm.base_price}
                          onChange={(e) => setProductForm({ ...productForm, base_price: Number(e.target.value) })}
                          className="bg-charcoal border-charcoal-medium text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white">Image URL</Label>
                      <div className="flex gap-2">
                        <Input
                          value={productForm.image_url}
                          onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                          className="bg-charcoal border-charcoal-medium text-white flex-1"
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
                        <Label className="text-white">Sizes (comma-separated)</Label>
                        <Input
                          value={productForm.sizes}
                          onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                          className="bg-charcoal border-charcoal-medium text-white"
                          placeholder='1", 2", 3"'
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Thicknesses (comma-separated)</Label>
                        <Input
                          value={productForm.thicknesses}
                          onChange={(e) => setProductForm({ ...productForm, thicknesses: e.target.value })}
                          className="bg-charcoal border-charcoal-medium text-white"
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
                        <Label className="text-white">In Stock</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={productForm.is_featured}
                          onCheckedChange={(v) => setProductForm({ ...productForm, is_featured: v })}
                        />
                        <Label className="text-white">Featured</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setProductDialog(false)} className="border-charcoal-medium text-white">
                      Cancel
                    </Button>
                    <Button onClick={saveProduct} className="btn-modern">
                      {editingProduct ? 'Update' : 'Create'} Product
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-4">
              {products.length === 0 ? (
                <Card className="bg-charcoal-light/50 border-charcoal-medium">
                  <CardContent className="py-12 text-center">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No products yet. Add your first product!</p>
                  </CardContent>
                </Card>
              ) : (
                products.map((product) => (
                  <Card key={product.id} className="bg-charcoal-light/50 border-charcoal-medium hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                        ) : (
                          <div className="w-16 h-16 bg-charcoal rounded-lg flex items-center justify-center">
                            <Image className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate">{product.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-primary/20 text-primary border-0">₹{product.base_price}</Badge>
                            {product.is_featured && <Badge className="bg-emerald-500/20 text-emerald-400 border-0">Featured</Badge>}
                            {!product.in_stock && <Badge variant="destructive">Out of Stock</Badge>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
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
                            className="border-charcoal-medium text-white hover:bg-charcoal-medium"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold text-white">Categories</h2>
              <Dialog open={categoryDialog} onOpenChange={setCategoryDialog}>
                <DialogTrigger asChild>
                  <Button className="btn-modern" onClick={resetCategoryForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-charcoal-light border-charcoal-medium">
                  <DialogHeader>
                    <DialogTitle className="text-white">{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-white">Name *</Label>
                      <Input
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        className="bg-charcoal border-charcoal-medium text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Description</Label>
                      <Textarea
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                        className="bg-charcoal border-charcoal-medium text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Image URL</Label>
                      <div className="flex gap-2">
                        <Input
                          value={categoryForm.image_url}
                          onChange={(e) => setCategoryForm({ ...categoryForm, image_url: e.target.value })}
                          className="bg-charcoal border-charcoal-medium text-white flex-1"
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
                    <Button variant="outline" onClick={() => setCategoryDialog(false)} className="border-charcoal-medium text-white">
                      Cancel
                    </Button>
                    <Button onClick={saveCategory} className="btn-modern">
                      {editingCategory ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Card key={category.id} className="bg-charcoal-light/50 border-charcoal-medium hover:border-primary/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.slug}</p>
                      </div>
                      <div className="flex gap-2">
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
                          className="border-charcoal-medium text-white hover:bg-charcoal-medium"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteCategory(category.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold text-white">Grades</h2>
              <Dialog open={gradeDialog} onOpenChange={setGradeDialog}>
                <DialogTrigger asChild>
                  <Button className="btn-modern" onClick={resetGradeForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Grade
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-charcoal-light border-charcoal-medium">
                  <DialogHeader>
                    <DialogTitle className="text-white">{editingGrade ? 'Edit Grade' : 'Add New Grade'}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-white">Name *</Label>
                      <Input
                        value={gradeForm.name}
                        onChange={(e) => setGradeForm({ ...gradeForm, name: e.target.value })}
                        className="bg-charcoal border-charcoal-medium text-white"
                        placeholder="304"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Description</Label>
                      <Textarea
                        value={gradeForm.description}
                        onChange={(e) => setGradeForm({ ...gradeForm, description: e.target.value })}
                        className="bg-charcoal border-charcoal-medium text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setGradeDialog(false)} className="border-charcoal-medium text-white">
                      Cancel
                    </Button>
                    <Button onClick={saveGrade} className="btn-modern">
                      {editingGrade ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {grades.map((grade) => (
                <Card key={grade.id} className="bg-charcoal-light/50 border-charcoal-medium hover:border-primary/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className="bg-primary/20 text-primary border-0 text-lg font-bold">{grade.name}</Badge>
                        {grade.description && (
                          <p className="text-sm text-muted-foreground mt-1">{grade.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
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
                          className="border-charcoal-medium text-white hover:bg-charcoal-medium"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteGrade(grade.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
