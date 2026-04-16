'use client';

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
    src: '/LM_Office_resizd_Image.jpg',
    title: 'London Move',
    subtitle: 'Experience the beauty of nature.',
  },
];

export default function ImageSlider() {
  return (
    <section className="relative h-full min-h-[500px] md:min-h-[650px] w-full overflow-hidden bg-white">
      {/* Image layers */}
      {IMAGE_SLIDES.map((slide) => {
        return (
          <Image
            key={slide.id}
            src={slide.src}
            alt={slide.title}
            fill
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        );
      })}

    </section>
  );
}
