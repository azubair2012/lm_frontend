'use client';

import Image from 'next/image';
import Link from 'next/link';

const SERVICES = [
  {
    label: 'List With Us',
    href: '/looking-to-sell',
    image: 'https://framerusercontent.com/images/R5n4ncJ6fyv3pfuapH1vqqc77rU.jpg?width=1200&height=800',
  },
  {
    label: 'London Office',
    href: '/london-office',
    image: 'https://framerusercontent.com/images/KcnjXmJZmE4ToQ9iR6QxD4cK1M.jpg?width=1200&height=800',
  },
  {
    label: 'International Office',
    href: '/international-office',
    image: 'https://framerusercontent.com/images/UsGXVhdlUwabqfalVDchXAz5j5g.jpg?width=1200&height=800',
  },
  {
    label: 'Neighborhood Guides',
    href: '/resources/buyer-guide',
    image: 'https://framerusercontent.com/images/MB2Ksdg8i3RQIyXgstyr937U4Q.jpg?width=1200&height=800',
  },
  {
    label: 'Home Valuation',
    href: '/valuation',
    image: 'https://framerusercontent.com/images/TVkcVpVQZo5rs4dG1uk7Go3mGW4.jpg?width=1200&height=800',
  },
  {
    label: 'New Developments',
    href: '/international-properties',
    image: 'https://framerusercontent.com/images/DVhExR61wvWUZurPMPfgb1BKNIs.jpg?width=1200&height=800',
  },
];

export default function HomeServicesGrid() {
  return (
    <section className="bg-[url('https://framerusercontent.com/images/T1EU2RtCyYCMN9Gdyqs8fGbCKc.jpg?width=1920&height=1080')] bg-cover bg-center py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {SERVICES.map((service) => (
            <Link key={service.label} href={service.href} className="group">
              <article className="relative overflow-hidden rounded-[24px] border-4 border-black/80 bg-black">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={service.image}
                    alt={service.label}
                    fill
                    className="object-cover grayscale transition group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-lg font-semibold uppercase tracking-[0.35em] text-white" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
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
