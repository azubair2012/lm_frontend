'use client';
import Link from 'next/link';
import ImageSlideShow from '@/components/ImageSlideShow';

export default function HomeAboutPreview() {
  return (
    <section className="bg-[#f5f3f0] py-12 sm:py-16 md:py-24 px-4">
      <div className="container mx-auto flex max-w-7xl flex-col gap-8 rounded-[32px] bg-white/5 p-6 backdrop-blur-lg md:flex-row md:p-10">
        <div className="flex-1 space-y-4 border-8 sm:border-[16px] border-[#101418] w-full h-[300px] sm:h-[200px] md:h-[560px]">
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
            At London Move, we appreciate that sales, lettings and property management are specialist disciplines in their
            own right. That&apos;s why we&apos;ve established fully independent departments run by dedicated experts. Each team is
            empowered to deliver tailored strategies, transparent communication and impressive results.
          </p>
          <p className="text-sm sm:text-base leading-7 sm:leading-8 mt-4 text-[#383E42]">
            Whether you&apos;re planning to sell, letting for the first time or scaling a portfolio, we align our advice to your
            goals. Expect clear timelines, thoughtful presentation and meticulous care at every stage of the journey.
          </p>
          <div className="flex flex-col mt-4">
            <Link href="/about" className="bg-[#383E42] text-sm hover:text-[#B87333] text-white rounded-none text-center font-semibold h-[50px] w-[250px]  p-4" style={{ fontFamily: 'Roboto, sans-serif' }}>LEARN MORE</Link>
            </div>

        </div>
      </div>
    </section>
  );
}
