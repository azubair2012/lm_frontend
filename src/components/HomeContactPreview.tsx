'use client';

import { useState } from 'react';

interface HeaderConfig {
  firstLine: string;
  secondLine: string;
}

interface HomeContactPreviewProps {
  header?: HeaderConfig | null;
  formType?: 'valuation' | 'general'; // default: 'general'
}

export default function HomeContactPreview({ header, formType = 'general' }: HomeContactPreviewProps = {}) {
  // Default header if not provided
  const defaultHeader: HeaderConfig = { firstLine: 'Contact', secondLine: 'Us' };
  const displayHeader = header !== null ? (header || defaultHeader) : null;

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultSubject = formType === 'valuation' ? 'Valuation Request' : 'General Enquiry';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, formType }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-12 md:py-24 px-4">
      <div className="container items-center justify-center mx-auto max-w-5xl" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
            {displayHeader && (
            <div className="flex justify-center mb-8 sm:mb-12 md:mb-16">
              <header className="relative flex flex-col items-start">
              <span
              className="text-[60px] text-black uppercase md:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}
              >
              {displayHeader.firstLine}
              </span>
              <span
              className="absolute top-12 text-[48px] text-[#B87333] md:top-16 md:text-7xl left-[88px] md:left-0"
              style={{ fontFamily: 'Southland, serif' }}
              >
              {displayHeader.secondLine}
              </span>
              </header>
            </div>
            )}
        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-12 text-center md:text-start">
          <div className="order-2 lg:order-1 space-y-6 sm:space-y-8 text-sm sm:text-base leading-7 text-[#383E42] w-full lg:w-auto">
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
              <p className="text-sm sm:text-base">Saturday 10.00am - 4.00pm</p>
              <p className="text-sm sm:text-base">Sunday: Closed</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="order-1 lg:order-2 space-y-4 sm:space-y-6 text-sm text-[#111518] w-full lg:w-auto lg:min-w-[400px]">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 text-start">
              <label className="flex flex-col gap-2 text-[#8c8c8c]">
                <span className="text-sm">Name</span>
                <input
                  type="text"
                  name="name"
                  className="rounded-md border border-[#cfd4db] bg-[#f6f4f2] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                  placeholder="Jane Smith"
                />
              </label>
              <label className="flex flex-col gap-2 text-[#8c8c8c]">
                <span className="text-sm">Email</span>
                <input
                  type="email"
                  name="email"
                  className="rounded-md border border-[#cfd4db] bg-[#f6f4f2] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
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
                defaultValue={defaultSubject}
                className="rounded-md border border-[#cfd4db] bg-[#f6f4f2] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333]"
                placeholder="Subject"
              />
            </label>

            <label className="flex flex-col gap-2 text-[#8c8c8c]">
              <span className="text-sm">Message</span>
              <textarea
                name="message"
                rows={6}
                className="rounded-md border border-[#cfd4db] bg-[#f6f4f2] px-4 py-3 text-sm text-[#383E42] outline-none transition focus:border-[#B87333] resize-y"
                placeholder="Your message..."
              />
            </label></div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-none bg-[#383E42] py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.45em] text-white hover:text-[#B87333] transition hover:bg-[#2c3134] disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Submit'}
            </button>
          </form>

          {success && (
            <div className="order-1 lg:order-2 w-full lg:min-w-[400px] py-12 text-center">
              <p className="text-lg text-[#383E42]">Thank you! We'll be in touch soon.</p>
            </div>
          )}

          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
        </div>
      </div>
    </section>
  );
}