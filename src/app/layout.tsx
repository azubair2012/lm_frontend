import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rentman Properties - Find Your Perfect Home',
  description: 'Discover amazing properties for rent and sale across the UK. Search, filter, and find your perfect home with our comprehensive property listings.',
  keywords: 'properties, rent, sale, UK, housing, real estate',
  authors: [{ name: 'Rentman Properties' }],
  openGraph: {
    title: 'Rentman Properties - Find Your Perfect Home',
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
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}