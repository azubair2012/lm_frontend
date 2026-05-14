import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'London Move - Find Your Perfect Home',
  description: 'Discover amazing properties for rent and sale across the UK. Search, filter, and find your perfect home with our comprehensive property listings.',
  keywords: 'properties, rent, sale, UK, housing, real estate',
  authors: [{ name: 'London Move' }],
  openGraph: {
    title: 'London Move - Find Your Perfect Home',
    description: 'Discover amazing properties for rent and sale across the UK.',
    type: 'website',
    locale: 'en_GB',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col bg-background">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-[var(--charcoal)] focus:text-white focus:outline-none focus:ring-2 focus:ring-[var(--copper)]"
          >
            Skip to main content
          </a>
          <NavBar />
          <main id="main-content" className="flex-1">
          {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}