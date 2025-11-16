import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import Image from 'next/image';

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
  { label: 'Buyer Guides', href: '/resources/buyer-guides' },
  { label: 'Seller Guides', href: '/resources/seller-guides' },
  { label: 'Property News', href: '/resources/property-news' },
];

export default function Footer() {
  return (
    <footer className=" text-[#383E42] border-t-2 border-[#383E42] mt-8">
      <div className="mx-auto w-full max-w-6xl px-6 py-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <nav className="flex flex-col gap-3 uppercase tracking-[0.25em]">
            <h2 className="">Services</h2>
            <ul className="flex flex-col gap-4 text-[0.7rem] tracking-[0.2em]  sm:text-xs">
              {servicesLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-[#B87333]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col gap-3 uppercase tracking-[0.25em]">
            <h2 className="">About</h2>
            <ul className="flex flex-col gap-4 text-[0.7rem] tracking-[0.2em] sm:text-xs">
              {aboutLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-[#B87333]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col gap-3 uppercase tracking-[0.25em]">
            <h2 >Resources</h2>
            <ul className="flex flex-col gap-4 text-[0.7rem] tracking-[0.2em] sm:text-xs">
              {resourcesLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-[#B87333]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex items-center justify-between text-[#383E42] border-t border-[#383E42] pt-6 text-xs">
         <div className="flex items-center justify-center gap-3">
          <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer" className="group">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#383E42] text-[#383E42] transition group-hover:border-[#B87333] group-hover:text-[#B87333]">
              <Facebook className="h-5 w-5" />
            </span>
          </a>
          <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="group">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#383E42] text-[#383E42] transition group-hover:border-[#B87333] group-hover:text-[#B87333]">
              <Instagram className="h-5 w-5" />
            </span>
          </a>
          <a aria-label="Twitter" href="https://twitter.com" target="_blank" rel="noreferrer" className="group">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#383E42] text-[#383E42] transition group-hover:border-[#B87333] group-hover:text-[#B87333]">
              <Twitter className="h-5 w-5" />
            </span>
          </a>
          <a aria-label="LinkedIn" href="https://linkedin.com" target="_blank" rel="noreferrer" className="group">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#383E42] text-[#383E42] transition group-hover:border-[#B87333] group-hover:text-[#B87333]">
              <Linkedin className="h-5 w-5" />
            </span>
          </a>
          <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noreferrer" className="group">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#383E42] text-[#383E42] transition group-hover:border-[#B87333] group-hover:text-[#B87333]">
              <Youtube className="h-5 w-5" />
            </span>
          </a>
        </div>
           <div className="flex items-center justify-center gap-4">
            <Link href="https://safeagents.co.uk/" target="_blank" rel="noreferrer" aria-label="Safeagent" className="opacity-80 transition hover:opacity-100">
              <Image src="/regulatory/safeagent.svg" alt="Safeagent" width={90} height={28} className="h-6 w-auto grayscale" />
            </Link>
            <Link href="https://www.clientmoneyprotect.co.uk/" target="_blank" rel="noreferrer" aria-label="Client Money Protect" className="opacity-80 transition hover:opacity-100">
              <Image src="/regulatory/cmp.svg" alt="Client Money Protect" width={90} height={28} className="h-6 w-auto grayscale" />
            </Link>
            <Link href="https://www.propertyredress.co.uk/" target="_blank" rel="noreferrer" aria-label="Property Redress" className="opacity-80 transition hover:opacity-100">
              <Image src="/regulatory/prs.svg" alt="Property Redress" width={90} height={28} className="h-6 w-auto grayscale" />
            </Link>
          </div>
           <div className="text-center">
            © 2025 London Move, All Rights Reserved
            </div>
          </div>
        </div>
    </footer>
  );
}
