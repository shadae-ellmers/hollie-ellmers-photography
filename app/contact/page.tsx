import ContactForm from '@/components/ContactForm'
import PageBanner from '@/components/PageBanner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Hollie Ellmers | Photographer NZ',
  description:
    "Let's create something unforgettable. Contact Wellington photographer Hollie Ellmers to book a session anywhere in New Zealand.",
  openGraph: {
    title: 'Contact | Hollie Ellmers | Photographer NZ',
    description:
      "Let's create something unforgettable. Contact Wellington photographer Hollie Ellmers to book a session anywhere in New Zealand.",
    url: 'https://www.hollieellmers.photography/contact/',
    images: [
      {
        url: '/images/contact-banner.jpg',
      },
    ],
    type: 'website',
  },
}

export default function Contact() {
  return (
    <div>
      <PageBanner
        title="Get in touch"
        imageSrc="/images/contact-banner.jpg"
        imageAlt="A bride and groom smile joyfully as confetti is thrown over them during an outdoor wedding ceremony, surrounded by happy guests. The bride holds a bouquet and the groom wears a light grey suit."
      />
      <style>{'.grecaptcha-badge { visibility: visible; }'}</style>
      <ContactForm />
    </div>
  )
}
