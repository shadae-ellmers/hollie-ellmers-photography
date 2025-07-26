import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hollie Ellmers Photography',
  description: 'TBC',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📸</text></svg>"
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <style>{'.grecaptcha-badge { visibility: hidden; }'}</style>
        <header className="absolute top-0 w-full z-50 bg-amber-50 shadow-md">
          <Navigation />
        </header>
        <main className="text-olive text-md">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
