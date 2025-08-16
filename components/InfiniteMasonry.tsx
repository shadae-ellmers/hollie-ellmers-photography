'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import MasonryLayout from '@/components/MasonryLayout'

type GalleryImage = {
  pathname: string
  url: string
  alt?: string
  caption?: string
}

type InfiniteMasonryProps = {
  images: GalleryImage[]
  initialCount?: number
  step?: number
  rootMargin?: string
}

export default function InfiniteMasonry({
  images,
  initialCount = 18,
  step = 12,
  rootMargin = '1000px',
}: InfiniteMasonryProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const isLoadingMoreRef = useRef(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    setVisibleCount(initialCount)
  }, [images, initialCount])

  const visibleImages = useMemo(
    () => images.slice(0, visibleCount),
    [images, visibleCount]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true)
    }, 3000)
    return () => clearTimeout(timer)
  })

  const hasMoreToLoad = visibleCount < images.length

  useEffect(() => {
    if (!hasMoreToLoad) return
    const sentinelEl = sentinelRef.current
    if (!sentinelEl) return
    const onIntersect: IntersectionObserverCallback = (entries) => {
      const firstEntry = entries[0]
      if (!firstEntry?.isIntersecting || isLoadingMoreRef.current) return
      isLoadingMoreRef.current = true
      requestAnimationFrame(() => {
        setVisibleCount((count) => Math.min(count + step, images.length))
        isLoadingMoreRef.current = false
      })
    }
    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin,
      threshold: 0,
    })
    observer.observe(sentinelEl)
    return () => observer.disconnect()
  }, [hasMoreToLoad, images.length, rootMargin, step])

  return (
    <div className="relative flex flex-col items-center gap-8">
      {!imagesLoaded ? (
        <div className="h-full w-full absolute bg-olive">
          <span
            className="w-12 h-12 border-[5px] border-amber-50 border-b-olive rounded-full inline-block animate-spin"
            aria-label="Loading images"
          ></span>
        </div>
      ) : (
        <></>
      )}
      <MasonryLayout images={visibleImages} />
      {hasMoreToLoad && (
        <div ref={sentinelRef} aria-hidden className="h-10 w-full" />
      )}
    </div>
  )
}
