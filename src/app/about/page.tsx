import ImageSlideShow from '@/components/ImageSlideShow';
import Image from 'next/image';
import Link from 'next/link';



export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <ImageSlideShow />
      <section className="mx-auto min-h-[80vh] relative">

      <div className="absolute -z-10 w-full h-full mx-auto opacity-50" style={{
              backgroundImage: "url('/bg2.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              }}>
          </div>

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

        <div className="mx-auto mt-8 sm:mt-10 md:mt-12 max-w-3xl px-4 sm:px-6 space-y-4 sm:space-y-6 text-left sm:text-justify text-base sm:text-lg leading-7 sm:leading-6" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 200 }}>
          <p>
            It is widely accepted amongst those involved in the residential property industry that the sale, letting and management of property are all independent fields of expertise. All too commonly vendors, landlords and tenants find themselves pigeon-holed within a rigid procedure which ultimately stifles both the spirit, ethos and results achieved by their real estate advisors.
          </p>
          <p>
            Dynamic and innovative, London Move provides a spectrum of solutions across the property sector. Our team is apt in multi-disciplinary activities that represent clients both in London and across the United Kingdom. We pride ourselves on building long-standing relationships based on trust, transparency and tangible performance, delivering a bespoke service tailored to every client&apos;s goals.
          </p>
          <p>
            All staff and associates undergo ongoing training and development to ensure consistent quality and care. London Move is hosted by a team of property specialists each with accountability of their sales or lettings portfolios, ensuring dedicated focus and expertise at every step of your property journey.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-white backdrop-blur-sm p-4 mt-8">
        <h1 className="text-3xl font-bold text-black ">Find Out More</h1>
       <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 my-6">    
                  <Link href="/properties" className="bg-[#383E42] text-sm hover:text-[#B87333] tracking-tight text-white rounded-none text-center h-[55px] w-[180px] p-4" style={{ fontFamily: 'Roboto, sans-serif' }}>LONDON PROPERTIES</Link>
                  <Link href="/valuation" className="bg-[#383E42] text-sm hover:text-[#B87333] tracking-tight text-white rounded-none text-center h-[55px] w-[180px]  p-4" style={{ fontFamily: 'Roboto, sans-serif' }}>GET VALUATION</Link>
                  <Link href="/contact" className="bg-[#383E42] text-sm hover:text-[#B87333] tracking-tight text-white rounded-none text-center h-[55px] w-[180px]  p-4" style={{ fontFamily: 'Roboto, sans-serif' }}>CONTACT US</Link>
        </div>
      </div>
        
      </section>
    </main>
  );
}
