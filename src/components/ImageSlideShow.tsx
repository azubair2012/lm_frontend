'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
    src: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/1579144537.webp',
    title: 'London Move',
    subtitle: 'Experience the beauty of nature.',
  },
  {
    id: 2,
    src: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/pexels-pho-tomass-883344227-32506477%20%282%29.webp',
    title: 'London Move',
    subtitle: 'Discover city adventures.',
  },
  {
    id: 3,
    src: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/Islington_Square_12.ec896ae94ee0fa956657a33126818815.webp',
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
    <section className="relative h-full min-h-[360px] w-full overflow-hidden bg-white sm:h-full">
      {/* Image layers */}
      {IMAGE_SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;
        return (
          <Image
            key={slide.id}
            src={slide.src}
            alt={slide.title}
            width={1000}
            height={1000}
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
