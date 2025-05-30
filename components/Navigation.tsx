'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import HamburgerIcon from './HamburgerIcon'
import CloseIcon from './CloseIcon'
import ArrowRightIcon from './ArrowRightIcon'
import useIsMobile from './useIsMobile'

const links = [
  { title: 'Home', link: '/' },
  { title: 'About', link: '/about' },
  { title: 'Services', link: '/services' },
  { title: 'Gallery', link: '/gallery' },
  { title: 'Contact', link: '/contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const toggleMenu = () => setIsOpen(!isOpen)

  const route = usePathname()
  const isHomePage = route === '/'

  return (
    <nav className="bg-transparent absolute w-full z-10 py-4 px-6 flex flex-row-reverse">
      <div className="flex justify-center md:w-full">
        <div className="flex flex-col justify-center">
          {/* Navbar Menu (Desktop) */}
          <div
            className="hidden md:flex md:flex-row md:flex-wrap lg:flex-nowrap justify-evenly w-full max-w-[1200px] gap-2"
            aria-hidden={isMobile ? 'true' : 'false'}
          >
            {links.map((item, index: number) => (
              <Link
                key={index}
                href={`${item.link}`}
                className="text-amber-50 transition text-2xl lg:w-1/5 cursor-default flex flex-row justify-center"
              >
                <div className="px-10 py-1 w-min border-amber-50/30 cursor-pointer hover:bg-amber-50/80 hover:text-olive rounded-3xl">
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {!isOpen && isMobile && (
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-amber-50 hover:bg-olive p-2 rounded-full cursor-pointer"
              aria-label="Open menu menu"
            >
              <HamburgerIcon />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu (Conditional Rendering) */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden bg-olive absolute top-0 left-0 w-full space-y-4 py-20`}
        aria-hidden={isOpen ? 'false' : 'true'}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-6 text-xl font-bold text-amber-50 hover:text-olive p-2 rounded-full hover:bg-amber-50 cursor-pointer"
          aria-label="Close menu menu"
        >
          <CloseIcon />
        </button>
        <div className="flex flex-col items-center gap-15">
          {links.map((item, index: number) => (
            <div
              className="flex flex-row flex-nowrap gap-4 group cursor-pointer"
              key={index}
              onClick={() => setIsOpen(false)}
            >
              <Link
                href={`${item.link}`}
                className="text-amber-50 text-xl transition flex flex-col justify-center"
              >
                {item.title}
              </Link>
              <div className="fill-amber-50 transition-transform duration-300 group-hover:translate-x-3">
                <ArrowRightIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
