'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[rgba(56,62,66,0.95)] backdrop-blur-md py-4">
      <nav className="mx-auto flex w-full px-4 sm:px-8 md:px-[6rem] items-center justify-between font-semibold uppercase tracking-[0.3em] text-white sm:text-sm">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-4"
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        >
          <Image src="/LM_ICON.png" alt="London Move icon" width={20} height={20} priority />
          <Image
            src="/logo_white.png"
            alt="London Move"
            width={200}
            height={10}
            priority
            className="hidden sm:block transition-[filter] duration-900 ease-in-out"
            style={{
              willChange: 'filter',
              filter: logoHover
                ? 'brightness(0) saturate(100%) invert(70%) sepia(44%) saturate(748%) hue-rotate(339deg) brightness(85%) contrast(99%)'
                : 'brightness(0) invert(1)',
            }}
          />
          <Image
            src="/logo_white.png"
            alt="London Move"
            width={150}
            height={10}
            priority
            className="block sm:hidden transition-[filter] duration-900 ease-in-out"
            style={{
              willChange: 'filter',
              filter: logoHover
                ? 'brightness(0) saturate(100%) invert(70%) sepia(44%) saturate(748%) hue-rotate(339deg) brightness(85%) contrast(99%)'
                : 'brightness(0) invert(1)',
            }}
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex ml-auto flex-1 items-center justify-end gap-6 xl:gap-16">
          {NAV_ITEMS.map((item) => (
            <NavItemLink key={item.label} item={item} />
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[rgba(56,62,66,0.98)]">
          <div className="flex flex-col px-4 py-4 gap-4">
            {NAV_ITEMS.map((item) => (
              <MobileNavItem key={item.label} item={item} onClose={() => setMobileMenuOpen(false)} />
            ))}
          </div>
        </div>
      )}
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
      <div
        className="absolute right-[-46px] top-full pt-[26px] z-20 flex w-[180px] -translate-x-1/2 flex-col gap-[2px] text-center text-[11px] font-regular uppercase tracking-tight text-[#101418] shadow-lg transition-all duration-200 ease-out"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(-6px)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {item.submenu.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[14px] py-4 bg-[rgba(56,62,66,0.95)] tracking-tight text-white transition hover:text-[#B87333]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileNavItem({ item, onClose }: { item: (typeof NAV_ITEMS)[number]; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.submenu) {
    return (
      <Link 
        href={item.href ?? '/'} 
        onClick={onClose}
        className="text-white transition-colors tracking-normal hover:text-[#B87333] font-['Roboto', sans-serif] font-medium text-[16px] py-2"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between text-white transition-colors tracking-normal hover:text-[#B87333] font-['Roboto', sans-serif] font-medium text-[16px] py-2 text-left"
      >
        {item.label}
        <span className={`text-white transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="flex flex-col pl-4 gap-2 mt-2">
          {item.submenu.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-white text-[14px] py-2 transition hover:text-[#B87333]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
