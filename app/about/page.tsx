'use client'

import FAQHolder from '@/components/FAQHolder'
import PageBanner from '@/components/PageBanner'
import Image from 'next/image'

export default function About() {
  return (
    <div>
      <PageBanner
        title="About me"
        imageSrc="/images/wedding-1.jpeg"
        imageAlt="wedding-1"
      />
      <div className="px-6 sm:px-12 py-8 sm:py-16 lg:text-lg lg:max-w-[1000px] w-full flex flex-col justify-centre mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-row justify-center md:block md:w-2/5">
            <div className="relative rounded-full w-auto max-w-[300px] md:max-w-[500px] aspect-square h-auto overflow-hidden md:float-right">
              <Image
                src="/images/profile.jpg"
                alt=""
                className=""
                width={500}
                height={500}
                objectFit="contain"
              />
            </div>
          </div>
          <p className="md:w-3/5 md:pl-8 lg:pl-12 pt-8 md:pt-0 relative">
            My name is Hollie. I&apos;m 22 years old, a self-taught photographer
            and I began my own photography business a few years ago. I never had
            a clue what I wanted to be growing up. I thought I was destined to
            work jobs I hated until a few years ago I bought my first camera.
            Since then I have struggled to put it down and I have finally found
            what I want to do in life. I found my love for photography. I strive
            to grow and better my business so I can earn a living doing
            something I truly love.
          </p>
        </div>
        {/* faqs */}
        <FAQHolder />
      </div>
    </div>
  )
}
