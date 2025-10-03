'use client'

import ArrowRightIcon from '../Icons/ArrowRightIcon'

export default function OtherService() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <p className="text-left pb-8">
        If you have any enquiries that do not fit within these categories please
        contact me with the details and we can discuss further!
      </p>
      <a
        href="/contact"
        className="group inline-flex items-center text-xl lg:text-2xl text-amber-50 transition-colors duration-300"
      >
        <span className="pr-4 group-hover:text-amber-50/80">Contact me</span>
        <div className="transition-transform duration-300 group-hover:translate-x-3 fill-amber-50 h-full">
          <ArrowRightIcon />
        </div>
      </a>
    </div>
  )
}
