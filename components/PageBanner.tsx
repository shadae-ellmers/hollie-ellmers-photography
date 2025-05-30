'use client'

import Image from 'next/image'

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
  return (
    <div className="relative w-full h-[50vh] min-h-[300px] flex items-center justify-center text-amber-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />
        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
          {title}
        </h2>
      </div>
    </div>
  )
}
