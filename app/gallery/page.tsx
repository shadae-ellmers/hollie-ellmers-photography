'use client'

import PageBanner from '@/components/PageBanner'
import Image from 'next/image'
import all from '../../data/all.json'
import events from '../../data/events.json'
import pets from '../../data/pets.json'
import weddings from '../../data/weddings.json'
import { FormEvent, useState } from 'react'
import Masonry from 'react-masonry-css'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')

  const links = [
    { title: 'All' },
    { title: 'Weddings' },
    { title: 'Pets' },
    { title: 'Events' },
  ]

  const getBreakpointsAndCols = {
    default: 4,
    1024: 3,
    768: 2,
    480: 1,
  }

  const getImages = () => {
    if (activeFilter === 'Weddings') {
      return weddings
    } else if (activeFilter === 'Pets') {
      return pets
    } else if (activeFilter === 'Events') {
      return events
    } else {
      return all
    }
  }

  const launchLightbox = (e: FormEvent) => {
    e.preventDefault()
    Fancybox.bind('[data-fancybox]')
  }

  const convertJsonToElement = () => {
    return getImages().map((item, index: number) => (
      <button
        key={index}
        className="mb-4 cursor-pointer"
        onClick={launchLightbox}
        aria-label={`Open lightbox for image of ${item.alt}`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          layout="intrinsic"
          width={500}
          height={500}
          objectFit="cover"
          className="rounded-sm"
          loading="lazy"
          data-fancybox
          data-caption={item.caption || ''}
        />
      </button>
    ))
  }

  return (
    <div>
      <PageBanner
        title="Gallery"
        imageSrc="/images/wedding-4.jpeg"
        imageAlt="wedding-4"
      />
      <div className="px-6 sm:px-12 py-8 lg:text-lg flex flex-col justify-center text-center bg-olive text-amber-50">
        <div className="flex flex-row flex-wrap justify-center w-full gap-4 self-center pb-8">
          {links.map((item, index: number) => (
            <button
              key={index}
              className="transition text-xl lg:text-2xl cursor-default flex justify-center"
              onClick={() => setActiveFilter(item.title)}
            >
              <div
                className={`px-10 py-1 w-min text-amber-50 cursor-pointer hover:bg-amber-50/80 hover:text-olive rounded-3xl ${
                  activeFilter === item.title
                    ? 'bg-amber-50 text-olive'
                    : 'bg-amber-50/10'
                }`}
              >
                {item.title}
              </div>
            </button>
          ))}
        </div>
        <Masonry
          breakpointCols={getBreakpointsAndCols}
          className="masonry-grid"
          columnClassName="masonry-grid__column"
        >
          {convertJsonToElement()}
        </Masonry>
      </div>
    </div>
  )
}
