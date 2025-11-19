'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

type VideoSlide = {
  id: number;
  src: string;
  title: string;
  subtitle: string;
};

const VIDEO_SLIDES: VideoSlide[] = [
   {
    id: 1,
    src: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/%5B1080p60fps%5D%20london_bridge_aerial_daytime%20%281%29.mp4',
    title: 'London Living',
    subtitle: 'Exceptional homes in one of the world’s great cities.',
  },
  {
    id: 2,
    src: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/%5B1080p60fps%5D%20dubai-downtown-skyline-day-to-night-transition.mp4',
    title: 'Global Cityscapes',
    subtitle: 'From Dubai to London, experience world-class destinations.',
  },
 ];

const SLIDE_DURATION = 10000; // 10 seconds per video (adjust to match clip length)

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % VIDEO_SLIDES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden bg-black sm:h-[80vh]">
      {/* Video layers */}
      {VIDEO_SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <video
            key={slide.id}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
            src={slide.src}
            autoPlay
            muted
            loop
            playsInline
          />
        );
      })}

     

      <div className="absolute left-1/2 bottom-[50px] transform -translate-x-1/2 flex flex-col items-center justify-center text-white bg-[#f3f5f68e] backdrop-blur-sm p-4 pb-4">
       <div className="flex items-center justify-center gap-10 my-6">                  
                  <Link href="/properties" className="bg-[#383E42] text-sm hover:text-[#B87333] tracking-tight text-white rounded-none text-center h-[55px] w-[180px] p-4" style={{ fontFamily: 'Roboto, sans-serif' }}>LONDON</Link>
                  <Link href="/valuation" className="bg-[#383E42] text-sm hover:text-[#B87333] tracking-tight text-white rounded-none text-center h-[55px] w-[180px]  p-4" style={{ fontFamily: 'Roboto, sans-serif' }}>GET VALUATION</Link>
                  <Link href="/international-properties" className="bg-[#383E42] text-sm hover:text-[#B87333] tracking-tight text-white rounded-none text-center h-[55px] w-[180px]  p-4" style={{ fontFamily: 'Roboto, sans-serif' }}>INTERNATIONAL</Link>

        </div>
      </div>
    </section>
  );
}
