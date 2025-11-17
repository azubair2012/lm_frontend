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
    src: '/s1.webp',
    title: 'London Move',
    subtitle: 'Experience the beauty of nature.',
  },
  {
    id: 2,
    src: '/s2.webp',
    title: 'London Move',
    subtitle: 'Discover city adventures.',
  },
  {
    id: 3,
    src: '/s3.webp',
    title: 'London Move',
    subtitle: 'Discover city adventures.',
  },
];

const SLIDE_DURATION = 10000; // 10 seconds per image

export default function ImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGE_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden bg-white sm:h-[80vh]">
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
