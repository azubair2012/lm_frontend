'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type TestimonialSlide = {
  id: number;
  quote: string;
  name: string;
};

const TESTIMONIAL_SLIDES: TestimonialSlide[] = [
  {
    id: 1,
    quote: "I have used London move for a few years now. Great communication. They support when I need them and don't bother me for unnecessary things. Very personable too! I highly recommend!",
    name: 'Kel',
  },
  {
    id: 2,
    quote: "Marley and Fatih helped us during the process of getting our flat and were extremely helpful throughout the whole process, highly recommend!",
    name: 'Theo Barnes',
  },
  {
    id: 3,
    quote: "Highly recommend. Quick to respond to any enquiries and professionals all the way through. Martin helped me get a really nice flat quickly and easily.",
    name: 'Bogdan Dance',
  },
];

const SLIDE_DURATION = 6000;

export default function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIAL_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      <div
        className="flex justify-center items-center py-8 sm:py-12 px-4 max-w-[1400px] mx-auto min-h-[400px] sm:h-[500px]"
        style={{
          backgroundImage: "url('/bg1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-50 flex flex-col items-center text-center px-4">
          <span
            className="text-[60px] text-black uppercase md:text-[80px]"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}
          >
            WHAT OUR
          </span>
          <span
            className="absolute top-12 text-[42px] text-[#B87333] md:top-16 md:text-7xl"
            style={{ fontFamily: 'Southland, serif' }}
          >
            Clients Are Saying
          </span>
          <div className="w-full max-w-[1200px] mt-6 sm:mt-8 text-sm sm:text-base md:text-[18px] px-4 relative min-h-[220px] overflow-hidden">
            {TESTIMONIAL_SLIDES.map((slide, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out pointer-events-none ${
                    isActive
                      ? 'translate-x-0 opacity-100'
                      : isPast
                        ? '-translate-x-full opacity-0'
                        : 'translate-x-full opacity-0'
                  }`}
                >
                  <span>
                    {slide.quote}
                    <br />
                    <br />-{slide.name}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center mt-6 sm:mb-4">
            <Link
              href="/testimonial"
              className="bg-[#383E42] text-xs sm:text-sm hover:text-[#B87333] text-white rounded-none text-center font-semibold h-[45px] sm:h-[50px] w-full max-w-[280px] px-4 flex items-center justify-center"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              SEE MORE TESTIMONIALS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
