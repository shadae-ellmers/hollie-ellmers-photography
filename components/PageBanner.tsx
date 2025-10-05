'use client'

import Image from 'next/image'
import { useIsMobile } from './Helpers'

type PageBannerProps = {
  title: string
  imageSrc: string
  imageAlt: string
}

export default function PageBanner({
  title,
  imageSrc,
  imageAlt,
}: PageBannerProps) {
  const isMobile = useIsMobile()

  return (
    <div className="relative w-full h-[50vh] min-h-[300px] flex items-center justify-center text-amber-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 text-amber-50">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-black/40 blur-2xl rounded-md z-0"></div>
          <div className="relative z-10 px-4 py-2 bg-transparent">
            {isMobile ? (
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                {title}
              </h2>
            ) : (
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                {title}
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
