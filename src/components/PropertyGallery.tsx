'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Property } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface PropertyGalleryProps {
  property: Property;
}

export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { images } = property;
  const allImages = [
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
    ...images.gallery,
  ];

  const currentImage = allImages[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
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
              src={`http://localhost:3001${currentImage.urls.large || currentImage.urls.medium}`}
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
          {allImages.length > 1 && (
            <div className="p-4">
              <div className="flex gap-2 overflow-x-auto">
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
                      src={`http://localhost:3001${image.urls.thumb}`}
                      alt={image.caption || `Property image ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={`http://localhost:3001${currentImage.urls.original || currentImage.urls.large}`}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
