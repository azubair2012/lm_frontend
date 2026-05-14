'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Property, rentmanApi, getBaseUrl } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X, Maximize2, Loader2 } from 'lucide-react';

interface PropertyGalleryProps {
  property: Property;
}

type GalleryView = 'photos' | 'video' | 'floorplan';

export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<GalleryView>('photos');
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [activeView, setActiveView] = useState<GalleryView>('photos');

  const { images } = property;

  const loadGalleryImages = async () => {
    if (galleryLoaded || isLoadingGallery) return;

    setIsLoadingGallery(true);
    try {
      await rentmanApi.getPropertyGallery(property.propref);
      setGalleryLoaded(true);
    } catch (error) {
      console.error('Failed to load gallery images:', error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

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
    ].filter((photo) => photo && photo.trim() !== '');

    return photos.map((photo, index) => ({
      id: `photo-${index}`,
      caption: `Property Image ${index + 1}`,
      urls: {
        thumb: `${getBaseUrl()}/api/images/${photo}`,
        medium: `${getBaseUrl()}/api/images/${photo}`,
        large: `${getBaseUrl()}/api/images/${photo}`,
        original: `${getBaseUrl()}/api/images/${photo}`,
      },
    }));
  };

  const toAbsolute = (u?: string) => (u && u.startsWith('/api') ? `${getBaseUrl()}${u}` : u || '');

  const floorplanSrc = (() => {
    const fp = images?.floorplan;
    if (fp?.medium) return toAbsolute(fp.medium);
    if (fp?.large) return toAbsolute(fp.large);
    if (fp?.original) return toAbsolute(fp.original);
    if (property.floorplan?.trim()) {
      return `${getBaseUrl()}/api/images/${property.floorplan.trim()}`;
    }
    return '';
  })();

  const floorplanModalSrc =
    (images?.floorplan?.original && toAbsolute(images.floorplan.original)) ||
    (images?.floorplan?.large && toAbsolute(images.floorplan.large)) ||
    floorplanSrc;

  const videoEmbedUrl = (() => {
    const raw = String(property.evt ?? '').trim();
    if (!raw) return '';

    try {
      const url = new URL(raw);
      const host = url.hostname.replace(/^www\./, '').toLowerCase();

      if (host === 'youtube.com' || host === 'm.youtube.com') {
        if (url.pathname === '/watch') {
          const id = url.searchParams.get('v');
          return id ? `https://www.youtube.com/embed/${id}` : '';
        }
        if (url.pathname.startsWith('/embed/')) {
          const id = url.pathname.split('/embed/')[1]?.split('/')[0];
          return id ? `https://www.youtube.com/embed/${id}` : '';
        }
      }

      if (host === 'youtu.be') {
        const id = url.pathname.replace(/^\/+/, '').split('/')[0];
        return id ? `https://www.youtube.com/embed/${id}` : '';
      }
    } catch {
      return '';
    }

    return '';
  })();

  const allImages = images
    ? [...(images.gallery || []).map((img, index) => {
        type GalleryFlat = { id?: string; caption?: string; url?: string; thumbnail?: string };
        type GalleryUrls = { urls?: { thumb?: string; medium?: string; large?: string; original?: string } };
        const g: GalleryFlat & GalleryUrls = img as GalleryFlat & GalleryUrls;

        const hasUrlsObj = typeof g.urls === 'object' && g.urls !== null;

        const urlFromFlat = toAbsolute(g.url);
        const thumbFromFlat = toAbsolute(g.thumbnail);

        const normalizedFromObj = hasUrlsObj
          ? {
              thumb: toAbsolute(g.urls?.thumb),
              medium: toAbsolute(g.urls?.medium),
              large: toAbsolute(g.urls?.large),
              original: toAbsolute(g.urls?.original),
            }
          : { thumb: undefined, medium: undefined, large: undefined, original: undefined };

        const medium = normalizedFromObj.medium || urlFromFlat;
        const thumb = normalizedFromObj.thumb || thumbFromFlat || medium;
        const large = normalizedFromObj.large || medium;
        const original = normalizedFromObj.original || large;

        return {
          id: g.id || `gallery-${index}`,
          caption: g.caption || `Property Image ${index + 1}`,
          urls: { thumb, medium, large, original },
        };
      })]
    : createImagesFromRawPhotos();

  const hasPhotos = allImages.length > 0;
  const hasVideo = !!videoEmbedUrl;
  const hasFloorplan = !!floorplanSrc;
  const availableViewsCount = [hasPhotos, hasVideo, hasFloorplan].filter(Boolean).length;
  const showTabs = availableViewsCount > 1;

  const showPhotoMain = hasPhotos && (activeView === 'photos' || (!hasVideo && !hasFloorplan));
  const showVideoMain = hasVideo && (activeView === 'video' || (!hasPhotos && !hasFloorplan));
  const showFloorplanMain = hasFloorplan && (activeView === 'floorplan' || (!hasPhotos && !hasVideo));

  const currentImage = hasPhotos ? allImages[currentImageIndex] : null;

  useEffect(() => {
    if (activeView === 'photos' && !hasPhotos) {
      if (hasVideo) {
        setActiveView('video');
        return;
      }
      if (hasFloorplan) {
        setActiveView('floorplan');
      }
      return;
    }
    if (activeView === 'video' && !hasVideo) {
      if (hasPhotos) {
        setActiveView('photos');
        return;
      }
      if (hasFloorplan) {
        setActiveView('floorplan');
      }
      return;
    }
    if (activeView === 'floorplan' && !hasFloorplan) {
      if (hasPhotos) {
        setActiveView('photos');
        return;
      }
      if (hasVideo) {
        setActiveView('video');
      }
    }
  }, [activeView, hasPhotos, hasVideo, hasFloorplan]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const openModal = () => {
    setModalView(activeView);
    setIsModalOpen(true);
    if (showPhotoMain) {
      loadGalleryImages();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const tabClass = (view: GalleryView) =>
    `flex-1 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] transition-colors sm:text-base ${
      activeView === view
        ? 'border-b-2 border-[#B87333] bg-muted/40 text-[#B87333]'
        : 'border-b-2 border-transparent text-muted-foreground hover:bg-muted/20 hover:text-foreground'
    }`;

  if (!hasPhotos && !hasFloorplan && !hasVideo) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">No images available for this property</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-t-lg">
            {showTabs && (
              <div
                className="flex border-b bg-card"
                style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}
                role="tablist"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeView === 'photos'}
                  className={tabClass('photos')}
                  onClick={() => setActiveView('photos')}
                >
                  Photos
                </button>
                {hasVideo && (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeView === 'video'}
                    className={tabClass('video')}
                    onClick={() => setActiveView('video')}
                  >
                    Walkthrough Video
                  </button>
                )}
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeView === 'floorplan'}
                  className={tabClass('floorplan')}
                  onClick={() => setActiveView('floorplan')}
                >
                  Floor plan
                </button>
              </div>
            )}

            <div className="relative aspect-[4/3] overflow-hidden">
            {showPhotoMain && currentImage && (
              <>
                <Image
                  src={currentImage.urls.large || currentImage.urls.medium}
                  alt={currentImage.caption || `Property image ${currentImageIndex + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />

                {allImages.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white min-h-[44px] min-w-[44px]"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white min-h-[44px] min-w-[44px]"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                <div className="absolute bottom-4 left-4 rounded bg-black/70 px-2 py-1 text-sm text-white">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}

            {showFloorplanMain && floorplanSrc && (
              <Image
                src={floorplanSrc}
                alt="Property floor plan"
                fill
                unoptimized
                className="object-contain bg-muted/30"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
            )}

            {showVideoMain && videoEmbedUrl && (
              <iframe
                src={videoEmbedUrl}
                title="Property video"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-4 bg-white/90 hover:bg-white min-h-[44px] min-w-[44px]"
              onClick={openModal}
              aria-label="Open fullscreen gallery"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            </div>
          </div>

          <div className="p-4">
            {showPhotoMain && allImages.length > 1 && (
              <div className="mb-4 flex gap-2 overflow-x-auto overscroll-x-contain snap-x snap-mandatory">
                {allImages.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded border-2 transition-colors snap-center ${
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

            {showPhotoMain && !galleryLoaded && (
              <div className="text-center">
                <Button
                  onClick={loadGalleryImages}
                  disabled={isLoadingGallery}
                  variant="outline"
                  className="w-full"
                >
                  {isLoadingGallery ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-h-full max-w-7xl">
            {modalView === 'floorplan' && floorplanModalSrc ? (
              <Image
                src={floorplanModalSrc}
                alt="Property floor plan"
                width={1200}
                height={800}
                unoptimized
                className="max-h-full max-w-full object-contain"
              />
            ) : modalView === 'video' && videoEmbedUrl ? (
              <iframe
                src={videoEmbedUrl}
                title="Property video fullscreen"
                className="h-[80vh] w-[80vw] max-w-7xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : currentImage ? (
              <Image
                src={currentImage.urls.original || currentImage.urls.large}
                alt={currentImage.caption || `Property image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                unoptimized
                className="max-h-full max-w-full object-contain"
              />
            ) : null}

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-4 bg-white/90 hover:bg-white min-h-[44px] min-w-[44px]"
              onClick={closeModal}
              aria-label="Close gallery"
            >
              <X className="w-4 h-4" />
            </Button>

            {modalView === 'photos' && currentImage && allImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white min-h-[44px] min-w-[44px]"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white min-h-[44px] min-w-[44px]"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            <div className="absolute bottom-4 left-4 rounded bg-black/70 px-3 py-2 text-white">
              {modalView === 'floorplan' ? (
                <>
                  <div className="text-sm font-medium">Floor plan</div>
                  <div className="text-xs text-white/70">Full size</div>
                </>
              ) : modalView === 'video' ? (
                <>
                  <div className="text-sm font-medium">Property video</div>
                  <div className="text-xs text-white/70">YouTube</div>
                </>
              ) : currentImage ? (
                <>
                  <div className="text-sm font-medium">{currentImage.caption}</div>
                  <div className="text-xs text-white/70">
                    {currentImageIndex + 1} of {allImages.length}
                  </div>
                  {isLoadingGallery && (
                    <div className="mt-2 flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="text-xs">Loading more images...</span>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
