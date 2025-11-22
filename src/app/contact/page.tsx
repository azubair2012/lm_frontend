import ImageSlideShow from '@/components/ImageSlideShow';
import HomeContactPreview from '@/components/HomeContactPreview';


export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <ImageSlideShow />
      <section className="container mx-auto">
        {/* London Move Islington section */}
        <div className="mx-auto mt-16 flex max-w-4xl flex-col items-center gap-8 text-center">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[60px] text-black uppercase md:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}
            >
              LONDON MOVE
            </span>
            <span
              className="absolute top-12 text-[48px] text-[#B87333] md:top-16 md:text-7xl left-[88px] md:left-0"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
            >
              Islington
            </span>
          </div>

          <div
            className="max-w-3xl mx-4 md:mx-0 space-y-6 text-justify text-sm leading-8 text-[#383E42] sm:text-base"
            style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 200 }}
          >
            <p>
            London Move is hosted by a team of property specialists each with accountability of their sales, lettings 
            and property management departments. We observe all of these topics as expert fields and as such dedicate 
            our entire resources into perfect service delivery.
            </p>
            <p>
            Dynamic and innovative, London Move provides a spectrum of solutions across the property sector.
            Our team is apt in multi-disciplinary activities that represent clients both in London and across the UK.
            Rigid in-house procedural systems ensure that our clients’ interests are appropriately supported.
            All staff and associates undergo ongoing training and development to ensure consistent quality and care.
            </p>
            
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-8 md:mt-4">
        <HomeContactPreview />
        </div>
      </section>
    </main>
  );
}
