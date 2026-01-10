import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const displayImages = images.length > 0 ? images : ['/placeholder.svg'];

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square rounded-xl bg-muted overflow-hidden group">
          <img
            src={displayImages[activeIndex]}
            alt={`${productName} - Image ${activeIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Zoom Button */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-charcoal/80 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-charcoal"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/80 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-charcoal hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/80 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-charcoal hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-charcoal/80 backdrop-blur-sm text-white text-xs font-medium">
              {activeIndex + 1} / {displayImages.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {displayImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                  index === activeIndex
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="max-w-5xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={displayImages[activeIndex]}
              alt={`${productName} - Image ${activeIndex + 1}`}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageGallery;