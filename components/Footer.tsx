'use client'

import Link from 'next/link'
import LocationIcon from './Icons/LocationIcon'
import EnvelopeIcon from './Icons/EnvelopeIcon'
import FacebookIcon from './Icons/FacebookIcon'
import InstagramIcon from './Icons/InstagramIcon'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="">
      <div className="bg-olive text-amber-50 px-6 sm:px-12 py-8 flex flex-col md:flex-row justify-center sm:justify-between gap-10 sm:gap-5">
        <div className="md:w-1/3 flex flex-row justify-center">
          <div className="flex flex-col justify-center fill-amber-50">
            <div aria-hidden="true">
              <LocationIcon />
            </div>
            <span className="hidden">Location: </span>
          </div>
          <p className="ml-2 h-full flex flex-col justify-center text-xl">
            Wellington based
          </p>
        </div>
        <div className="md:w-1/3 text-center flex flex-col justify-center">
          <h2 className="text-3xl">Hollie Ellmers Photography</h2>
        </div>
        <div className="md:w-1/3 flex flex-row justify-center gap-6">
          <a
            href="mailto:hollieellmersphotography@gmail.com"
            className="flex flex-col justify-center"
            target="_blank"
            aria-label="Send email"
          >
            <div
              className="p-2 rounded-full fill-amber-50 hover:bg-amber-50 hover:fill-olive"
              aria-hidden="true"
            >
              <EnvelopeIcon />
            </div>
          </a>
          <a
            href="https://www.facebook.com/HollieWinterPhotography/"
            className="flex flex-col justify-center"
            target="_blank"
            aria-label="Visit Facebook profile"
          >
            <div
              className="p-2 rounded-full fill-amber-50 hover:bg-amber-50 hover:fill-olive"
              aria-hidden="true"
            >
              <FacebookIcon />
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col justify-center"
            target="_blank"
            aria-label="Visit Instagram profile"
          >
            <div
              className="p-2 rounded-full fill-amber-50 hover:bg-amber-50 hover:fill-olive"
              aria-hidden="true"
            >
              <InstagramIcon />
            </div>
          </a>
        </div>
      </div>

      <div className="flex flex-row flex-wrap px-6 sm:px-12 py-2 text-xs bg-amber-50">
        <p>{`All content Copyright © ${currentYear} Hollie Ellmers Photography`}</p>
        <span aria-hidden="true" className="px-2">
          |
        </span>
        <Link className="underline" href="https://shadae-ellmers.com/">
          SITE CREDIT
        </Link>
      </div>
    </footer>
  )
}
