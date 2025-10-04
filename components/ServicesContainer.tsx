'use client'

import { useState } from 'react'
import WeddingsService from './Services/WeddingsService'
import FamilyService from './Services/FamilyService'
import EventsService from './Services/EventsService'
import CouplesService from './Services/CouplesService'
import OtherService from './Services/OtherService'
import PageBanner from './PageBanner'

const services = ['Weddings', 'Family', 'Events', 'Couples', 'Other']

export default function ServicesContainer() {
  const [displayDropdown, setDisplayDropdown] = useState(false)
  const [activeService, setActiveService] = useState(1)

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

  const serviceSection = () => {
    if (activeService === 1) {
      return <WeddingsService />
    } else if (activeService === 2) {
      return <FamilyService />
    } else if (activeService === 3) {
      return <EventsService />
    } else if (activeService === 4) {
      return <CouplesService />
    } else if (activeService === 5) {
      return <OtherService />
    }
  }

  return (
    <div>
      <PageBanner
        title="Services"
        imageSrc="/images/services-banner.jpg"
        imageAlt="wedding-5"
      />
      <div className="px-6 sm:px-12 py-8 lg:text-lg flex flex-col justify-center text-center bg-olive text-amber-50">
        <div
          aria-label="Filters"
          className="flex flex-row flex-wrap justify-center w-full gap-4 self-center pb-8"
        >
          {services.map((title: string, index: number) => {
            return (
              <button
                onClick={() => displayDetails(index)}
                key={index}
                className="transition text-xl lg:text-2xl cursor-default flex justify-center"
              >
                <div
                  className={`px-10 py-1 w-min text-amber-50 cursor-pointer hover:bg-amber-50/80 hover:text-olive focus:bg-amber-50/80 focus:text-olive rounded-3xl ${
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
        {serviceSection()}
      </div>
    </div>
  )
}
