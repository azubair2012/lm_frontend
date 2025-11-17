'use client';

export default function HomeContactPreview() {
  return (
    <section className="py-24">
      <div className="container items-center justify-center mx-auto max-w-5xl px-4" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
            <div className="flex justify-center mb-16">
              <header className="  relative flex flex-col items-start">
              <span
              className="text-[64px] text-black uppercase sm:text-[90px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 600 }}
              >
              Contact
              </span>
              <span
              className="absolute top-10 text-5xl text-[#B87333] right-4 sm:top-16 sm:text-[5.5rem]"
              style={{ fontFamily: 'Southland, serif' }}
              >
              Us
              </span>
              </header>
            </div>
        <div className="flex justify-center gap-12">
          <div className="space-y-8 text-sm leading-7 text-[#383E42]">
            <div className="text-md">
              <h3 className="font-semibold uppercase tracking-[0.2em] text-[#101418]">London Move</h3>
              <p>312 St. Pauls Road</p>
              <p>Islington, London N1 2LF</p>
              <p>United Kingdom</p>
            </div>
            <div className="text-md">
              <h3 className=" font-semibold uppercase tracking-[0.2em] text-[#101418]">Contact</h3>
              <p>
                Phone: <a href="tel:+442072265252" className="hover:text-[#B87333]">0207 226 5252</a>
              </p>
              <p>
                Email: <a href="mailto:admin@london-move.com" className="hover:text-[#B87333]">admin@london-move.com</a>
              </p>
            </div>
            <div className="text-md">
              <h3 className="font-semibold uppercase tracking-[0.2em] text-[#101418]">Hours</h3>
              <p>Monday 9.00am - 6.00pm</p>
              <p>Tuesday 9.00am - 6.00pm</p>
              <p>Wednesday 9.00am - 6.00pm</p>
              <p>Thursday 9.00am - 6.00pm</p>
              <p>Friday 9.00am - 6.00pm</p>
              <p>Saturday 10.00am - 3.00pm</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <form className="space-y-6 text-sm text-[#111518]">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-[#8c8c8c]">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  className="rounded-md border border-[#e5e7eb] bg-[#f6f4f2] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                  placeholder="Jane Smith"
                />
              </label>
              <label className="flex flex-col gap-2 text-[#8c8c8c]">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  className="rounded-md border border-[#e5e7eb] bg-[#f6f4f2] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                  placeholder="jane@email.com"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-[#8c8c8c]">
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                className="rounded-md border border-[#e5e7eb] bg-[#f6f4f2] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                placeholder="Subject"
              />
            </label>

            <label className="flex flex-col gap-2 text-[#8c8c8c]">
              <span>Message</span>
              <textarea
                name="message"
                rows={6}
                className="rounded-md border border-[#e5e7eb] bg-[#f6f4f2] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                placeholder="Your message..."
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-none bg-[#383E42] py-4 text-xs uppercase tracking-[0.45em] text-white hover:text-[#B87333] transition hover:bg-[#2c3134]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
