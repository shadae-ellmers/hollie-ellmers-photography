'use client'

import ArrowRightIcon from './ArrowRightIcon'

export default function OtherService() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <p className="text-left pb-8">
        Looking for a different kind of shoot? Reach out with some details.
      </p>
      <a
        href="/contact"
        className="group inline-flex items-center text-xl lg:text-2xl text-amber-50 transition-colors duration-300"
      >
        <span className="pr-4 group-hover:text-amber-50/80">Contact me</span>
        <div className="transition-transform duration-300 group-hover:translate-x-1 fill-amber-50 h-full">
          <ArrowRightIcon />
        </div>
      </a>
    </div>
  )
}
