import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

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
        <link rel="icon" href="icon.ico" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <style>{'.grecaptcha-badge { visibility: hidden; }'}</style>
        <ReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        >
          <header className="absolute top-0 w-full z-50 bg-amber-50 shadow-md">
            <Navigation />
          </header>
          <main className="text-olive text-md">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ReCaptchaProvider>
      </body>
    </html>
  )
}
