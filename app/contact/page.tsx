'use client'

import ContactForm from '@/components/ContactForm'
import PageBanner from '@/components/PageBanner'

export default function Contact() {
  return (
    <div>
      <PageBanner
        title="Get in touch"
        imageSrc="/images/wedding-1.jpeg"
        imageAlt="wedding-1"
      />
      <style>{'.grecaptcha-badge { visibility: visible; }'}</style>
      <div className="px-6 sm:px-12 py-8 lg:text-lg">
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
