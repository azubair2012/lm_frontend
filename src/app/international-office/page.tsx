import ImageSlideShow from "@/components/ImageSlideShow";

export default function InternationalOfficePage() {
  return (
    <main className="min-h-screen bg-background">
      <ImageSlideShow />
<div className="flex flex-col justify-center mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6">
  <div className="absolute -z-10 w-full h-full opacity-50 hidden md:block" style={{
    backgroundImage: "url('/bg1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
      }}></div>
          <div>
            <header className="relative flex flex-col items-center">
            <span
              className="text-[48px] sm:text-[64px] text-black uppercase md:text-[90px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}
            >
              OFFICES
            </span>
            <span
              className="absolute top-8 text-[48px] text-[#B87333] md:top-16 md:text-7xl"
              style={{ fontFamily: 'Southland, serif' }}
            >
              Around the World
            </span>
            </header>
            <span className="text-xl sm:text-2xl md:text-3xl mt-8 sm:mt-10 md:mt-12 text-[#383E42] justify-center flex" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}>Get in touch:</span>
            </div>
            

          <div className="mx-auto mt-6 sm:mt-8 md:mt-10 flex flex-col md:flex-row w-full max-w-5xl justify-center gap-8 md:gap-12 lg:gap-[100px] px-4">
          {/* Information column */}
          <div
            className="order-2 md:order-1 space-y-6 sm:space-y-8 text-sm leading-7 text-[#383E42] w-full md:w-auto text-center md:text-start"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}
          >
            <div>
              <h3 className="font-semibold text-lg">London Move</h3>
              <p>Office 220</p>
              <p>Al Attar Business Center</p>
              <p>Al Barsha, Dubai</p>
              <p>UAE</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Contact</h3>
              <p>Phone: <a href="tel:+97145689050" className="hover:text-[#B87333]"> +971 4 568 9050</a></p>
              <p>Email: <a href="mailto:info@embayt.com" className="hover:text-[#B87333]">info@embayt.com</a></p>
            </div>

           
          </div>

          {/* Form column */}
          <form className="order-1 md:order-2 space-y-4 sm:space-y-6 w-full md:w-auto md:min-w-[400px]" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}>
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
              className="w-full rounded-none bg-[#383E42] py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.45em] text-white transition hover:text-[#B87333]"
            >
              Submit
            </button>
          </form>
        </div>
</div>
    </main>
  );
}
