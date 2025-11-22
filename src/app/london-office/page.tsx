import ImageSlideShow from '@/components/ImageSlideShow';
import HomeContactPreview from '@/components/HomeContactPreview';
export default function LondonOfficePage() {
  return (
    <main className="min-h-screen bg-background">
        <ImageSlideShow />
      <div className="flex flex-col justify-center mx-auto ">
        <div className="absolute -z-10 hidden md:block w-full h-full opacity-50" style={{
            backgroundImage: "url('/bg2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}>
        </div>
          <div className="md:mt-16 mt-6">
            <header className="relative flex flex-col items-center">
            <span
              className="text-[64px] text-black uppercase sm:text-[90px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 600 }}
            >
              OFFICES
            </span>
            <span
              className="absolute top-10 text-5xl text-[#B87333] mt-4 sm:top-16 sm:text-[5.5rem]"
              style={{ fontFamily: 'Southland, serif' }}
            >
              In London
            </span>
            </header>
            <span className="text-3xl md:mt-12 mt-4 text-[#383E42] justify-center flex" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}>Get in touch:</span>
          </div>
            <HomeContactPreview header={null}/>
            
      </div>
    </main>
  );
}
