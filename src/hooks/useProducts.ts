import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getProductImage } from '@/data/productImages';

export interface DBProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  base_price: number;
  image_url: string | null;
  images: string[] | null;
  sizes: string[] | null;
  thicknesses: string[] | null;
  in_stock: boolean | null;
  is_featured: boolean | null;
  display_order: number | null;
}

export interface DBCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number | null;
}

export interface DBGrade {
  id: string;
  name: string;
  description: string | null;
  display_order: number | null;
}

export interface ProductGrade {
  id: string;
  product_id: string;
  grade_id: string;
  price_multiplier: number | null;
}

// Transform DB product to display format
export interface DisplayProduct {
  id: string;
  name: string;
  category: string; // slug
  categoryId: string | null;
  grades: string[];
  sizes: string[];
  thicknesses: string[];
  basePrice: number;
  priceMultiplier: { [key: string]: number };
  images: string[];
  description: string;
  inStock: boolean;
  featured: boolean;
  slug: string;
}

export function useProducts() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [categories, setCategories] = useState<DBCategory[]>([]);
  const [grades, setGrades] = useState<DBGrade[]>([]);
  const [productGrades, setProductGrades] = useState<ProductGrade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [productsRes, categoriesRes, gradesRes, productGradesRes] = await Promise.all([
        supabase.from('products').select('*').order('display_order'),
        supabase.from('categories').select('*').order('display_order'),
        supabase.from('grades').select('*').order('display_order'),
        supabase.from('product_grades').select('*'),
      ]);

      if (productsRes.error) throw productsRes.error;
      if (categoriesRes.error) throw categoriesRes.error;
      if (gradesRes.error) throw gradesRes.error;
      if (productGradesRes.error) throw productGradesRes.error;

      setProducts(productsRes.data || []);
      setCategories(categoriesRes.data || []);
      setGrades(gradesRes.data || []);
      setProductGrades(productGradesRes.data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Transform products for display
  const displayProducts: DisplayProduct[] = useMemo(() => {
    return products.map(product => {
      const category = categories.find(c => c.id === product.category_id);
      const productGradesList = productGrades.filter(pg => pg.product_id === product.id);
      const gradeNames = productGradesList.map(pg => {
        const grade = grades.find(g => g.id === pg.grade_id);
        return grade?.name || '';
      }).filter(Boolean);

      // Build price multipliers
      const priceMultiplier: { [key: string]: number } = {};
      productGradesList.forEach(pg => {
        const grade = grades.find(g => g.id === pg.grade_id);
        if (grade) {
          priceMultiplier[grade.name] = pg.price_multiplier || 1;
        }
      });

      // If no grades assigned, use default grades
      const finalGrades = gradeNames.length > 0 ? gradeNames : ['304'];
      if (Object.keys(priceMultiplier).length === 0) {
        priceMultiplier['304'] = 1;
      }

      return {
        id: product.id,
        name: product.name,
        category: category?.slug || 'uncategorized',
        categoryId: product.category_id,
        grades: finalGrades,
        sizes: product.sizes || [],
        thicknesses: product.thicknesses || [],
        basePrice: product.base_price,
        priceMultiplier,
        images: product.images && product.images.length > 0 
          ? product.images 
          : [getProductImage(product.slug)],
        description: product.description || '',
        inStock: product.in_stock ?? true,
        featured: product.is_featured ?? false,
        slug: product.slug,
      };
    });
  }, [products, categories, grades, productGrades]);

  const getProductById = (id: string) => displayProducts.find(p => p.id === id);
  const getProductBySlug = (slug: string) => displayProducts.find(p => p.slug === slug);
  const getFeaturedProducts = () => displayProducts.filter(p => p.featured);
  const getProductsByCategory = (categorySlug: string) => 
    displayProducts.filter(p => p.category === categorySlug);

  // Categories for filter dropdown
  const categoryOptions = useMemo(() => 
    categories.map(c => ({ id: c.slug, name: c.name })),
    [categories]
  );

  // Grades for filter dropdown
  const gradeOptions = useMemo(() => 
    grades.map(g => g.name),
    [grades]
  );

  return {
    products: displayProducts,
    categories: categoryOptions,
    grades: gradeOptions,
    rawCategories: categories,
    isLoading,
    error,
    refetch: fetchData,
    getProductById,
    getProductBySlug,
    getFeaturedProducts,
    getProductsByCategory,
  };
}
