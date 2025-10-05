import FAQHolder from '@/components/FAQHolder'
import PageBanner from '@/components/PageBanner'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Hollie Ellmers | Wellington & NZ Photographer',
  description:
    "I'm Hollie, a Wellington photographer passionate about creating authentic, artistic images. I travel across New Zealand to capture your special moments.",
  openGraph: {
    title: 'About Hollie Ellmers | Wellington & NZ Photographer',
    description:
      "I'm Hollie, a Wellington photographer passionate about creating authentic, artistic images. I travel across New Zealand to capture your special moments.",
    url: 'https://www.hollieellmers.photography/about/',
    images: [
      {
        url: '...',
      },
    ],
    type: 'website',
  },
}

export default function About() {
  const getAge = () => {
    const today = new Date()
    const birthDate = new Date('2001-07-07')

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const dayDiff = today.getDate() - birthDate.getDate()

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--
    }

    return age
  }

  return (
    <div>
      <PageBanner
        title="About me"
        imageSrc="/images/about-banner.jpg"
        imageAlt="A calm coastal scene at sunset with gentle waves and a hillside on the right."
      />
      <div className="px-6 sm:px-12 py-8 sm:py-16 lg:text-lg lg:max-w-[1000px] w-full flex flex-col justify-centre mx-auto">
        <div className="flex flex-row flex-wrap sm:flex-nowrap">
          <div className="flex flex-row justify-center w-full sm:block sm:w-2/5">
            <div className="relative w-full max-w-[200px] sm:max-w-[300px] h-auto overflow-hidden sm:float-right">
              <Image
                src="/images/profile.jpg"
                alt="Photographer with long brown hair in a black outfit, holding a Canon camera against a dark background."
                className=""
                width={500}
                height={500}
                objectFit="contain"
              />
            </div>
          </div>
          <p className="sm:w-3/5 sm:pl-8 lg:pl-12 pt-8 sm:pt-0 relative">
            {`My name is Hollie. I'm ${getAge()} years old, a self-taught photographer
            and I began my own photography business a few years ago. I never had
            a clue what I wanted to be growing up. I thought I was destined to
            work jobs I hated until a few years ago I bought my first camera.
            Since then I have struggled to put it down and I have finally found
            what I want to do in life. I found my love for photography. I strive
            to grow and better my business so I can earn a living doing
            something I truly love.`}
          </p>
        </div>
        {/* faqs */}
        <FAQHolder />
      </div>
    </div>
  )
}
