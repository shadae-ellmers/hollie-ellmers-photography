'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import Masonry from 'react-masonry-css'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

type GalleryImage = {
  pathname: string
  url: string
  alt?: string
  caption?: string
}

type MasonryLayoutProps = {
  images: GalleryImage[]
  onImageSettled?: (pathname: string) => void
  priorityCount?: number
}

const MASONRY_BREAKPOINTS = {
  default: 4,
  1024: 3,
  768: 2,
  480: 1,
}

export default function MasonryLayout({
  images,
  onImageSettled,
  priorityCount = 6,
}: MasonryLayoutProps) {
  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {})
    return () => {
      try {
        Fancybox.destroy()
      } catch {}
    }
  }, [images])

  return (
    <Masonry
      breakpointCols={MASONRY_BREAKPOINTS}
      className="masonry-grid"
      columnClassName="masonry-grid__column"
    >
      {images.map((image, idx) => (
        <a
          key={image.pathname}
          href={image.url}
          data-fancybox="gallery"
          {...(image.caption ? { 'data-caption': image.caption } : {})}
          aria-label={image.alt ?? ''}
          className="mb-4 block cursor-zoom-in"
        >
          <Image
            src={image.url}
            alt={image.alt ?? ''}
            width={500}
            height={500}
            className="rounded-sm object-cover"
            loading={idx < priorityCount ? 'eager' : 'lazy'}
            priority={idx < priorityCount}
            decoding="async"
            onLoad={() => onImageSettled?.(image.pathname)}
            onError={() => onImageSettled?.(image.pathname)}
          />
        </a>
      ))}
    </Masonry>
  )
}
