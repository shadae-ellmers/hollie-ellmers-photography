import Carousel from '@/components/Carousel'
import PageBanner from '@/components/PageBanner'
import { Metadata } from 'next'
import Image from 'next/image'
import { list } from '@vercel/blob'

const images = [
  'DANA+ANDREW-019.jpg',
  'KAYLA+CHRIS-04.jpg',
  'TYLA&ISAAC-450.jpg',
  'MATERNITY-01(1).jpg',
]

const imagesAlt = [
  "Three pairs of elegant women's shoes and a jewelled necklace are arranged on a beige carpet in front of white gift bags filled with flower bouquets and name tags. Light streams in from the background.",
  'A couple kneels in a sunlit park, smiling at a black dog between them.',
  'Bride and groom holding hands on a wooden bridge by a rustic shed and pond, surrounded by greenery.',
  'Smiling pregnant woman in a black dress stands by rocky shore with wind blowing her hair.',
]

const IMAGE_FILE_PATTERN = /\.(jpe?g|png|gif|webp|avif|svg|tiff?)$/i
const BASE_PREFIX = 'carousel/'

export const metadata: Metadata = {
  title: 'Hollie Ellmers | Wellington & NZ Photographer',
  description:
    'Wellington-based photographer Hollie Ellmers capturing weddings, portraits, and events across New Zealand. Timeless, creative photography for your story.',
  openGraph: {
    title: 'Hollie Ellmers | Wellington & NZ Photographer',
    description:
      'Wellington-based photographer Hollie Ellmers capturing weddings, portraits, and events across New Zealand. Timeless, creative photography for your story.',
    url: 'https://www.hollieellmers.photography/',
    images: [
      {
        url: '/images/home-banner.jpg',
      },
    ],
    type: 'website',
  },
}

type MetadataMap = Record<string, { alt?: string }>

export default async function Home() {
  const { blobs: allBlobs } = await list({ prefix: BASE_PREFIX })

  const allImageBlobs = allBlobs.filter((blob) =>
    IMAGE_FILE_PATTERN.test(blob.pathname)
  )

  let metadataMap: MetadataMap = {}

  const metadataBlob = allBlobs.find(
    (blob) => blob.pathname === `${BASE_PREFIX}metadataCarousel.json`
  )
  if (metadataBlob?.url) {
    try {
      const response = await fetch(metadataBlob.url, {
        next: { revalidate: 300 },
      })
      if (response.ok) {
        metadataMap = (await response.json()) as MetadataMap
      }
    } catch {}
  }

  const enrichedImages = allImageBlobs.map((image) => ({
    ...image,
    alt: metadataMap[image.pathname]?.alt ?? '',
  }))

  return (
    <div>
      <PageBanner
        title="Hollie Ellmers Photography"
        imageSrc="/images/home-banner.jpg"
        imageAlt="Bride and groom kiss by a rustic wooden cabin next to a pond and lush greenery."
      />

      {/* Block one: content */}
      <div className="px-6 sm:px-12 py-8 lg:text-lg">
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu.
        </p>
      </div>

      {/* Block two: portrait image carousel */}
      <Carousel images={enrichedImages} />

      {/* Block three: testimony */}
      <div className="px-6 sm:px-12 py-8 bg-olive text-amber-50 text-center flex flex-col justify-center items-center">
        <p className="lg:text-lg lg:max-w-3/4">
          Honestly Hollie has such a good eye and is so amazing to work with!
          She made me and my fiancé feel so comfortable during our first shoot,
          cannot wait for her to shoot our wedding! Would highly recommend her
          she&apos;s so fun and creative. She really knows how to guide you to
          get the best photos and experience.
        </p>
        <p className="mt-4 lg:max-w-3/4">- Tyla Whatarua</p>
      </div>

      {/* Block four: landscape image grid */}
      <div className="w-full px-6 sm:px-12 py-16 flex flex-row justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1500px]">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-[300px] sm:h-[300px] md:h-[250px] lg:h-[300px] xl:h-[350px] overflow-hidden"
            >
              <Image
                src={`/images/${img}`}
                alt={imagesAlt[index]}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
