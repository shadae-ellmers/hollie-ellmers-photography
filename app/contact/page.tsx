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
      <div className="px-6 sm:px-12 py-8 sm:py-16 lg:text-lg lg:max-w-[1000px] w-full flex flex-col justify-centre mx-auto">
        <p>
          Here is some information on how to enquire, or how to contact me
          outside this form.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu.
        </p>
      </div>
      <ContactForm />
    </div>
  )
}
