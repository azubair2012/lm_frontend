'use client';

export default function HomeContactPreview() {
  return (
    <section className="bg-[#f6f4f2] py-24">
      <div className="container mx-auto max-w-5xl px-4" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8 text-sm leading-7 text-[#383E42]">
            <div className="space-y-3">
              <h2
                className="text-[56px] uppercase tracking-[0.3em] text-[#101418] sm:text-[64px]"
                style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700 }}
              >
                Contact Us
              </h2>
              <div className="h-px w-24 bg-[#B87333]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#101418]">London Move</h3>
              <p>312 St. Pauls Road</p>
              <p>Islington, London N1 2LF</p>
              <p>United Kingdom</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#101418]">Contact</h3>
              <p>
                Phone: <a href="tel:+442072265252" className="hover:text-[#B87333]">0207 226 5252</a>
              </p>
              <p>
                Email: <a href="mailto:admin@london-move.com" className="hover:text-[#B87333]">admin@london-move.com</a>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#101418]">Hours</h3>
              <p>Monday 9.00am - 6.00pm</p>
              <p>Tuesday 9.00am - 6.00pm</p>
              <p>Wednesday 9.00am - 6.00pm</p>
              <p>Thursday 9.00am - 6.00pm</p>
              <p>Friday 9.00am - 6.00pm</p>
              <p>Saturday 10.00am - 3.00pm</p>
            </div>
          </div>

          <form className="space-y-6 text-sm text-[#111518]">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  className="rounded-md border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                  placeholder="Jane Smith"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  className="rounded-md border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                  placeholder="jane@email.com"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                className="rounded-md border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                placeholder="Subject"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span>Message</span>
              <textarea
                name="message"
                rows={6}
                className="rounded-md border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                placeholder="Your message..."
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-none bg-[#383E42] py-4 text-xs uppercase tracking-[0.45em] text-white transition hover:bg-[#2c3134]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
