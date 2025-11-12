'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

type Slide = {
  id: number;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    src: 'https://framerusercontent.com/images/dkpVPiJfr1AJeuHnZUECtNJVrk.jpg?width=1920&height=1280',
    alt: 'Modern luxury apartment exterior at sunset',
    title: 'Discover Your Next Home',
    subtitle: 'Premium listings across London and worldwide',
  },
  {
    id: 2,
    src: 'https://framerusercontent.com/images/rmQJCAUw2V8FQrSQy9fAmxfyxo.jpg?width=1920&height=1280',
    alt: 'Open plan living space with contemporary design',
    title: 'Tailored Property Services',
    subtitle: 'Valuations, management, maintenance, and strategy',
  },
  {
    id: 3,
    src: 'https://framerusercontent.com/images/rn0pYXxV1L6mqFqFZwz2dsdwY.jpg?width=1920&height=1280',
    alt: 'Townhouse façade illuminated at dusk',
    title: 'Global Reach, Local Expertise',
    subtitle: 'International offices with deep market knowledge',
  },
];

export default function HeroSlider() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 0,
    },
    drag: false,
    renderMode: 'performance',
  });

  useEffect(() => {
    if (!slider) return;

    const interval = setInterval(() => {
      slider.current?.next();
    }, 6000);

    return () => clearInterval(interval);
  }, [slider]);

  return (
    <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden bg-black sm:h-[70vh]">
      <div ref={sliderRef} className="keen-slider h-full">
        {SLIDES.map((slide) => (
          <div key={slide.id} className="keen-slider__slide relative h-full w-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slide.id === 1}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.35)]" />
            <div className="absolute inset-x-4 bottom-10 flex max-w-3xl flex-col gap-4 text-white sm:inset-x-12 sm:bottom-16">
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-white/70 sm:text-xs">
                Rentman Properties
              </span>
              <h1 className="text-2xl font-semibold uppercase tracking-[0.3em] sm:text-4xl">
                {slide.title}
              </h1>
              <p className="max-w-xl text-sm uppercase tracking-[0.2em] text-white/80 sm:text-base">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
