'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { type Testimonial } from './testimonialsTypes';

export default function TestimonialsGrid() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/data/testimonials.json')
      .then((res) => res.json())
      .then((data) => setTestimonials(data as Testimonial[]))
      .catch((err) => console.error('Failed to load testimonials:', err));
  }, []);

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map(({ name, quote }) => (
        <article
          key={name}
          className="relative flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#ffffff]/70 via-white/60 to-white/30 p-8 shadow-[0_20px_60px_rgba(24,28,32,0.1)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(24,28,32,0.15)]"
        >
          <div className="flex items-center justify-start">
                <Image
                  src="/google.png"
                  alt="Google"
                  width={60}
                  height={20}
                  className="h-5 w-auto"
                />
          </div>
          <div className="flex items-center gap-1 text-sm text-[#F59E0B]">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.179 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.083 2.24a1 1 0 00-.364 1.118l1.179 3.63c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.173 2.246c-.784.57-1.838-.197-1.539-1.118l1.179-3.63a1 1 0 00-.364-1.118l-3.083-2.24c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.178-3.63z" />
              </svg>
            ))}
          </div>
          <p className="text-base leading-7 text-[#2B2F32]" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
            “{quote}”
          </p>
          <footer className="mt-auto text-right text-sm font-semibold uppercase tracking-[0.2em] text-[#111518]">
            {name}
          </footer>
        </article>
      ))}
    </section>
  );
}
