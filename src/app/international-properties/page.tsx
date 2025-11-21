'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import ImageSlideShow from '@/components/ImageSlideShow'; 
type PropertyCTA = { label: string; href: string };

type PropertyData = {
  title: string;
  blurb: string;
  cardDescription: string;
  image: string;
  images: string[];
  modalDescription: string[];
  ctas: PropertyCTA[];
};

export default function InternationalPropertiesPage() {
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <ImageSlideShow />
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[64px] text-black uppercase sm:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700 }}
            >
              Your Dream Home
            </span>
            <span
              className="absolute top-10 text-5xl text-[#B87333] sm:top-[80px] sm:text-7xl"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
            >
              Around The Would
            </span>
          </div>
          <div className='flex gap-10 mt-8'>
            <div className='flex flex-col items-center gap-2'>
              <img src="/LM_ICON.png" alt="Embayt" className="w-[24px] h-[40px] mx-auto" />
              <img src="/logo.png" alt="Embayt" className="w-[200px] h-[20px] mx-auto" />
            </div>
              
            <p className="mt-8 text-4xl font-bold uppercase text-[#383E42]" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 600 }}>
            In partnership with
            </p>
              <img src="/emblogo.png" alt="Embayt" className="w-[90px] mx-auto" />
          </div>
          
        </div>

        <article
          className="mx-auto mt-12 max-w-5xl space-y-8 text-justify text-xl leading-8 text-[#383E42] sm:text-center"
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
          {PROPERTIES.map((property) => (
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
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="relative flex w-full max-w-5xl flex-col gap-8 overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/80 px-3 py-2 text-xs uppercase tracking-[0.3em] text-white hover:bg-black transition-colors"
        >
          Close
        </button>

        <div className="relative flex-1 bg-black/5">
          <div ref={sliderRef} className="keen-slider h-full">
            {property.images.map((src, idx) => (
              <div key={idx} className="keen-slider__slide flex items-center justify-center">
                <div className="relative h-[400px] w-full">
                  <Image src={src} alt={`${property.title} ${idx}`} fill className="object-cover" sizes="400px" />
                </div>
              </div>
            ))}
          </div>

          {property.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white transition-colors hover:bg-black"
                aria-label="Previous image"
              >
                <span className="text-xl font-bold">‹</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white transition-colors hover:bg-black"
                aria-label="Next image"
              >
                <span className="text-xl font-bold">›</span>
              </button>
            </>
          )}
        </div>

        <div className="flex max-w-md flex-1 flex-col gap-6 p-8" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
          <div className="space-y-4 text-left">
            <h3 className="text-2xl font-semibold uppercase tracking-[0.25em] text-[#111518]">{property.title}</h3>
            {property.modalDescription.map((paragraph, idx) => (
              <p key={idx} className="text-sm leading-7 text-[#383E42] sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3">
            {property.ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                className="w-full rounded-none border border-[#383E42] px-6 py-3 text-center text-xs uppercase tracking-[0.35em] text-[#383E42] transition hover:bg-[#383E42] hover:text-white"
              >
                {cta.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PROPERTIES: PropertyData[] = [
  {
    title: 'Binghatti Elite',
    blurb: '',
    cardDescription:
      'An icon in the skyline, where bold architecture meets an artistic vision. Steel and glass merge with unparalleled finesse, creating an indelible mark of luxury.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/elit.jpg',
    images: ['https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/Livingroom_Shot_1.jpg', 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/Lobby_Shot-1.jpg', 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/Bedroom_Shot_1.jpg'],
    modalDescription: [
      'In the heart of Dubai’s vibrant real estate landscape, Binghatti stands as a testament to architectural ingenuity and unwavering commitment to excellence. As a distinguished Emirati property brand, Binghatti has carved a niche for itself by creating iconic landmarks that redefine the skyline.',
      'The brand’s diverse portfolio caters to a wide spectrum of discerning clientele, offering projects that range from accessible elegance to ultra-high-end luxury. Binghatti’s signature design DNA, meticulously woven into each development, sets it apart on the global stage.',
    ],
    ctas: [
      { label: 'Project Map', href: '#' },
      { label: 'Brochure', href: '#' },
    ],
  },
  {
    title: 'Binghatti Skyblade',
    blurb: '',
    cardDescription:
      'Skyblade stands at the heart of Downtown Dubai. Minutes from the Burj Khalifa and Dubai Mall, offering seamless access to the city’s main attractions.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/binghatti-skyblade-hero-banner.webp',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'Skyblade is the city within the city. Located directly on the Boulevard, it is minutes from the iconic Burj Khalifa and Dubai Mall. It offers strategic access to Dubai’s main tourist and business areas.',
      'This unmistakable location caters to those who appreciate the unparalleled, offering world-class landmarks, entertainment and glamour.',
    ],
    ctas: [
      { label: 'Project Map', href: '#' },
      { label: 'Brochure', href: '#' },
    ],
  },
  {
    title: 'Binghatti Flare',
    blurb: '',
    cardDescription:
      'Flare’s design is a symphony of lines and light, a carefully orchestrated composition that evokes wonder and intrigue.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/binghatti-flare-hero-banner.webp',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'Flare’s design is a symphony of lines and light, a carefully orchestrated composition that evokes a sense of wonder and intrigue. It’s an architecture that transcends mere functionality, capturing the very essence of human emotion.',
    ],
    ctas: [
      { label: 'Project Map', href: '#' },
      { label: 'Brochure', href: '#' },
    ],
  },
  {
    title: 'Mercedes-Benz Places',
    blurb: '',
    cardDescription:
      'A joint vision between Binghatti and Mercedes-Benz, setting a new benchmark for intelligent, luxurious living.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/benz.jpg',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'This visionary project represents the zenith of Binghatti and Mercedes-Benz’s shared passion for iconic design and innovation, setting a new benchmark for luxurious and intelligent living.',
    ],
    ctas: [
      { label: 'Project Map', href: '#' },
      { label: 'Brochure', href: '#' },
    ],
  },
  {
    title: 'Binghatti Twilight',
    blurb: '',
    cardDescription:
      'Twilight is an exclusive collection of residences and office spaces, where every element is carefully considered to inspire.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/twilight-hero-banner.webp',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'Twilight is an exclusive collection of 228 residential units, comprising 104 one-bedroom, 118 two-bedroom, and 6 three-bedroom residences. Alongside, 47 meticulously designed office spaces and two ground-floor retail shops complete this distinctive offering.',
    ],
    ctas: [
      { label: 'Project Map', href: '#' },
      { label: 'Brochure', href: '#' },
    ],
  },
  {
    title: 'Binghatti Hills',
    blurb: '',
    cardDescription:
      'Inspired by the undulating slopes of nature, Hills captures dynamic movement and organic grandeur in a single expression.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/binghatti-hills.webp',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'Drawing inspiration from the undulating slopes of the terrain, Binghatti Hills captures the essence of dynamic movement and organic grandeur. The rhythmic waves form a captivating illustration of two limbs intertwined representing the seamless integration of modernity and tranquility.',
    ],
    ctas: [
      { label: 'Project Map', href: '#' },
      { label: 'Brochure', href: '#' },
    ],
  },
];
