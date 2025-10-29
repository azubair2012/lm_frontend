'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Property, rentmanApi, getBaseUrl } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X, Maximize2, Loader2 } from 'lucide-react';

interface PropertyGalleryProps {
  property: Property;
}

export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState(property.images?.gallery || []);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const [galleryLoaded, setGalleryLoaded] = useState(false);

  const { images } = property;
  
  // Load gallery images on demand
  const loadGalleryImages = async () => {
    if (galleryLoaded || isLoadingGallery) return;
    
    setIsLoadingGallery(true);
    try {
      const galleryData = await rentmanApi.getPropertyGallery(property.propref);
      setGalleryImages(galleryData?.gallery || []);
      setGalleryLoaded(true);
    } catch (error) {
      console.error('Failed to load gallery images:', error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  // Create images from raw photo fields if images object is not available
  const createImagesFromRawPhotos = () => {
    const photos = [
      property.photo1,
      property.photo2,
      property.photo3,
      property.photo4,
      property.photo5,
      property.photo6,
      property.photo7,
      property.photo8,
      property.photo9,
    ].filter(photo => photo && photo.trim() !== '');

    return photos.map((photo, index) => ({
      id: `photo-${index}`,
      caption: `Property Image ${index + 1}`,
      urls: {
        thumb: `http://localhost:3001/api/images/${photo}`,
        medium: `http://localhost:3001/api/images/${photo}`,
        large: `http://localhost:3001/api/images/${photo}`,
        original: `http://localhost:3001/api/images/${photo}`,
      },
    }));
  };

  const allImages = images ? [
    {
      id: 'main',
      caption: 'Main Image',
      urls: images.main,
    },
    ...(images.floorplan ? [{
      id: 'floorplan',
      caption: 'Floor Plan',
      urls: images.floorplan,
    }] : []),
    ...galleryImages.map((img, index) => ({
      ...img,
      id: `gallery-${img.id}-${index}`, // Ensure unique IDs for gallery images
    })),
  ] : createImagesFromRawPhotos();

  const currentImage = allImages[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
    // Load gallery images when modal opens
    loadGalleryImages();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (allImages.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">
            No images available for this property
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
            <Image
              src={currentImage.urls.large || currentImage.urls.medium}
              alt={currentImage.caption || 'Property image'}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
            
            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>

            {/* Fullscreen Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              onClick={openModal}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Thumbnail Strip */}
          <div className="p-4">
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto mb-4">
                {allImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? 'border-primary'
                        : 'border-transparent hover:border-muted-foreground'
                    }`}
                  >
                    <Image
                      src={image.urls.thumb}
                      alt={image.caption || `Property image ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Load More Images Button */}
            {!galleryLoaded && (
              <div className="text-center">
                <Button
                  onClick={loadGalleryImages}
                  disabled={isLoadingGallery}
                  variant="outline"
                  className="w-full"
                >
                  {isLoadingGallery ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading more images...
                    </>
                  ) : (
                    'Load More Images'
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={currentImage.urls.original || currentImage.urls.large}
              alt={currentImage.caption || 'Property image'}
              width={1200}
              height={800}
              unoptimized
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              onClick={closeModal}
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Navigation in Modal */}
            {allImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded">
              <div className="text-sm font-medium">{currentImage.caption}</div>
              <div className="text-xs text-muted-foreground">
                {currentImageIndex + 1} of {allImages.length}
              </div>
              {isLoadingGallery && (
                <div className="flex items-center gap-2 mt-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="text-xs">Loading more images...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
