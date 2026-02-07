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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  LogOut, Plus, Pencil, Trash2, Upload, Package,
  Tag, Layers, RefreshCw, Home, AlertCircle,
  Eye, Star, CalendarCheck,
  LayoutDashboard, MessageSquare, TrendingUp, X
} from 'lucide-react';
import BookingManagement from '@/components/BookingManagement';
import AdminProductManagement from '@/components/AdminProductManagement';
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
  const { user, isAdmin, loading, adminLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialogs
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [gradeDialog, setGradeDialog] = useState(false);

  // Edit states
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);

  // Form states
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '', description: '', image_url: '' });
  const [gradeForm, setGradeForm] = useState({ name: '', description: '' });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    } else if (!loading && !adminLoading && user && !isAdmin) {
      toast({ title: "Access Denied", description: "You don't have admin privileges.", variant: "destructive" });
      navigate('/');
    }
  }, [user, isAdmin, loading, adminLoading, navigate, toast]);

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
    return () => { supabase.removeChannel(channel); };
  };

  const fetchData = async () => {
    setIsLoading(true);
    await Promise.all([fetchCategories(), fetchGrades(), fetchProducts(), fetchBookingsCount(), fetchInquiries()]);
    setIsLoading(false);
  };

  const fetchBookingsCount = async () => {
    const { count } = await supabase.from('bookings').select('*', { count: 'exact', head: true });
    if (count !== null) setBookingsCount(count);
  };

  const fetchInquiries = async () => {
    const { data } = await supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false }).limit(10);
    if (data) setInquiries(data);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*').order('display_order');
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else setCategories(data || []);
  };

  const fetchGrades = async () => {
    const { data, error } = await supabase.from('grades').select('*').order('display_order');
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else setGrades(data || []);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('display_order');
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else setProducts(data || []);
  };

  const handleImageUpload = async (file: File, type: 'product' | 'category') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from('product-images').upload(fileName, file);
    if (error) { toast({ title: "Upload Failed", description: error.message, variant: "destructive" }); return null; }
    const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName);
    return publicUrl;
  };

  // Category CRUD
  const saveCategory = async () => {
    const slug = categoryForm.slug || categoryForm.name.toLowerCase().replace(/\s+/g, '-');
    if (editingCategory) {
      const { error } = await supabase.from('categories').update({ ...categoryForm, slug }).eq('id', editingCategory.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Success", description: "Category updated" }); setCategoryDialog(false); resetCategoryForm(); }
    } else {
      const { error } = await supabase.from('categories').insert({ ...categoryForm, slug });
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Success", description: "Category created" }); setCategoryDialog(false); resetCategoryForm(); }
    }
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Deleted", description: "Category removed" });
  };

  const resetCategoryForm = () => { setCategoryForm({ name: '', slug: '', description: '', image_url: '' }); setEditingCategory(null); };

  // Grade CRUD
  const saveGrade = async () => {
    if (editingGrade) {
      const { error } = await supabase.from('grades').update(gradeForm).eq('id', editingGrade.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Success", description: "Grade updated" }); setGradeDialog(false); resetGradeForm(); }
    } else {
      const { error } = await supabase.from('grades').insert(gradeForm);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Success", description: "Grade created" }); setGradeDialog(false); resetGradeForm(); }
    }
  };

  const deleteGrade = async (id: string) => {
    const { error } = await supabase.from('grades').delete().eq('id', id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Deleted", description: "Grade removed" });
  };

  const resetGradeForm = () => { setGradeForm({ name: '', description: '' }); setEditingGrade(null); };

  const handleLogout = async () => { await signOut(); navigate('/'); };

  if (loading || adminLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-dark dark flex items-center justify-center p-4">
        <Card className="bg-card/50 backdrop-blur-xl border-border max-w-md">
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
    <div className="min-h-screen bg-gradient-dark dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border shadow-lg">
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
              <Button variant="outline" size="sm" onClick={() => navigate('/')} className="border-border text-foreground hover:bg-muted gap-2">
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">View Site</span>
              </Button>
              <Button variant="outline" size="sm" onClick={fetchData} className="border-border text-foreground hover:bg-muted">
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
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-card/80 border border-border p-1.5 rounded-xl flex-wrap">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 rounded-lg px-4">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 rounded-lg px-4">
              <Package className="w-4 h-4" />
              Products ({products.length})
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 rounded-lg px-4">
              <Layers className="w-4 h-4" />
              Categories ({categories.length})
            </TabsTrigger>
            <TabsTrigger value="grades" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 rounded-lg px-4">
              <Tag className="w-4 h-4" />
              Grades ({grades.length})
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 rounded-lg px-4">
              <CalendarCheck className="w-4 h-4" />
              Bookings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Dashboard</h2>
              <p className="text-muted-foreground text-sm">Overview of your business at a glance</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{products.length}</p>
                      <p className="text-xs text-muted-foreground">Total Products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Layers className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{categories.length}</p>
                      <p className="text-xs text-muted-foreground">Categories</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <CalendarCheck className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{bookingsCount}</p>
                      <p className="text-xs text-muted-foreground">Total Bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{inquiries.length}</p>
                      <p className="text-xs text-muted-foreground">Recent Inquiries</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-medium text-foreground">Featured Products</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{products.filter(p => p.is_featured).length}</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium text-foreground">In Stock</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{products.filter(p => p.in_stock).length}</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <X className="w-5 h-5 text-red-400" />
                    <span className="text-sm font-medium text-foreground">Out of Stock</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{products.filter(p => !p.in_stock).length}</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Inquiries */}
            <Card className="bg-card/50 border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Recent Contact Inquiries
                  </h3>
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {inquiries.length} recent
                  </Badge>
                </div>
                {inquiries.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">No inquiries yet</p>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="flex items-start justify-between gap-4 p-3 rounded-lg bg-muted/30 border border-border">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground text-sm">{inq.name}</span>
                            <Badge
                              variant="outline"
                              className={inq.status === 'new' ? 'border-amber-500/50 text-amber-400 text-xs' : 'border-emerald-500/50 text-emerald-400 text-xs'}
                            >
                              {inq.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{inq.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            📞 {inq.phone} {inq.email && `• ✉️ ${inq.email}`}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(inq.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <AdminProductManagement
              products={products}
              categories={categories}
              onRefresh={fetchProducts}
            />
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
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-foreground">Name *</Label>
                      <Input
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Description</Label>
                      <Textarea
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Image URL</Label>
                      <div className="flex gap-2">
                        <Input
                          value={categoryForm.image_url}
                          onChange={(e) => setCategoryForm({ ...categoryForm, image_url: e.target.value })}
                          className="bg-background border-border text-foreground flex-1"
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
                    <Button variant="outline" onClick={() => setCategoryDialog(false)} className="border-border text-foreground">Cancel</Button>
                    <Button onClick={saveCategory} className="btn-modern">{editingCategory ? 'Update' : 'Create'}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Card key={category.id} className="bg-card/50 border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      {category.image_url ? (
                        <img src={category.image_url} alt={category.name} className="w-16 h-16 object-cover rounded-lg" />
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Layers className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.slug}</p>
                        {category.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{category.description}</p>}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingCategory(category);
                          setCategoryForm({ name: category.name, slug: category.slug, description: category.description || '', image_url: category.image_url || '' });
                          setCategoryDialog(true);
                        }}
                        className="border-border text-foreground hover:bg-muted"
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
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">{editingGrade ? 'Edit Grade' : 'Add New Grade'}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-foreground">Name *</Label>
                      <Input
                        value={gradeForm.name}
                        onChange={(e) => setGradeForm({ ...gradeForm, name: e.target.value })}
                        className="bg-background border-border text-foreground"
                        placeholder="304"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Description</Label>
                      <Textarea
                        value={gradeForm.description}
                        onChange={(e) => setGradeForm({ ...gradeForm, description: e.target.value })}
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setGradeDialog(false)} className="border-border text-foreground">Cancel</Button>
                    <Button onClick={saveGrade} className="btn-modern">{editingGrade ? 'Update' : 'Create'}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {grades.map((grade) => (
                <Card key={grade.id} className="bg-card/50 border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-5">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span className="text-xl font-bold text-primary-foreground">{grade.name}</span>
                      </div>
                      <h3 className="font-semibold text-foreground">Grade {grade.name}</h3>
                      {grade.description && <p className="text-sm text-muted-foreground mt-1">{grade.description}</p>}
                    </div>
                    <div className="flex justify-center gap-2 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingGrade(grade);
                          setGradeForm({ name: grade.name, description: grade.description || '' });
                          setGradeDialog(true);
                        }}
                        className="border-border text-foreground hover:bg-muted"
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
