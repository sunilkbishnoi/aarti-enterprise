import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { X } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const galleryItems = [
  {
    id: 1,
    category: 'railing',
    title: 'Modern Glass Railing',
    description: 'Elegant glass railing installation in luxury apartment',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    id: 2,
    category: 'railing',
    title: 'SS Baluster Railing',
    description: 'Classic stainless steel baluster design',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 3,
    category: 'designer',
    title: 'Gold PVD Panel Wall',
    description: 'Designer gold PVD sheets in hotel lobby',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  },
  {
    id: 4,
    category: 'railing',
    title: 'Spiral Staircase Railing',
    description: 'Custom SS railing for spiral staircase',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  },
  {
    id: 5,
    category: 'aluminium',
    title: 'Aluminium Window Installation',
    description: 'Modern aluminium sliding windows',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
  },
  {
    id: 6,
    category: 'designer',
    title: 'Rose Gold Elevator Panels',
    description: 'Elegant rose gold PVD elevator interiors',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    id: 7,
    category: 'railing',
    title: 'Office Glass Partition',
    description: 'Frameless glass partition with SS fittings',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
  },
  {
    id: 8,
    category: 'designer',
    title: 'Black Mirror Sheet Wall',
    description: 'Stunning black mirror finish feature wall',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 9,
    category: 'railing',
    title: 'Balcony Glass Railing',
    description: 'Frameless glass railing with U-channel',
    image: 'https://images.unsplash.com/photo-1600573472591-ee6c563aaec3?w=800&q=80',
  },
];

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'railing', name: 'SS & Glass Railing' },
  { id: 'designer', name: 'Designer Sheets' },
  { id: 'aluminium', name: 'Aluminium Works' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Project Gallery - AARTI ENTERPRISE</title>
        <meta name="description" content="View our completed projects - SS railings, glass railings, designer sheets, and aluminium installations across Vadodara and Gujarat." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />

        <main>
          {/* Hero */}
          <section className="bg-charcoal py-12">
            <div className="container mx-auto px-4">
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
                        src={item.image}
                        alt={item.title}
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
                src={lightboxImage.image}
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
      </div>
    </>
  );
};

export default Gallery;
