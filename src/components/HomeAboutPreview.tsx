'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ImageSlideShow from '@/components/ImageSlideShow';
import { CONTENT_REGISTRY } from '@/lib/content-registry';

export default function HomeAboutPreview() {
  const [aboutDescription, setAboutDescription] = useState(
    CONTENT_REGISTRY.homeAboutDescription.defaultValue
  );
  const [aboutFirstParagraph, aboutSecondParagraph] = aboutDescription
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  useEffect(() => {
    const loadEditableContent = async () => {
      try {
        const response = await fetch(
          `/api/content?keys=${encodeURIComponent(CONTENT_REGISTRY.homeAboutDescription.key)}`
        );
        const payload = (await response.json()) as {
          success: boolean;
          data?: Array<{ key: string; value: string }>;
        };
        if (!response.ok || !payload.success || !payload.data) {
          return;
        }

        const aboutEntry = payload.data.find(
          (entry) => entry.key === CONTENT_REGISTRY.homeAboutDescription.key
        );
        if (aboutEntry?.value?.trim()) {
          setAboutDescription(aboutEntry.value.trim());
        }
      } catch (error) {
        console.error('Error loading editable about preview content:', error);
      }
    };

    loadEditableContent();
  }, []);

  return (
    <section className="bg-[#f5f3f0] py-12 sm:py-16 md:py-24 px-4">
      <div className="container mx-auto flex max-w-7xl flex-col gap-8 rounded-[32px] bg-white/5 p-6 backdrop-blur-lg md:flex-row md:p-10">
        <div className="flex-1 border-8 sm:border-[16px] border-[#101418] w-full h-[300px] sm:h-[200px] md:h-[560px] overflow-hidden relative">
          <ImageSlideShow/>
        </div>
        <div className="flex max-w-lg flex-1 flex-col gap-6 md:gap-0 md:items-start items-center text-center md:text-start" style={{ fontFamily: 'Public Sans, sans-serif'}}>
          <header className="relative flex flex-col">
            <span
              className="text-[50px] text-black uppercase md:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 600 }}
            >
              LONDON MOVE
            </span>
            <span
              className="absolute top-10 left-[88px] md:left-0 text-[42px] text-[#B87333] md:top-16 md:text-7xl"
              style={{ fontFamily: 'Southland, serif' }}
            >
              About Us
            </span>
          </header>
          <p className="text-sm sm:text-base mt-6 sm:mt-8 leading-7 sm:leading-8 text-[#383E42]">
            {aboutFirstParagraph || CONTENT_REGISTRY.homeAboutDescription.defaultValue}
          </p>
          {aboutSecondParagraph && (
            <p className="text-sm sm:text-base leading-7 sm:leading-8 mt-4 text-[#383E42]">
              {aboutSecondParagraph}
            </p>
          )}
          <div className="flex flex-col mt-4">
            <Link href="/about" className="bg-[#383E42] text-sm hover:text-[#B87333] text-white rounded-none text-center font-semibold h-[50px] w-[250px]  p-4" style={{ fontFamily: 'Roboto, sans-serif' }}>LEARN MORE</Link>
            </div>

        </div>
      </div>
    </section>
  );
}
