'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  {
    label: 'PROPERTIES',
    submenu: [
      { label: 'London Properties', href: '/properties' },
      { label: 'International Homes', href: '/international-properties' },
    ],
  },
  { label: 'SERVICES', href: '/services' },
  {
    label: 'OFFICE',
    submenu: [
      { label: 'London Office', href: '/london-office' },
      { label: 'International Office', href: '/international-office' },
    ],
  },
  { label: 'ABOUT US', href: '/about' },
  { label: 'CONTACT US', href: '/contact' },
];

export default function NavBar() {
  const [logoHover, setLogoHover] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[rgba(56,62,66,0.95)] backdrop-blur-md">
      <nav className="flex max-w-6xl flex-wrap items-center justify-between font-semibold uppercase tracking-[0.3em] text-white sm:gap-10 sm:text-sm">
        <Link
          href="/"
          className="flex items-center gap-4"
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        >
          <Image src="/LMlogoICON.svg" alt="London Move icon" width={100} height={100} priority />
          <Image
            src="/LMlogotext.svg"
            alt="London Move"
            width={200}
            height={30}
            priority
            className="transition"
            style={{
              filter: logoHover
                ? 'brightness(0) saturate(100%) invert(70%) sepia(44%) saturate(748%) hue-rotate(339deg) brightness(85%) contrast(99%)'
                : 'brightness(0) invert(1)',
            }}
          />
        </Link>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-6 sm:gap-10">
          {NAV_ITEMS.map((item) => (
            <NavItemLink key={item.label} item={item} />
          ))}
        </div>
      </nav>
    </header>
  );
}

function NavItemLink({ item }: { item: (typeof NAV_ITEMS)[number] }) {
  const [open, setOpen] = useState(false);

  if (!item.submenu) {
    return (
      <Link href={item.href ?? '/'} className="transition-colors tracking-normal hover:text-[#B87333] font-['Roboto', sans-serif] font-medium text-[16px]">
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="transition-colors tracking-normal hover:text-[#B87333] font-['Roboto', sans-serif] font-medium text-[16px]">{item.label}</button>
      {open && (
        <div className="absolute left-1/2 top-full z-20 flex w-40 -translate-x-1/2 flex-col gap-[2px] bg-white/95 text-center text-[11px] font-regular uppercase tracking-tight text-[#101418] shadow-lg">
          {item.submenu.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-[14px] p-2 bg-[#383E42] tracking-tight text-white transition hover:text-[#B87333]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
