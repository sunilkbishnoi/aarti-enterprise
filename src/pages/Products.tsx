import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Filter, X, Search } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products, categories, grades } from '@/data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  
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
  }, [selectedCategory, selectedGrade, search]);

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

  return (
    <>
      <Helmet>
        <title>SS & Aluminium Products - AARTI ENTERPRISE Vadodara</title>
        <meta name="description" content="Browse our complete range of stainless steel pipes, sheets, designer panels, glass railings & aluminium sections. Best wholesale prices in Gujarat." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        
        <main>
          {/* Page Header */}
          <section className="bg-charcoal py-12">
            <div className="container mx-auto px-4">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
                Our Products
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Browse our extensive collection of premium stainless steel and aluminium products. 
                Use filters to find exactly what you need.
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4 py-8">
            {/* Filters Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Toggles */}
              <div className="flex flex-wrap gap-3">
                <Select value={selectedCategory} onValueChange={(v) => updateFilter('category', v)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedGrade} onValueChange={(v) => updateFilter('grade', v)}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Grades</SelectItem>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {activeFilters.length > 0 && (
                  <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeFilters.map((filter: any) => (
                  <Badge key={filter.key} variant="secondary" className="gap-2">
                    {filter.label}
                    <button onClick={() => updateFilter(filter.key, '')}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Results Count */}
            <p className="text-muted-foreground mb-6">
              Showing {filteredProducts.length} products
            </p>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No products found matching your criteria.</p>
                <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
              </div>
            )}
          </div>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Products;
