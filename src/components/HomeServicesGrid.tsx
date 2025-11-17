'use client';

import Image from 'next/image';
import Link from 'next/link';

const SERVICES = [
  {
    label: 'List With Us',
    href: '/looking-to-sell',
    image: '/s1.webp',
  },
  {
    label: 'London Office',
    href: '/london-office',
    image: '/s1.webp',
  },
  {
    label: 'International Office',
    href: '/international-office',
    image: '/s1.webp',
  },
  {
    label: 'Neighborhood Guides',
    href: '/resources/buyer-guide',
    image: '/s1.webp',
  },
  {
    label: 'Home Valuation',
    href: '/valuation',
    image: '/s1.webp',
  },
  {
    label: 'New Developments',
    href: '/international-properties',
    image: '/s1.webp',
  },
];

export default function HomeServicesGrid() {
  return (
    <section className="py-32 max-w-[1400px] mx-auto" style={{
      backgroundImage: "url('/bg2.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
        }}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {SERVICES.map((service) => (
            <Link key={service.label} href={service.href} className="group">
              <article className="relative overflow-hidden  border-[16px] border-black/80 ">
                <div className="relative aspect-[3/2] w-full border-2 border-white">
                  <Image
                    src={service.image}
                    alt={service.label}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center ">
                  <span className="text-[20px] font-bold tracking-normal bg-black/80 w-full mx-[2px] py-[4px] text-center uppercase text-white" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
                    {service.label}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
