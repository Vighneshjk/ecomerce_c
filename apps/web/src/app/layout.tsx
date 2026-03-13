import type { Metadata } from 'next'
import { Cormorant_Garamond, Instrument_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import SearchModal from '@/components/layout/SearchModal'
import Providers from '@/components/providers/Providers'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-display'
})

const sans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans'
})

const mono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: {
    template: '%s | AKELA EYEWEAR',
    default: 'AKELA EYEWEAR | Visionary Eyewear for the Modern Era',
  },
  description: 'Elevate your vision with AKELA. Handcrafted sunglasses, eyeglasses, and cutting-edge virtual try-on technology.',
  metadataBase: new URL('https://akela-eyewear.com'),
  openGraph: {
    title: 'AKELA EYEWEAR',
    description: 'Visionary Eyewear for the Modern Era',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans bg-white text-charcoal-900 selection:bg-brand-200">
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchModal />
        </Providers>
      </body>
    </html>
  )
}
