'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type ImageSlide = {
  id: number;
  src: string;
  title: string;
  subtitle: string;
};

const IMAGE_SLIDES: ImageSlide[] = [
  {
    id: 1,
    src: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/darcey-beau-q8D7WZc40eA-unsplash.jpg',
    title: 'London Move',
    subtitle: 'Experience the beauty of nature.',
  },
  {
    id: 2,
    src: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/twilight-hero-banner.webp',
    title: 'London Move',
    subtitle: 'Discover city adventures.',
  },
  {
    id: 3,
    src: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/binghatti-skyblade-hero-banner.webp',
    title: 'London Move',
    subtitle: 'Discover city adventures.',
  },
];

const SLIDE_DURATION = 5000; // 10 seconds per image

export default function ImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGE_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-full md:min-h-[650px] min-h-[500px] w-full overflow-hidden bg-white sm:h-full">
      {/* Image layers */}
      {IMAGE_SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;
        return (
          <Image
            key={slide.id}
            src={slide.src}
            alt={slide.title}
            fill
            sizes="100vw"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
            draggable={false}
          />
        );
      })}

    </section>
  );
}
