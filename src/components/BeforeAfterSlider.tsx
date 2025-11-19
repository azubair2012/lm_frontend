'use client';

import { useEffect } from 'react';

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
};

export default function BeforeAfterSlider({ beforeSrc, afterSrc, alt }: BeforeAfterSliderProps) {
  useEffect(() => {
    // Dynamically import the web component
    import('img-comparison-slider');
  }, []);

  return (
    <div className="relative h-full w-full select-none overflow-hidden border-[16px] border-[rgba(15,15,15,0.9)]">
      <img-comparison-slider hover="hover" className="h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img slot="first" src={beforeSrc} alt={`${alt} - Before`} className="h-full w-full object-cover" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img slot="second" src={afterSrc} alt={`${alt} - After`} className="h-full w-full object-cover" />
      </img-comparison-slider>
    </div>
  );
}
