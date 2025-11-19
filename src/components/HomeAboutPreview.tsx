'use client';
import Link from 'next/link';
import ImageSlideShow from '@/components/ImageSlideShow';

export default function HomeAboutPreview() {
  return (
    <section className="bg-[#f5f3f0] py-24">
      <div className="container mx-auto flex max-w-5xl flex-col gap-8  text-[#101418] md:flex-row md:items-start">
        <div className="flex-1 space-y-4 border-[16px] border-[#101418] w-full h-[500px]">
          <ImageSlideShow/>
        </div>
        <div className="flex-1 " style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
          <header className="relative flex flex-col items-start">
            <span
              className="text-[64px] text-black uppercase sm:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 600 }}
            >
              LONDON MOVE
            </span>
            <span
              className="absolute top-10 text-5xl text-[#B87333] sm:top-16 sm:text-[5.5rem] text-center"
              style={{ fontFamily: 'Southland, serif' }}
            >
              About US
            </span>
          </header>
          <p className="text-base mt-8 leading-8 text-[#383E42]">
            At London Move, we appreciate that sales, lettings and property management are specialist disciplines in their
            own right. That’s why we’ve established fully independent departments run by dedicated experts. Each team is
            empowered to deliver tailored strategies, transparent communication and impressive results.
          </p>
          <p className="text-base leading-8">
            Whether you’re planning to sell, letting for the first time or scaling a portfolio, we align our advice to your
            goals. Expect clear timelines, thoughtful presentation and meticulous care at every stage of the journey.
          </p>
          <div className="mt-4">          
            <Link href="/concierge" className="bg-[#383E42] text-sm hover:text-[#B87333] text-white rounded-none text-center font-medium h-[50px] w-[250px] p-4" style={{ fontFamily: 'Roboto, sans-serif' }}>LEARN MORE</Link>
          </div>

        </div>
      </div>
    </section>
  );
}
