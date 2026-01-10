import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { X, Search, Sparkles, Grid3X3, LayoutGrid } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts } from '@/hooks/useProducts';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [gridSize, setGridSize] = useState<'small' | 'large'>('large');
  
  const { products, categories, grades, isLoading, error } = useProducts();
  
  const selectedCategory = searchParams.get('category') || '';
  const selectedGrade = searchParams.get('grade') || '';

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesGrade = !selectedGrade || product.grades.includes(selectedGrade);
      const matchesSearch = !search || 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      
      return matchesCategory && matchesGrade && matchesSearch;
    });
  }, [products, selectedCategory, selectedGrade, search]);

  const updateFilter = (key: string, value: string) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearch('');
  };

  const activeFilters = [
    selectedCategory && { key: 'category', label: categories.find(c => c.id === selectedCategory)?.name },
    selectedGrade && { key: 'grade', label: `Grade ${selectedGrade}` },
  ].filter(Boolean);

  const categoryName = selectedCategory 
    ? (categories.find(c => c.id === selectedCategory)?.name || 'Products')
    : 'All Products';

  return (
    <>
      <Helmet>
        <title>{`${categoryName} - SS & Aluminium Products | AARTI ENTERPRISE Vadodara`}</title>
        <meta name="description" content="Browse our complete range of stainless steel pipes, sheets, designer panels, glass railings & aluminium sections. Best wholesale prices in Gujarat." />
        <link rel="canonical" href="https://aartienterprise.com/products" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${categoryName} - AARTI ENTERPRISE`,
            "description": "Browse premium stainless steel and aluminium products",
            "url": "https://aartienterprise.com/products"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        
        <main>
          {/* Modern Page Header */}
          <section className="page-header relative">
            <div className="absolute inset-0 grid-pattern" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl animate-fade-up">
                <div className="flex items-center gap-3 mb-6">
                  <span className="badge-premium">
                    <Sparkles className="w-3.5 h-3.5 mr-2" />
                    Premium Quality
                  </span>
                  {selectedCategory && (
                    <span className="badge-glass">
                      {categoryName}
                    </span>
                  )}
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {selectedCategory ? (
                    <>
                      {categoryName}
                      <span className="text-gradient-gold block mt-2">Collection</span>
                    </>
                  ) : (
                    <>
                      Our Premium
                      <span className="text-gradient-gold block mt-2">Product Range</span>
                    </>
                  )}
                </h1>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
                  Explore our extensive collection of high-grade stainless steel and aluminium products. 
                  Quality materials at competitive wholesale prices.
                </p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />
            <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse-soft animation-delay-500" />
          </section>

          {/* Filters Section */}
          <div className="container mx-auto px-4 -mt-8 relative z-20">
            <div className="glass rounded-2xl p-6 shadow-elevated animate-fade-up animation-delay-200">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-12 h-12 bg-background/50 border-2 border-border/50 rounded-xl focus:border-primary transition-all"
                  />
                </div>

                {/* Filter Toggles */}
                <div className="flex flex-wrap gap-3 items-center">
                  <Select value={selectedCategory || 'all'} onValueChange={(v) => updateFilter('category', v === 'all' ? '' : v)}>
                    <SelectTrigger className="w-[180px] h-12 bg-background/50 border-2 border-border/50 rounded-xl hover:border-primary/50 transition-all">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-border/50">
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedGrade || 'all'} onValueChange={(v) => updateFilter('grade', v === 'all' ? '' : v)}>
                    <SelectTrigger className="w-[150px] h-12 bg-background/50 border-2 border-border/50 rounded-xl hover:border-primary/50 transition-all">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-border/50">
                      <SelectItem value="all">All Grades</SelectItem>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Grid Toggle */}
                  <div className="hidden md:flex items-center gap-1 p-1 bg-background/50 rounded-xl border-2 border-border/50">
                    <button
                      onClick={() => setGridSize('large')}
                      className={`p-2.5 rounded-lg transition-all ${gridSize === 'large' ? 'bg-primary text-primary-foreground shadow-gold' : 'hover:bg-muted'}`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setGridSize('small')}
                      className={`p-2.5 rounded-lg transition-all ${gridSize === 'small' ? 'bg-primary text-primary-foreground shadow-gold' : 'hover:bg-muted'}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                  </div>

                  {activeFilters.length > 0 && (
                    <Button 
                      variant="ghost" 
                      onClick={clearFilters} 
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl h-12"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  )}
                </div>
              </div>

              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                  <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
                  {activeFilters.map((filter: any) => (
                    <Badge 
                      key={filter.key} 
                      className="gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg px-3 py-1"
                    >
                      {filter.label}
                      <button 
                        onClick={() => updateFilter(filter.key, '')}
                        className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="container mx-auto px-4 py-12">
            {/* Loading State with Skeleton */}
            {isLoading && (
              <div className={`grid gap-6 ${
                gridSize === 'large' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
              }`}>
                <ProductSkeleton count={8} compact={gridSize === 'small'} />
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Failed to load products</h3>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button onClick={() => window.location.reload()} className="btn-modern">
                  Try Again
                </Button>
              </div>
            )}

            {/* Products Content */}
            {!isLoading && !error && (
              <>
                {/* Results Count */}
                <div className="flex items-center justify-between mb-8">
                  <p className="text-muted-foreground">
                    Showing <span className="text-foreground font-semibold">{filteredProducts.length}</span> products
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {selectedCategory && (
                      <span>in <span className="text-primary font-medium">{categoryName}</span></span>
                    )}
                  </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <div className={`grid gap-6 ${
                    gridSize === 'large' 
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                      : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                  }`}>
                    {filteredProducts.map((product, index) => (
                      <div 
                        key={product.id} 
                        className="animate-fade-up" 
                        style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
                      >
                        <ProductCard product={product} compact={gridSize === 'small'} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                    <Button onClick={clearFilters} className="btn-modern">
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </>
  );
};

export default Products;
