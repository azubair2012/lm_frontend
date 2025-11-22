'use client';

export default function HomeContactPreview() {
  return (
    <section className="py-12 md:py-24 px-4">
      <div className="container items-center justify-center mx-auto max-w-5xl" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
            <div className="flex justify-center mb-8 sm:mb-12 md:mb-16">
              <header className="relative flex flex-col items-start">
              <span
              className="text-[60px] text-black uppercase md:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}
              >
              Contact
              </span>
              <span
              className="absolute top-12 text-[48px] text-[#B87333] md:top-16 md:text-7xl left-[88px] md:left-0"
              style={{ fontFamily: 'Southland, serif' }}
              >
              Us
              </span>
              </header>
            </div>
        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-12 text-center md:text-start">
          <div className="space-y-6 sm:space-y-8 text-sm sm:text-base leading-7 text-[#383E42] w-full lg:w-auto">
            <div>
              <h3 className="font-semibold uppercase tracking-[0.2em] text-[#101418] mb-2 sm:mb-3 text-sm sm:text-base">London Move</h3>
              <p className="text-sm sm:text-base">312 St. Pauls Road</p>
              <p className="text-sm sm:text-base">Islington, London N1 2LF</p>
              <p className="text-sm sm:text-base">United Kingdom</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase tracking-[0.2em] text-[#101418] mb-2 sm:mb-3 text-sm sm:text-base">Contact</h3>
              <p className="text-sm sm:text-base">
                Phone: <a href="tel:+442072265252" className="hover:text-[#B87333] transition">0207 226 5252</a>
              </p>
              <p className="text-sm sm:text-base break-words">
                Email: <a href="mailto:admin@london-move.com" className="hover:text-[#B87333] transition break-all">admin@london-move.com</a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold uppercase tracking-[0.2em] text-[#101418] mb-2 sm:mb-3 text-sm sm:text-base">Hours</h3>
              <p className="text-sm sm:text-base">Monday 9.00am - 6.00pm</p>
              <p className="text-sm sm:text-base">Tuesday 9.00am - 6.00pm</p>
              <p className="text-sm sm:text-base">Wednesday 9.00am - 6.00pm</p>
              <p className="text-sm sm:text-base">Thursday 9.00am - 6.00pm</p>
              <p className="text-sm sm:text-base">Friday 9.00am - 6.00pm</p>
              <p className="text-sm sm:text-base">Saturday 10.00am - 3.00pm</p>
              <p className="text-sm sm:text-base">Sunday: Closed</p>
            </div>
          </div>

          <form className="space-y-4 sm:space-y-6 text-sm text-[#111518] w-full lg:w-auto lg:min-w-[400px]">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 text-start">
              <label className="flex flex-col gap-2 text-[#8c8c8c]">
                <span className="text-sm">Name</span>
                <input
                  type="text"
                  name="name"
                  className="rounded-md border border-[#e5e7eb] bg-[#f6f4f2] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                  placeholder="Jane Smith"
                />
              </label>
              <label className="flex flex-col gap-2 text-[#8c8c8c]">
                <span className="text-sm">Email</span>
                <input
                  type="email"
                  name="email"
                  className="rounded-md border border-[#e5e7eb] bg-[#f6f4f2] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                  placeholder="jane@email.com"
                />
              </label>
            </div>
            <div className="flex flex-col gap-4 text-start">
              <label className="flex flex-col gap-2 text-[#8c8c8c] ">
              <span className="text-sm">Subject</span>
              <input
                type="text"
                name="subject"
                className="rounded-md border border-[#e5e7eb] bg-[#f6f4f2] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                placeholder="Subject"
              />
            </label>

            <label className="flex flex-col gap-2 text-[#8c8c8c]">
              <span className="text-sm">Message</span>
              <textarea
                name="message"
                rows={6}
                className="rounded-md border border-[#e5e7eb] bg-[#f6f4f2] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333] resize-y"
                placeholder="Your message..."
              />
            </label></div>
            

            <button
              type="submit"
              className="w-full rounded-none bg-[#383E42] py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.45em] text-white hover:text-[#B87333] transition hover:bg-[#2c3134]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
