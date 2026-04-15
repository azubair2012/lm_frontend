import TestimonialsGrid from '@/components/TestimonialsGrid';
import ImageSlideShow from '@/components/ImageSlideShow'; 
export default function TestimonialPage() {
  return (
    <main className="min-h-screen bg-background">
      <ImageSlideShow />
      <section className="mx-auto px-4 py-4  md:py-16">
        <div className="flex justify-center">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[60px] text-black uppercase md:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}
            >
              Testimonials
            </span>
            <span
              className="absolute top-12 text-[52px] text-[#B87333] md:top-16 md:text-7xl"
              style={{ fontFamily: 'Southland, serif'}}
            >
              Client Stories
            </span>
          </div>
        </div>
      </section>
      <TestimonialsGrid />
    </main>
  );
}
