import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'PROPERTIES', href: '/properties' },
  { label: 'SERVICES', href: '/services' },
  { label: 'OFFICE', href: '/office' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'CONTACT US', href: '/contact' },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[rgba(56,62,66,0.95)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-white sm:gap-10 sm:text-sm">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-200">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
