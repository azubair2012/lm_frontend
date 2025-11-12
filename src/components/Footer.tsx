import Link from 'next/link';

const servicesLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Buying', href: '/buying' },
  { label: 'Looking to sell', href: '/looking-to-sell' },
  { label: 'Building & Maintenance', href: '/building-maintenance' },
  { label: 'Property Management', href: '/property-management' },
  { label: 'Project Strategy', href: '/project-strategy' },
];

const aboutLinks = [
  { label: 'About us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Cookie Settings', href: '/cookie-settings' },
];

const resourcesLinks = [
  { label: 'Buyer Guide', href: '/resources/buyer-guide' },
];

export default function Footer() {
  return (
    <footer className="bg-[rgba(56,62,66,0.95)] py-12 text-xs uppercase tracking-[0.25em] text-white sm:text-sm">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:flex-row sm:justify-between">
        <nav className="flex flex-col gap-3">
          <h2 className="text-slate-200">Services</h2>
          <ul className="flex flex-col gap-2 text-[0.7rem] tracking-[0.2em] text-white/80 sm:text-xs">
            {servicesLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="flex flex-col gap-3">
          <h2 className="text-slate-200">About</h2>
          <ul className="flex flex-col gap-2 text-[0.7rem] tracking-[0.2em] text-white/80 sm:text-xs">
            {aboutLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="flex flex-col gap-3">
          <h2 className="text-slate-200">Resources</h2>
          <ul className="flex flex-col gap-2 text-[0.7rem] tracking-[0.2em] text-white/80 sm:text-xs">
            {resourcesLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
