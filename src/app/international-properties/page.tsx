'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import InterImageSlider from '@/components/InterImageSlider';
import { type PropertyData } from './types';

export default function InternationalPropertiesPage() {
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);
  const [properties, setProperties] = useState<PropertyData[]>([]);

  useEffect(() => {
    fetch('/data/properties.json')
      .then((res) => res.json())
      .then((data) => setProperties(data as PropertyData[]))
      .catch((err) => console.error('Failed to load properties:', err));
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <InterImageSlider />
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col items-center text-center">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] text-black uppercase"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700 }}
            >
              Your Dream Home
            </span>
            <span
              className="absolute top-6 text-3xl text-[#B87333] sm:top-8 sm:text-4xl md:top-10 md:text-5xl lg:top-[80px] lg:text-7xl"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
            >
              Around The Would
            </span>
          </div>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 mt-6 sm:mt-8'>
            <div className='flex flex-col items-center gap-2'>
              <img src="/LM_ICON.png" alt="Embayt" className="w-[20px] h-[32px] sm:w-[24px] sm:h-[40px] mx-auto" />
              <img src="/logo.png" alt="Embayt" className="w-[150px] h-[15px] sm:w-[200px] sm:h-[20px] mx-auto" />
            </div>
              
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-[#383E42]" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 600 }}>
            In partnership with
            </p>
              <img src="/emblogo.png" alt="Embayt" className="w-[70px] sm:w-[90px] mx-auto" />
          </div>
          
        </div>

        <article
          className="mx-auto mt-8 sm:mt-10 md:mt-12 max-w-5xl px-4 sm:px-6 space-y-4 sm:space-y-6 md:space-y-8 text-left sm:text-justify text-base md:text-center sm:text-lg md:text-xl leading-6 sm:leading-7 md:leading-8 text-[#383E42]"
          style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}
        >
          <p>
          We are proud to partner with <a href="https://www.embayt.com" target="_blank"><span className="text-[#2c8ed4] font-bold hover:underline">Embayt</span></a>, bringing you a global network and exclusive property opportunities. Together, we offer seamless international real estate solutions tailored to your needs.
          </p>
         
        </article>
      </section>

      {/* Propety cards */}

      <section className="container mx-auto px-4 pb-16">
        <div
          className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2"
          style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
        >
          {properties.map((property) => (
            <article
              key={property.title}
              className="flex h-full flex-col overflow-hidden border border-white/10 bg-white/80 shadow-[0_20px_60px_rgba(24,28,32,0.08)] backdrop-blur"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                />
              </div>

              <div className="flex flex-1 flex-col gap-6 p-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold uppercase tracking-[0.2em] text-[#111518]">{property.title}</h3>
                  <p className="text-sm leading-7 text-[#383E42] sm:text-base">{property.cardDescription}</p>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => setSelectedProperty(property)}
                    className="w-full rounded-none bg-[#383E42] px-6 py-3 text-xs uppercase tracking-[0.4em] text-white transition hover:text-[#B87333]"
                  >
                    More Info
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </main>
  );
}

type PropertyModalProps = {
  property: PropertyData | null;
  onClose: () => void;
};

function PropertyModal({ property, onClose }: PropertyModalProps) {
  if (!property) return null;
  return <PropertyModalContent key={property.title} property={property} onClose={onClose} />;
}

function PropertyModalContent({ property, onClose }: { property: PropertyData; onClose: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (property.images.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevSlide = () => {
    if (property.images.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < property.images.length) {
      setCurrentSlide(index);
    }
  };

  // Auto-slide every 2 seconds
  useEffect(() => {
    if (property.images.length <= 1) return; // Don't auto-slide if only one image

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % property.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [property.images.length]); // Reset interval when images change

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4 md:p-6" onClick={onClose}>
      <div className="relative flex w-full h-full max-w-7xl max-h-[95vh] md:max-h-[90vh] flex-col overflow-y-auto md:overflow-hidden bg-white md:flex-row rounded-lg md:rounded-none" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-2 top-2 md:right-4 md:top-4 z-50 rounded-full bg-black/80 hover:bg-white px-2 py-1 md:px-3 md:py-2 text-xs uppercase tracking-[0.3em] text-white hover:text-black hover:border-[#b87333db] border-2 border-transparent transition-colors"
        >
          Close
        </button>

        {/* Left side - Image Slideshow */}
        <div className="relative flex-[0.7] h-[300px] sm:h-[400px] md:h-[600px] w-full my-auto overflow-hidden order-1 md:order-none">
          {/* Image layers with fade transition */}
          {property.images.map((src, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div 
                key={idx} 
                className={`absolute md:ml-8 inset-0 transition-opacity duration-1000 ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={src}
                  alt={`${property.title} ${idx + 1}`}
                  fill
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 60vw"
                  priority={idx === 0}
                />
              </div>
            );
          })}

          {/* Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-2 top-1/2 md:left-4 z-10 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-1.5 md:p-2 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-2 top-1/2 md:right-4 z-10 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-1.5 md:p-2 rounded-full transition-colors"
                aria-label="Next image"
              >
                <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dot Indicators */}
          {property.images.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2">
              {property.images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(idx);
                  }}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    currentSlide === idx ? 'w-6 sm:w-8 bg-white' : 'w-1.5 sm:w-2 bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right side - Text Content */}
        <div className="flex flex-[0.3] md:flex-[0.3] flex-col justify-center gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 lg:p-12 order-2 md:order-none" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
          <div className="space-y-4 sm:space-y-6 text-left">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111518] text-center" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
              {property.title}
            </h3>
            <div className="h-[1px] w-1/2 bg-[#b87333db] mx-auto"></div>
            <div className="space-y-3 sm:space-y-4">
              {property.modalDescription.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base md:text-sm leading-6 md:leading-7 text-[#383E42]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            {property.ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                className="text-[#383E42] hover:underline hover:text-[#B87333] transition-colors text-sm sm:text-base md:text-lg w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-[1px] w-full bg-[#b87333db] mx-auto mb-2 sm:mb-[10px]"></div>
                {cta.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

