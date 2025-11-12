export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-center">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[64px] text-black uppercase sm:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 600 }}
            >
              ABOUT
            </span>
            <span
              className="absolute top-10 text-5xl text-[#B87333] sm:top-14 sm:text-7xl"
              style={{ fontFamily: 'Southland, serif' }}
            >
              Us
            </span>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl space-y-8 text-justify text-base leading-8 text-muted-foreground" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
          <p>
            It is widely accepted amongst those involved in the residential property industry that the sale, letting and management of property are all independent fields of expertise. All too commonly vendors, landlords and tenants find themselves pigeon-holed within a rigid procedure which ultimately stifles both the spirit, ethos and results achieved by their real estate advisors.
          </p>
          <p>
            Dynamic and innovative, London Move provides a spectrum of solutions across the property sector. Our team is apt in multi-disciplinary activities that represent clients both in London and across the United Kingdom. We pride ourselves on building long-standing relationships based on trust, transparency and tangible performance, delivering a bespoke service tailored to every client’s goals.
          </p>
          <p>
            All staff and associates undergo ongoing training and development to ensure consistent quality and care. London Move is hosted by a team of property specialists each with accountability of their sales or lettings portfolios, ensuring dedicated focus and expertise at every step of your property journey.
          </p>
        </div>
      </section>
    </main>
  );
}
