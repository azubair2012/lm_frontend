'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

type NavSubLinkLeaf = { label: string; href: string };
type NavSubLinkNested = { label: string; submenu: NavSubLinkLeaf[] };
type NavSubLink = NavSubLinkLeaf | NavSubLinkNested;

function isNavSubNested(link: NavSubLink): link is NavSubLinkNested {
  return 'submenu' in link;
}

type NavItem =
  | { label: string; href: string }
  | { label: string; submenu: NavSubLink[] };

const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '/' },
  {
    label: 'PROPERTIES',
    submenu: [
      {
        label: 'London Properties',
        submenu: [
          { label: 'To Let', href: '/properties' },
          { label: 'For Sale', href: '/sale' },
        ],
      },
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
    <header className="sticky top-0 z-[9999] w-full bg-[rgba(56,62,66,0.95)] backdrop-blur-md py-4">
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

function DesktopSubmenuLink({
  link,
  mainMenuOpen,
  onNestedOpenChange,
  siblingNestedOpen,
}: {
  link: NavSubLink;
  mainMenuOpen: boolean;
  onNestedOpenChange?: (open: boolean) => void;
  siblingNestedOpen?: boolean;
}) {
  const [nestedOpen, setNestedOpen] = useState(false);

  useEffect(() => {
    if (!mainMenuOpen) {
      setNestedOpen(false);
    }
  }, [mainMenuOpen]);

  if (!isNavSubNested(link)) {
    const hidden = Boolean(siblingNestedOpen);
    return (
      <div
        aria-hidden={hidden}
        className={`overflow-hidden transition-[max-height,opacity] duration-150 ease-out ${
          hidden ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-40 opacity-100'
        }`}
      >
        <Link
          href={link.href}
          tabIndex={hidden ? -1 : undefined}
          className="text-[14px] py-4 bg-[rgba(56,62,66,0.95)] tracking-tight text-white transition hover:text-[#B87333] block"
        >
          {link.label}
        </Link>
      </div>
    );
  }

  const setNested = (next: boolean) => {
    setNestedOpen(next);
    onNestedOpenChange?.(next);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setNested(true)}
      onMouseLeave={() => setNested(false)}
    >
      <div
        className="text-[14px] py-4 bg-[rgba(56,62,66,0.95)] tracking-tight text-white transition hover:text-[#B87333] cursor-default"
        aria-expanded={nestedOpen}
      >
        {link.label}
      </div>
      <div
        className="absolute left-full top-0 z-30 flex w-[180px] flex-col gap-[2px] pl-[2px] text-center uppercase tracking-tight shadow-lg transition-all duration-200 ease-out"
        style={{
          opacity: nestedOpen ? 1 : 0,
          transform: nestedOpen ? 'translateX(0)' : 'translateX(-6px)',
          pointerEvents: nestedOpen ? 'auto' : 'none',
        }}
      >
        {link.submenu.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="text-[14px] py-4 bg-[rgba(56,62,66,0.95)] tracking-tight text-white transition hover:text-[#B87333]"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function NavItemLink({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const [nestedFlyoutOpen, setNestedFlyoutOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setNestedFlyoutOpen(false);
    }
  }, [open]);

  if (!('submenu' in item)) {
    return (
      <Link
        href={item.href}
        className="transition-colors tracking-normal hover:text-[#B87333] font-['Roboto', sans-serif] font-medium text-[16px]"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setNestedFlyoutOpen(false);
      }}
    >
      <button
        type="button"
        className="transition-colors tracking-normal hover:text-[#B87333] font-['Roboto', sans-serif] font-medium text-[16px]"
      >
        {item.label}
      </button>
      <div
        className="absolute right-[-46px] top-full pt-[26px] z-20 flex w-[180px] -translate-x-1/2 flex-col gap-[2px] text-center text-[11px] font-regular uppercase tracking-tight text-[#101418] shadow-lg transition-all duration-200 ease-out"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(-6px)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {item.submenu.map((link) => (
          <DesktopSubmenuLink
            key={isNavSubNested(link) ? link.label : link.href}
            link={link}
            mainMenuOpen={open}
            onNestedOpenChange={isNavSubNested(link) ? setNestedFlyoutOpen : undefined}
            siblingNestedOpen={!isNavSubNested(link) ? nestedFlyoutOpen : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function MobileSubmenuLink({
  link,
  onClose,
}: {
  link: NavSubLink;
  onClose: () => void;
}) {
  const [nestedOpen, setNestedOpen] = useState(false);

  if (!isNavSubNested(link)) {
    return (
      <Link
        href={link.href}
        onClick={onClose}
        className="text-white text-[14px] py-2 transition hover:text-[#B87333]"
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setNestedOpen(!nestedOpen)}
        className="flex items-center justify-between text-white text-[14px] py-2 text-left transition hover:text-[#B87333]"
      >
        {link.label}
        <span className={`text-white transition-transform ${nestedOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {nestedOpen && (
        <div className="flex flex-col pl-4 gap-2 mt-1">
          {link.submenu.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="text-white text-[13px] py-2 transition hover:text-[#B87333]"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  if (!('submenu' in item)) {
    return (
      <Link
        href={item.href}
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
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between text-white transition-colors tracking-normal hover:text-[#B87333] font-['Roboto', sans-serif] font-medium text-[16px] py-2 text-left"
      >
        {item.label}
        <span className={`text-white transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="flex flex-col pl-4 gap-2 mt-2">
          {item.submenu.map((link) => (
            <MobileSubmenuLink key={isNavSubNested(link) ? link.label : link.href} link={link} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}
