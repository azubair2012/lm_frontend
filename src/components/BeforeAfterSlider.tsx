'use client';

import { useState } from 'react';
import Image from 'next/image';

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
};

export default function BeforeAfterSlider({ beforeSrc, afterSrc, alt }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative h-full w-full select-none overflow-hidden border-[16px] border-[rgba(15,15,15,0.9)]" >
      <Image
        src={afterSrc}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
        priority
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <Image
          src={beforeSrc}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
          priority
        />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center">
        <div
          className="h-full w-px"
          style={{ transform: `translateX(${position}%)`, background: 'rgba(255,255,255,0.65)' }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute left-0 top-1/2 z-10 h-1 w-full -translate-y-1/2 appearance-none bg-transparent focus:outline-none"
        aria-label="Before and after slider"
      />
    </div>
  );
}
