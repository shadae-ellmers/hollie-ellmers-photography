'use client'

import Link from 'next/link'
import LocationIcon from './LocationIcon'
import EnvelopeIcon from './EnvelopeIcon'
import FacebookIcon from './FacebookIcon'
import InstagramIcon from './InstagramIcon'

export default function Footer() {
  return (
    <footer className="">
      <div className="bg-olive text-amber-50 px-6 sm:px-12 py-8 flex flex-col sm:flex-row justify-center sm:justify-between gap-10 sm:gap-5">
        <div className="md:w-1/3 flex flex-row justify-center">
          <div className="flex flex-col justify-center fill-amber-50">
            <LocationIcon />
          </div>
          <p className="ml-2 h-full flex flex-col justify-center text-xl">
            Wellington
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
          >
            <div className="p-2 rounded-full fill-amber-50 hover:bg-amber-50 hover:fill-olive">
              <EnvelopeIcon />
            </div>
          </a>
          <a
            href="https://www.facebook.com/HollieWinterPhotography/"
            className="flex flex-col justify-center"
            target="_blank"
          >
            <div className="p-2 rounded-full fill-amber-50 hover:bg-amber-50 hover:fill-olive">
              <FacebookIcon />
            </div>
          </a>
          <a href="#" className="flex flex-col justify-center" target="_blank">
            <div className="p-2 rounded-full fill-amber-50 hover:bg-amber-50 hover:fill-olive">
              <InstagramIcon />
            </div>
          </a>
        </div>
      </div>

      <div className="flex flex-row flex-wrap px-6 sm:px-12 py-2 text-xs bg-amber-50">
        <Link className="underline" href="/terms-and-conditions">
          TERMS & CONDITIONS
        </Link>
        <span aria-hidden="true" className="px-2">
          |
        </span>
        <Link className="underline" href="/privacy-policy">
          PRIVACY POLICY
        </Link>
        <span aria-hidden="true" className="px-2">
          |
        </span>
        <Link className="underline" href="/site-credit">
          SITE CREDIT
        </Link>
      </div>
    </footer>
  )
}
