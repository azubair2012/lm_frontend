import ImageSlideShow from '@/components/ImageSlideShow';

export default function LondonOfficePage() {
  return (
    <main className="min-h-screen bg-background">
      <ImageSlideShow />
<div className="flex flex-col justify-center mx-auto py-16">
<div className="absolute -z-10 w-full h-full opacity-50" style={{
    backgroundImage: "url('/bg2.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
      }}>
      </div>
          <div>
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
            <span className="text-3xl mt-12 text-[#383E42] justify-center flex" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}>Get in touch:</span>
            </div>
            

          <div className="mx-auto mt-10 flex w-full max-w-5xl justify-center gap-[100px] md:flex-row ">
          {/* Information column */}
          <div
            className="space-y-8 text-sm leading-7 text-[#383E42]"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}
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
          <form className="space-y-6" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-[#111518]">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  className="rounded-md border border-[#e5e7eb] bg-[#f5f5f5] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333] focus:bg-white"
                  placeholder="Jane Smith"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-[#111518]">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
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
</div>

    </main>
  );
}
