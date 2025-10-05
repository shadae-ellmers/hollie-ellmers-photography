'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import ArrowLeftIcon from './Icons/ArrowLeftIcon'
import ArrowRightIcon from './Icons/ArrowRightIcon'

type CarouselImage = {
  pathname: string
  url: string
  alt?: string
}

type CarouselProps = {
  images: CarouselImage[]
}

export default function Carousel({ images }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="embla overflow-hidden pt-8 pb-16">
      <div className="flex flex-row justify-center mb-8">
        <button
          className="embla__prev fill-olive hover:bg-olive hover:fill-amber-50 focus:bg-olive focus:fill-amber-50 p-3 rounded-full cursor-pointer"
          onClick={scrollPrev}
        >
          <div aria-hidden="true">
            <ArrowLeftIcon />
          </div>
          <span className="hidden">Previous</span>
        </button>
        <h2 className="text-xl lg:text-2xl px-4 flex flex-col justify-center">
          WEDDINGS
        </h2>
        <button
          className="embla__next fill-olive hover:bg-olive hover:fill-amber-50 focus:bg-olive focus:fill-amber-50 p-3 rounded-full cursor-pointer"
          onClick={scrollNext}
        >
          <div aria-hidden="true">
            <ArrowRightIcon />
          </div>
          <span className="hidden">Next</span>
        </button>
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {images.map((image) => {
            return (
              <div
                key={image.pathname}
                className="embla__slide flex-none mx-1 sm:mx-4"
              >
                <div className="relative w-[250px] h-[350px] lg:w-[370px] lg:h-[500px] overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alt ?? ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
