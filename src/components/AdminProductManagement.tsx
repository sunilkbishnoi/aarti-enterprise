import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  Plus, Pencil, Trash2, Upload, Package,
  Image, IndianRupee, Check, X, Star, Search, Layers
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
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

interface AdminProductManagementProps {
  products: Product[];
  categories: Category[];
  onRefresh: () => void;
}

const AdminProductManagement = ({ products, categories, onRefresh }: AdminProductManagementProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');

  // Selection for bulk actions
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Inline price editing
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  // Product dialog
  const [productDialog, setProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '', slug: '', description: '', category_id: '', base_price: 0,
    image_url: '', images: [] as string[], sizes: '', thicknesses: '', in_stock: true, is_featured: false
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Filters
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category_id === categoryFilter;
    const matchesStock = stockFilter === 'all' ||
      (stockFilter === 'in_stock' && p.in_stock) ||
      (stockFilter === 'out_of_stock' && !p.in_stock);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const allSelected = filteredProducts.length > 0 && filteredProducts.every(p => selectedIds.has(p.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProducts.map(p => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  // Image upload
  const handleImageUpload = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `product-${Date.now()}.${fileExt}`;

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
      onRefresh();
    }
  };

  const cancelPriceEdit = () => {
    setEditingPriceId(null);
    setTempPrice(0);
  };

  // Toggle stock
  const toggleStock = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({ in_stock: !product.in_stock })
      .eq('id', product.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else onRefresh();
  };

  // Toggle featured
  const toggleFeatured = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({ is_featured: !product.is_featured })
      .eq('id', product.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else onRefresh();
  };

  // Bulk actions
  const bulkDelete = async () => {
    if (selectedIds.size === 0) return;
    const confirmed = window.confirm(`Delete ${selectedIds.size} product(s)? This cannot be undone.`);
    if (!confirmed) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .in('id', Array.from(selectedIds));

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: `${selectedIds.size} product(s) removed` });
      setSelectedIds(new Set());
      onRefresh();
    }
  };

  const bulkToggleStock = async (inStock: boolean) => {
    if (selectedIds.size === 0) return;
    const { error } = await supabase
      .from('products')
      .update({ in_stock: inStock })
      .in('id', Array.from(selectedIds));

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated", description: `${selectedIds.size} product(s) marked ${inStock ? 'in stock' : 'out of stock'}` });
      setSelectedIds(new Set());
      onRefresh();
    }
  };

  const bulkChangeCategory = async (categoryId: string) => {
    if (selectedIds.size === 0) return;
    const { error } = await supabase
      .from('products')
      .update({ category_id: categoryId })
      .in('id', Array.from(selectedIds));

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated", description: `Category changed for ${selectedIds.size} product(s)` });
      setSelectedIds(new Set());
      onRefresh();
    }
  };

  // Save product
  const saveProduct = async () => {
    const slug = productForm.slug || productForm.name.toLowerCase().replace(/\s+/g, '-');
    const sizes = productForm.sizes.split(',').map(s => s.trim()).filter(Boolean);
    const thicknesses = productForm.thicknesses.split(',').map(s => s.trim()).filter(Boolean);

    const allImages = [...productForm.images];
    if (productForm.image_url && !allImages.includes(productForm.image_url)) {
      allImages.unshift(productForm.image_url);
    }

    const productData = {
      name: productForm.name,
      slug,
      description: productForm.description,
      category_id: productForm.category_id || null,
      base_price: productForm.base_price,
      image_url: productForm.image_url || (allImages[0] || null),
      images: allImages,
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
        onRefresh();
      }
    } else {
      const { error } = await supabase.from('products').insert(productData);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Product created" });
        setProductDialog(false);
        resetProductForm();
        onRefresh();
      }
    }
  };

  const deleteProduct = async (id: string) => {
    const confirmed = window.confirm('Delete this product? This cannot be undone.');
    if (!confirmed) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Product removed" });
      onRefresh();
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '', slug: '', description: '', category_id: '', base_price: 0,
      image_url: '', images: [], sizes: '', thicknesses: '', in_stock: true, is_featured: false
    });
    setEditingProduct(null);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      category_id: product.category_id || '',
      base_price: product.base_price,
      image_url: product.image_url || '',
      images: product.images || [],
      sizes: product.sizes.join(', '),
      thicknesses: product.thicknesses.join(', '),
      in_stock: product.in_stock,
      is_featured: product.is_featured,
    });
    setProductDialog(true);
  };

  const addImageToGallery = async (file: File) => {
    setUploadingImage(true);
    const url = await handleImageUpload(file);
    if (url) {
      const newImages = [...productForm.images, url];
      setProductForm({
        ...productForm,
        images: newImages,
        image_url: productForm.image_url || url,
      });
    }
    setUploadingImage(false);
  };

  const removeImage = (index: number) => {
    const newImages = productForm.images.filter((_, i) => i !== index);
    const removedUrl = productForm.images[index];
    setProductForm({
      ...productForm,
      images: newImages,
      image_url: productForm.image_url === removedUrl ? (newImages[0] || '') : productForm.image_url,
    });
  };

  const setAsPrimary = (url: string) => {
    setProductForm({ ...productForm, image_url: url });
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Uncategorized';
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Products</h2>
          <p className="text-muted-foreground text-sm">Manage your product catalog — edit all fields, pricing, and images</p>
        </div>
        <Dialog open={productDialog} onOpenChange={(open) => { setProductDialog(open); if (!open) resetProductForm(); }}>
          <DialogTrigger asChild>
            <Button className="btn-modern whitespace-nowrap" onClick={resetProductForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-foreground">{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>Fill in all product details below. Fields marked * are required.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-5 py-4">
              {/* Row 1: Name + Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Name *</Label>
                  <Input
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="bg-background border-border text-foreground"
                    placeholder="SS Round Pipe"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Slug</Label>
                  <Input
                    value={productForm.slug}
                    onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                    className="bg-background border-border text-foreground"
                    placeholder="Auto-generated from name"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-foreground">Description</Label>
                <Textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="bg-background border-border text-foreground"
                  rows={3}
                  placeholder="Detailed product description..."
                />
              </div>

              {/* Row 2: Category + Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Category</Label>
                  <Select
                    value={productForm.category_id}
                    onValueChange={(v) => setProductForm({ ...productForm, category_id: v })}
                  >
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
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
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-3">
                <Label className="text-foreground">Product Images</Label>
                <div className="flex flex-wrap gap-3">
                  {productForm.images.map((url, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={url}
                        alt={`Product ${i + 1}`}
                        className={`w-20 h-20 object-cover rounded-lg border-2 transition-colors ${
                          url === productForm.image_url ? 'border-primary' : 'border-border'
                        }`}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => setAsPrimary(url)}
                          className="p-1 rounded bg-primary/80 hover:bg-primary text-primary-foreground"
                          title="Set as primary"
                        >
                          <Star className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="p-1 rounded bg-destructive/80 hover:bg-destructive text-destructive-foreground"
                          title="Remove"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      {url === productForm.image_url && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <Star className="w-2.5 h-2.5 fill-primary-foreground text-primary-foreground" />
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Upload button */}
                  <Label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={async (e) => {
                        const files = e.target.files;
                        if (files) {
                          for (const file of Array.from(files)) {
                            await addImageToGallery(file);
                          }
                        }
                      }}
                    />
                    <div className={`w-20 h-20 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer ${uploadingImage ? 'opacity-50' : ''}`}>
                      {uploadingImage ? (
                        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">Upload</span>
                        </>
                      )}
                    </div>
                  </Label>
                </div>

                {/* URL input fallback */}
                <div className="flex gap-2">
                  <Input
                    value={productForm.image_url}
                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                    className="bg-background border-border text-foreground flex-1 text-sm"
                    placeholder="Or paste image URL..."
                  />
                </div>
              </div>

              {/* Sizes + Thicknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Sizes (comma-separated)</Label>
                  <Input
                    value={productForm.sizes}
                    onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                    className="bg-background border-border text-foreground"
                    placeholder='1", 2", 3"'
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Thicknesses (comma-separated)</Label>
                  <Input
                    value={productForm.thicknesses}
                    onChange={(e) => setProductForm({ ...productForm, thicknesses: e.target.value })}
                    className="bg-background border-border text-foreground"
                    placeholder="1.0mm, 1.2mm, 1.5mm"
                  />
                </div>
              </div>

              {/* Toggles */}
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
              <Button variant="outline" onClick={() => setProductDialog(false)} className="border-border text-foreground">
                Cancel
              </Button>
              <Button onClick={saveProduct} className="btn-modern">
                {editingProduct ? 'Update' : 'Create'} Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-card border-border text-foreground"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="bg-card border-border text-foreground w-full sm:w-44">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all" className="text-foreground">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.id} className="text-foreground">{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="bg-card border-border text-foreground w-full sm:w-36">
            <SelectValue placeholder="All Stock" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all" className="text-foreground">All Stock</SelectItem>
            <SelectItem value="in_stock" className="text-foreground">In Stock</SelectItem>
            <SelectItem value="out_of_stock" className="text-foreground">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-xl">
          <span className="text-sm font-medium text-foreground">{selectedIds.size} selected</span>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <Button size="sm" variant="outline" className="border-border text-foreground h-8 text-xs" onClick={() => bulkToggleStock(true)}>
            In Stock
          </Button>
          <Button size="sm" variant="outline" className="border-border text-foreground h-8 text-xs" onClick={() => bulkToggleStock(false)}>
            Out of Stock
          </Button>
          <Select onValueChange={bulkChangeCategory}>
            <SelectTrigger className="bg-card border-border text-foreground w-32 sm:w-40 h-8 text-xs">
              <SelectValue placeholder="Move category" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id} className="text-foreground">{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="destructive" className="h-8 text-xs" onClick={bulkDelete}>
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Delete
          </Button>
          <Button size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground" onClick={() => setSelectedIds(new Set())}>
            Clear
          </Button>
        </div>
      )}

      {/* Products List */}
      {filteredProducts.length === 0 ? (
        <Card className="bg-card/50 border-border border-dashed">
          <CardContent className="py-16 text-center">
            <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchTerm || categoryFilter !== 'all' || stockFilter !== 'all' ? 'No products found' : 'No products yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? 'Try different filters' : 'Add your first product to get started!'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-card/30 rounded-xl border border-border overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-[40px_80px_1fr_130px_110px_90px_80px_100px] gap-3 p-3 bg-muted/30 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="flex items-center justify-center">
              <Checkbox
                checked={allSelected}
                onCheckedChange={toggleSelectAll}
              />
            </div>
            <div>Image</div>
            <div>Product</div>
            <div>Category</div>
            <div>Price</div>
            <div className="text-center">Stock</div>
            <div className="text-center">★</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Rows */}
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`flex flex-col md:grid md:grid-cols-[40px_80px_1fr_130px_110px_90px_80px_100px] gap-2 md:gap-3 p-3 items-start md:items-center hover:bg-muted/10 transition-colors ${
                index !== filteredProducts.length - 1 ? 'border-b border-border/50' : ''
              } ${selectedIds.has(product.id) ? 'bg-primary/5' : ''}`}
            >
              {/* Mobile top row: checkbox + image + name + actions */}
              <div className="flex items-center gap-3 w-full md:contents">
                {/* Checkbox */}
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={selectedIds.has(product.id)}
                    onCheckedChange={() => toggleSelect(product.id)}
                  />
                </div>

                {/* Image - click to change */}
                <div className="relative group cursor-pointer flex-shrink-0">
                  <Label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const url = await handleImageUpload(file);
                        if (url) {
                          const newImages = [...(product.images || []), url];
                          await supabase.from('products').update({ image_url: url, images: newImages }).eq('id', product.id);
                          onRefresh();
                          toast({ title: "Image Updated", description: "Product image changed" });
                        }
                      }}
                    />
                    {product.image_url ? (
                      <div className="relative">
                        <img src={product.image_url} alt={product.name} className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Upload className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors">
                        <Upload className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </Label>
                  {product.images && product.images.length > 1 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[9px] font-bold text-primary-foreground flex items-center justify-center">
                      {product.images.length}
                    </span>
                  )}
                </div>

                {/* Product Details */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground text-sm truncate">{product.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{product.description || 'No description'}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.sizes.slice(0, 3).map((size, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0 border-border text-muted-foreground">
                        {size}
                      </Badge>
                    ))}
                    {product.sizes.length > 3 && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border text-muted-foreground">
                        +{product.sizes.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions - visible on mobile in top row */}
                <div className="flex items-center gap-1.5 md:hidden flex-shrink-0">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(product)} className="border-border text-foreground hover:bg-muted h-7 w-7 p-0">
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteProduct(product.id)} className="h-7 w-7 p-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Mobile bottom row: category, price, stock, featured */}
              <div className="flex items-center gap-2 flex-wrap pl-[calc(1rem+12px+48px)] md:pl-0 md:contents w-full">
                {/* Category */}
                <Badge variant="secondary" className="text-xs">
                  {getCategoryName(product.category_id)}
                </Badge>

                {/* Price */}
                <div className="flex items-center gap-1">
                  {editingPriceId === product.id ? (
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(Number(e.target.value))}
                        className="w-20 h-7 text-xs bg-background border-primary text-foreground"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') savePriceEdit();
                          if (e.key === 'Escape') cancelPriceEdit();
                        }}
                      />
                      <Button size="icon" variant="ghost" onClick={savePriceEdit} className="h-6 w-6 text-emerald-400">
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={cancelPriceEdit} className="h-6 w-6 text-destructive">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startPriceEdit(product)}
                      className="flex items-center gap-0.5 px-2 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors group text-xs sm:text-sm"
                    >
                      <IndianRupee className="w-3 h-3" />
                      <span className="font-semibold">{product.base_price.toLocaleString()}</span>
                      <Pencil className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity ml-0.5" />
                    </button>
                  )}
                </div>

                {/* Stock */}
                <div className="flex md:justify-center">
                  <button
                    onClick={() => toggleStock(product)}
                    className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                      product.in_stock
                        ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                        : 'bg-destructive/20 text-destructive hover:bg-destructive/30'
                    }`}
                  >
                    {product.in_stock ? 'In Stock' : 'Out'}
                  </button>
                </div>

                {/* Featured */}
                <div className="flex md:justify-center">
                  <button
                    onClick={() => toggleFeatured(product)}
                    className={`p-1 rounded-lg transition-colors ${
                      product.is_featured
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${product.is_featured ? 'fill-primary' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Actions - desktop only (mobile actions are in top row) */}
              <div className="hidden md:flex items-center justify-end gap-1.5">
                <Button variant="outline" size="sm" onClick={() => openEditDialog(product)} className="border-border text-foreground hover:bg-muted h-7 w-7 p-0">
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => deleteProduct(product.id)} className="h-7 w-7 p-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductManagement;
