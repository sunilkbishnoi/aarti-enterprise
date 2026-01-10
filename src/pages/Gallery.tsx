import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { X, Loader2, ImageOff, Sparkles } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import Breadcrumbs from '@/components/Breadcrumbs';
import { supabase } from '@/integrations/supabase/client';

// Gallery images - Professional installation photos (regenerated 2026-01-10)
import galleryGlassRailing from '@/assets/gallery-glass-railing.jpg';
import gallerySsBaluster from '@/assets/gallery-ss-baluster.jpg';
import galleryGoldPvd from '@/assets/gallery-gold-pvd.jpg';
import gallerySpiralRailing from '@/assets/gallery-spiral-railing.jpg';
import galleryAluminiumWindow from '@/assets/gallery-aluminium-window.jpg';
import galleryRosegoldElevator from '@/assets/gallery-rosegold-elevator.jpg';
import galleryGlassPartition from '@/assets/gallery-glass-partition.jpg';
import galleryBlackMirror from '@/assets/gallery-black-mirror.jpg';
import galleryBalconyGlass from '@/assets/gallery-balcony-glass.jpg';

// Map gallery image filenames to imported assets
const galleryImagesByFilename: Record<string, string> = {
  'gallery-glass-railing.jpg': galleryGlassRailing,
  'gallery-ss-baluster.jpg': gallerySsBaluster,
  'gallery-gold-pvd.jpg': galleryGoldPvd,
  'gallery-spiral-railing.jpg': gallerySpiralRailing,
  'gallery-aluminium-window.jpg': galleryAluminiumWindow,
  'gallery-rosegold-elevator.jpg': galleryRosegoldElevator,
  'gallery-glass-partition.jpg': galleryGlassPartition,
  'gallery-black-mirror.jpg': galleryBlackMirror,
  'gallery-balcony-glass.jpg': galleryBalconyGlass,
};

// Helper to get image from DB url
const getGalleryImage = (imageUrl: string): string => {
  // Extract filename from path
  const filename = imageUrl.split('/').pop() || '';
  return galleryImagesByFilename[filename] || galleryGlassRailing;
};

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  display_order: number | null;
}

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'railing', name: 'SS & Glass Railing' },
  { id: 'designer', name: 'Designer Sheets' },
  { id: 'aluminium', name: 'Aluminium Works' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_items')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setGalleryItems(data || []);
      } catch (err: any) {
        console.error('Error fetching gallery:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const getImageSrc = (imageUrl: string) => {
    return getGalleryImage(imageUrl);
  };

  return (
    <>
      <Helmet>
        <title>Project Gallery - AARTI ENTERPRISE | SS & Glass Railing Works</title>
        <meta name="description" content="View our completed projects - SS railings, glass railings, designer sheets, and aluminium installations across Vadodara and Gujarat." />
        <link rel="canonical" href="https://aartienterprise.com/gallery" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "AARTI ENTERPRISE Project Gallery",
            "description": "Portfolio of completed stainless steel railing, glass railing, and designer sheet installations",
            "url": "https://aartienterprise.com/gallery"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />

        <main>
          {/* Hero */}
          <section className="bg-charcoal py-12">
            <div className="container mx-auto px-4">
              <Breadcrumbs />
              <div className="flex items-center gap-3 mb-4">
                <span className="badge-premium">
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  Our Work
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
                Project Gallery
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Explore our portfolio of completed projects. From modern glass railings to 
                luxurious designer sheet installations, see how we transform spaces.
              </p>
            </div>
          </section>

          {/* Category Filter */}
          <section className="py-8 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Gallery Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Failed to load gallery</h3>
                  <p className="text-muted-foreground">{error}</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                    <ImageOff className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                  <p className="text-muted-foreground">
                    {selectedCategory === 'all' 
                      ? 'No gallery items available yet.' 
                      : `No projects in the "${categories.find(c => c.id === selectedCategory)?.name}" category.`}
                  </p>
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="mt-4 text-primary hover:underline"
                    >
                      View all projects
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => setLightboxImage(item)}
                      className="group cursor-pointer overflow-hidden rounded-xl bg-card border border-border animate-fade-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={getImageSrc(item.image_url)}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-4xl w-full animate-scale-in" onClick={e => e.stopPropagation()}>
              <img
                src={getImageSrc(lightboxImage.image_url)}
                alt={lightboxImage.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <h3 className="text-xl font-display font-bold text-secondary">
                  {lightboxImage.title}
                </h3>
                <p className="text-muted-foreground mt-1">{lightboxImage.description}</p>
              </div>
            </div>
          </div>
        )}

        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </>
  );
};

export default Gallery;