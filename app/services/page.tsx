'use client'

import EventsService from '@/components/EventsService'
import FamilyService from '@/components/FamilyService'
import OtherService from '@/components/OtherService'
import PageBanner from '@/components/PageBanner'
import WeddingsService from '@/components/WeddingsService'
import { useState } from 'react'

const services = ['Weddings', 'Family', 'Events', 'Other']

export default function Services() {
  const [displayDropdown, setDisplayDropdown] = useState(false)
  const [activeService, setActiveService] = useState(0)

  const displayDetails = (index: number) => {
    if (displayDropdown === true) {
      if (activeService === index + 1) {
        setDisplayDropdown(!displayDropdown)
        setActiveService(0)
      } else {
        setActiveService(index + 1)
      }
    } else {
      setDisplayDropdown(!displayDropdown)
      setActiveService(index + 1)
    }
  }

  return (
    <div>
      <PageBanner
        title="Services"
        imageSrc="/images/wedding-5.jpeg"
        imageAlt="wedding-5"
      />
      <div className="px-6 sm:px-12 py-8 lg:text-lg flex flex-col justify-center text-center bg-olive text-amber-50">
        <div className="flex flex-row flex-wrap justify-center w-full gap-4 self-center pb-8">
          {services.map((title: string, index: number) => {
            return (
              <button
                onClick={() => displayDetails(index)}
                key={index}
                className="transition text-xl lg:text-2xl cursor-default flex justify-center"
              >
                <div
                  className={`px-10 py-1 w-min text-amber-50  cursor-pointer hover:bg-amber-50/80 hover:text-olive rounded-3xl ${
                    activeService === index + 1
                      ? 'bg-amber-50 text-olive'
                      : 'bg-amber-50/10'
                  }`}
                >
                  {title}
                </div>
              </button>
            )
          })}
        </div>
        {activeService === 1 ? <WeddingsService /> : <></>}
        {activeService === 2 ? <FamilyService /> : <></>}
        {activeService === 3 ? <EventsService /> : <></>}
        {activeService === 4 ? <OtherService /> : <></>}
      </div>
    </div>
  )
}
