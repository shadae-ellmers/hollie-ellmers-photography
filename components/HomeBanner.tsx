'use client'

import Image from 'next/image'

export default function HomeBanner() {
  return (
    <div className="relative w-full h-[50vh] min-h-[300px] flex items-center justify-center text-amber-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/wedding-1.jpeg"
          alt="wedding-1"
          fill
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />
        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
          Hollie Ellmers Photography
        </h1>
        <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto font-light">
          Elegant, timeless wedding photography that tells your unique love
          story.
        </p>
      </div>
    </div>
  )
}
