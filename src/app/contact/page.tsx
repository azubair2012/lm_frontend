export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4">

{/* London Move Islington section */}
        <div className="mx-auto mt-16 flex max-w-4xl flex-col items-center gap-8 text-center">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[64px] text-black uppercase sm:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700 }}
            >
              LONDON MOVE
            </span>
            <span
              className="absolute top-10 text-5xl text-[#B87333] sm:top-14 sm:text-7xl"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
            >
              Islington
            </span>
          </div>

          <div
            className="max-w-3xl space-y-6 text-justify text-sm leading-8 text-[#383E42] sm:text-base"
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

        {/* Heading */}
        <div className="flex justify-center  pt-20">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[64px] text-black uppercase sm:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700}}
            >
              CONTACT
            </span>
            <span
              className="absolute top-10 text-5xl text-[#B87333] sm:top-14 sm:text-7xl"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
            >
              Us
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 flex w-full max-w-5xl flex-col items-center justify-center gap-3 md:flex-row md:gap-5">
          {/* Information column */}
          <div
            className="flex-1 space-y-8 text-sm leading-7 text-[#383E42]"
            style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
          >
            <div>
              <h3 className="font-semibold text-[#111518]">London Move</h3>
              <p>312 St. Pauls Road</p>
              <p>Islington, London N1 2LF</p>
              <p>United Kingdom</p>
            </div>

            <div>
              <h3 className="font-semibold text-[#111518]">Contact</h3>
              <p>Phone: <a href="tel:+442072265252" className="hover:text-[#B87333]">0207 226 5252</a></p>
              <p>Email: <a href="mailto:admin@london-move.com" className="hover:text-[#B87333]">admin@london-move.com</a></p>
            </div>

            <div>
              <h3 className="font-semibold text-[#111518]">Hours</h3>
              <ul className="space-y-1">
                <li>Monday 9.00am - 6.00pm</li>
                <li>Tuesday 9.00am - 6.00pm</li>
                <li>Wednesday 9.00am - 6.00pm</li>
                <li>Thursday 9.00am - 6.00pm</li>
                <li>Friday 9.00am - 6.00pm</li>
                <li>Saturday 10.00am - 3.00pm</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          {/* Form column */}
          <form className="flex-1 space-y-6" style={{ fontFamily: 'Public Sans, sans-serif' }}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-[#111518]">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  defaultValue="Jane Smith"
                  className="rounded-md border border-[#e5e7eb] bg-[#f5f5f5] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333] focus:bg-white"
                  placeholder="Jane Smith"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-[#111518]">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  defaultValue="jane@email.com"
                  className="rounded-md border border-[#e5e7eb] bg-[#f5f5f5] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333] focus:bg-white"
                  placeholder="jane@email.com"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-[#111518]">
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                className="rounded-md border border-[#e5e7eb] bg-[#f5f5f5] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333] focus:bg-white"
                placeholder="Subject"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-[#111518]">
              <span>Message</span>
              <textarea
                name="message"
                rows={6}
                className="rounded-md border border-[#e5e7eb] bg-[#f5f5f5] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333] focus:bg-white"
                placeholder="Your message..."
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-none bg-[#383E42] py-4 text-sm uppercase tracking-[0.45em] text-white transition hover:bg-[#2c3134]"
            >
              Submit
            </button>
          </form>
        </div>

        
      </section>
    </main>
  );
}
