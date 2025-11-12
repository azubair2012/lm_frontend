import TestimonialsGrid from '@/components/TestimonialsGrid';

export default function TestimonialPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-center">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[64px] text-black uppercase sm:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700, letterSpacing: '0.25em' }}
            >
              Testimonials
            </span>
            <span
              className="absolute top-10 text-5xl text-[#B87333] sm:top-14 sm:text-7xl"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
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
