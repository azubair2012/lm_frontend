'use client';

import { useEffect, useState } from 'react';
import ImageSlideShow from '@/components/ImageSlideShow';
import Link from 'next/link';
import { CONTENT_REGISTRY } from '@/lib/content-registry';

export default function AboutPage() {
  const [aboutPageBody, setAboutPageBody] = useState(CONTENT_REGISTRY.aboutPageBody.defaultValue);

  useEffect(() => {
    const loadEditableContent = async () => {
      try {
        const response = await fetch(
          `/api/content?keys=${encodeURIComponent(CONTENT_REGISTRY.aboutPageBody.key)}`
        );
        const payload = (await response.json()) as {
          success: boolean;
          data?: Array<{ key: string; value: string }>;
        };
        if (!response.ok || !payload.success || !payload.data) {
          return;
        }

        const entry = payload.data.find((item) => item.key === CONTENT_REGISTRY.aboutPageBody.key);
        if (entry?.value?.trim()) {
          setAboutPageBody(entry.value.trim());
        }
      } catch (error) {
        console.error('Error loading about editable content:', error);
      }
    };

    loadEditableContent();
  }, []);

  return (
    <main className="bg-background">
      <ImageSlideShow />
      
        <div
          className="absolute -z-10 w-full h-[70vh] mx-auto opacity-50"
          style={{
            backgroundImage: "url('/bg2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="flex justify-center pt-12">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[64px] text-black uppercase sm:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 600 }}
            >
              ABOUT
            </span>
            <span
              className="absolute top-[60px] md:top-10 text-5xl text-[#B87333] sm:top-14 sm:text-7xl"
              style={{ fontFamily: 'Southland, serif' }}
            >
              Us
            </span>
          </div>
        </div>

        <div
          className="mx-auto mt-8 sm:mt-10 md:mt-12 max-w-3xl px-4 sm:px-6 space-y-4 sm:space-y-6 text-left sm:text-justify text-[16px] leading-7 text-[#383E42]"
          style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 200 }}
          dangerouslySetInnerHTML={{ __html: aboutPageBody }}
        ></div>

        <div className="flex flex-col items-center justify-center text-white backdrop-blur-sm p-4 mt-8">
          <h1 className="text-3xl font-bold text-black style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 600 }} ">
            Find Out More
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 my-6">
            <Link
              href="/properties"
              className="bg-[#383E42] text-sm hover:text-[#B87333] tracking-tight text-white rounded-none text-center h-[55px] w-[180px] p-4"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              LONDON PROPERTIES
            </Link>
            <Link
              href="/valuation"
              className="bg-[#383E42] text-sm hover:text-[#B87333] tracking-tight text-white rounded-none text-center h-[55px] w-[180px]  p-4"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              GET VALUATION
            </Link>
            <Link
              href="/contact"
              className="bg-[#383E42] text-sm hover:text-[#B87333] tracking-tight text-white rounded-none text-center h-[55px] w-[180px]  p-4"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              CONTACT US
            </Link>
          </div>
        </div>
      
    </main>
  );
}
