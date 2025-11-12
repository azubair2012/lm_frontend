'use client';

export default function HomeAboutPreview() {
  return (
    <section className="bg-[#f5f3f0] py-24">
      <div className="container mx-auto flex max-w-5xl flex-col gap-8 px-4 text-[#101418] md:flex-row md:items-start">
        <div className="flex-1 space-y-4 md:pr-12">
          <h2
            className="text-[56px] uppercase tracking-[0.3em] sm:text-[64px]"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700 }}
          >
            London Move
          </h2>
          <span
            className="inline-block text-lg uppercase tracking-[0.4em] text-[#B87333]"
            style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 600 }}
          >
            About Us
          </span>
        </div>
        <div className="flex-1 space-y-6" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
          <p className="text-base leading-8 text-[#383E42]">
            At London Move, we appreciate that sales, lettings and property management are specialist disciplines in their
            own right. That’s why we’ve established fully independent departments run by dedicated experts. Each team is
            empowered to deliver tailored strategies, transparent communication and impressive results.
          </p>
          <p className="text-base leading-8 text-[#383E42]">
            Whether you’re planning to sell, letting for the first time or scaling a portfolio, we align our advice to your
            goals. Expect clear timelines, thoughtful presentation and meticulous care at every stage of the journey.
          </p>
          <a
            href="/about"
            className="inline-block rounded-none border border-[#383E42] px-8 py-3 text-xs uppercase tracking-[0.4em] text-[#383E42] transition hover:bg-[#383E42] hover:text-white"
          >
            Discover More
          </a>
        </div>
      </div>
    </section>
  );
}
