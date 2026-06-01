'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type TestimonialSlide = {
  id: number;
  quote: string;
  name: string;
};

const TESTIMONIAL_SLIDES: TestimonialSlide[] = [
  {
    id: 1,
    quote:
      "Marley gave a fantastic service. He promised to find me a tenant quickly and did plus was really helpful. I have used other agents before and they did not match the service provided by London Move. Thank you.",
    name: "Jan Casserley",
  },
  {
    id: 2,
    quote:
      "London Move was incredible to work with. We spent months finding a place and they were able to quickly sort us with our dream flat and location. Very responsive team and easy to work with.",
    name: "Louis Carroll",
  },
  {
    id: 3,
    quote:
      "Highly recommend. Quick to respond to any enquiries and professionals all the way through. Martin helped me get a really nice flat quickly and easily.",
    name: "Bogdan Dance",
  },
  {
    id: 4,
    quote:
      "We just settled into our new flat, and our experience with London Move was highly positive. From the initial viewing to moving in, everything was completed within a week – probably the smoothest process we've ever had. Our manager was very helpful and patient, efficiently resolving any issues that arose.",
    name: "J. C.",
  },
  {
    id: 5,
    quote:
      "We couldn't have been more pleased with the service provided by London Move throughout the 3 years we renting a property with them. Extremely attentive, professional and communicative. We would highly recommend!",
    name: "Ciara Sullivan",
  },
  {
    id: 6,
    quote:
      "We rented a flat managed by London Move for 2 years. They were very responsive to our emails and particularly helpful at the start and end of lease. In particular, Fatih was a really good communicator and went above and beyond to assist us several times.",
    name: "Peter Edwards",
  },
  {
    id: 7,
    quote:
      "London Move has been efficient, professional, dependable, and knowledgeable. I have worked with them for many years and appreciate how communicative and reliable they have always been. They have provided me with excellent tenants and have effectively taken care of any issues with my property.",
    name: "Sue Katz",
  },
  {
    id: 8,
    quote:
      "Marley and Fatih helped us during the process of getting our flat and were extremely helpful throughout the whole process, highly recommend!",
    name: "Theo Barnes",
  },
  {
    id: 9,
    quote:
      "Lovely experience, I felt that I got all the support, help and expertise that I needed and more. I highly recommend this agency. Especially Marley Martin was exceptionally helpful and supportive!",
    name: "Tiana Metanovic",
  },
  {
    id: 10,
    quote:
      "I rented an apartment through London Move in north London, steps went smoothly from viewing to signed contract, staff were friendly and supportive, I would like to specially thank Marley for his great support.",
    name: "Khalid Elamin",
  },
];

const SLIDE_DURATION = 6000;

export default function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIAL_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      <div
        className="flex justify-center items-center py-8 sm:py-12 px-4 max-w-[1400px] mx-auto min-h-[400px] sm:h-[500px]"
        style={{
          backgroundImage: "url('/bg1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-50 flex flex-col items-center text-center px-4">
          <span
            className="text-[60px] text-black uppercase md:text-[80px]"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}
          >
            WHAT OUR
          </span>
          <span
            className="absolute top-12 text-[42px] text-[#B87333] md:top-16 md:text-7xl"
            style={{ fontFamily: 'Southland, serif' }}
          >
            Clients Are Saying
          </span>
          <div className="w-full max-w-[1200px] mt-6 sm:mt-8 text-sm sm:text-base md:text-[18px] px-4 relative min-h-[220px] overflow-hidden">
            {TESTIMONIAL_SLIDES.map((slide, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out pointer-events-none ${
                    isActive
                      ? 'translate-x-0 opacity-100'
                      : isPast
                        ? '-translate-x-full opacity-0'
                        : 'translate-x-full opacity-0'
                  }`}
                >
                  <span>
                    {slide.quote}
                    <br />
                    <br />-{slide.name}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center mt-6 sm:mb-4">
            <Link
              href="/testimonial"
              className="bg-[#383E42] text-xs sm:text-sm hover:text-[#B87333] text-white rounded-none text-center font-semibold h-[45px] sm:h-[50px] w-full max-w-[280px] px-4 flex items-center justify-center"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              SEE MORE TESTIMONIALS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
