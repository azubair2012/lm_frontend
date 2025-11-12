type Testimonial = {
  name: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Jan Casserley',
    quote:
      'Marley gave a fantastic service. He promised to find me a tenant quickly and did plus was really helpful. I have used other agents before and they did not match the service provided by London Move. Thank you.',
  },
  {
    name: 'Louis Carroll',
    quote:
      'London Move was incredible to work with. We spent months finding a place and they were able to quickly sort us with our dream flat and location. Very responsive team and easy to work with.',
  },
  {
    name: 'Bogdan Dance',
    quote:
      'Highly recommend. Quick to respond to any enquiries and professionals all the way through. Martin helped me get a really nice flat quickly and easily.',
  },
  {
    name: 'J. C.',
    quote:
      "We just settled into our new flat, and our experience with London Move was highly positive. From the initial viewing to moving in, everything was completed within a week – probably the smoothest process we've ever had. Our manager was very helpful and patient, efficiently resolving any issues that arose.",
  },
  {
    name: 'Ciara Sullivan',
    quote:
      'We couldn’t have been more pleased with the service provided by London Move throughout the 3 years we rented a property with them. Extremely attentive, professional and communicative. We would highly recommend!',
  },
  {
    name: 'Peter Edwards',
    quote:
      'We rented a flat managed by London Move for 2 years. They were very responsive to our emails and particularly helpful at the start and end of lease. In particular, Fatih was a really good communicator and went above and beyond to assist us several times.',
  },
  {
    name: 'Sue Katz',
    quote:
      'London Move has been efficient, professional, dependable, and knowledgeable. I have worked with them for many years and appreciate how communicative and reliable they have always been. They have provided me with excellent tenants and have effectively taken care of any issues with my property.',
  },
  {
    name: 'Theo Barnes',
    quote:
      'Marley and Fatih helped us during the process of getting our flat and were extremely helpful throughout the whole process, highly recommend!',
  },
  {
    name: 'Tiana Metanovic',
    quote:
      'Lovely experience, I felt that I got all the support, help and expertise that I needed and more. I highly recommend this agency. Especially Marley Martin was exceptionally helpful and supportive!',
  },
  {
    name: 'Khalid Elamin',
    quote:
      'I rented an apartment through London Move in north London, steps went smoothly from viewing to signed contract, staff were friendly and supportive, I would like to specially thank Marley for his great support.',
  },
];

export default function TestimonialsGrid() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3">
      {TESTIMONIALS.map(({ name, quote }, index) => (
        <article
          key={name}
          className="relative flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#ffffff]/70 via-white/60 to-white/30 p-8 shadow-[0_20px_60px_rgba(24,28,32,0.1)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(24,28,32,0.15)]"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-[#B87333]">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full bg-white/80 p-2 shadow-sm">
                <span className="text-[0.65rem] font-semibold text-[#EA4335]">G</span>
                <span className="text-[0.65rem] font-semibold text-[#FBBC05]">o</span>
                <span className="text-[0.65rem] font-semibold text-[#34A853]">o</span>
                <span className="text-[0.65rem] font-semibold text-[#4285F4]">g</span>
                <span className="text-[0.65rem] font-semibold text-[#EA4335]">l</span>
                <span className="text-[0.65rem] font-semibold text-[#34A853]">e</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-[#F59E0B]">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.179 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.083 2.24a1 1 0 00-.364 1.118l1.179 3.63c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.173 2.246c-.784.57-1.838-.197-1.539-1.118l1.179-3.63a1 1 0 00-.364-1.118l-3.083-2.24c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.178-3.63z" />
              </svg>
            ))}
          </div>
          <p className="text-base leading-7 text-[#2B2F32]" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
            “{quote}”
          </p>
          <footer className="mt-auto text-right text-sm font-semibold uppercase tracking-[0.2em] text-[#111518]">
            {name}
          </footer>
        </article>
      ))}
    </section>
  );
}
