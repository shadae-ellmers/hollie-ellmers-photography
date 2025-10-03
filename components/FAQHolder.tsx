'use client'

import { useState } from 'react'
import faqs from '../data/faqs.json'
import PlusIcon from './Icons/PlusIcon'
import { useIsMobile } from './Helpers'

export default function FAQHolder() {
  const [activeFAQs, setActiveFAQs] = useState<number[]>([])
  const isMobile = useIsMobile()

  const toggleFAQ = (index: number) => {
    setActiveFAQs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <div className="pt-16 flex flex-col justify-between">
      {isMobile ? (
        <h3 className="text-2xl text-center font-normal pb-8">FAQs</h3>
      ) : (
        <h2 className="text-2xl text-center font-normal pb-8">FAQs</h2>
      )}
      <div className="flex flex-col w-full justify-center">
        {faqs.map((item, index: number) => {
          const isActive = activeFAQs.includes(index)
          return (
            <div
              className="w-full flex flex-col justify-center first:border-t-2 border-olive/20 px border-solid border-b-2"
              key={index}
            >
              <button
                className="flex flex-row justify-between flex-nowrap w-full cursor-pointer px-6 py-4 text-left"
                onClick={() => toggleFAQ(index)}
              >
                {isMobile ? (
                  <h4 className="flex flex-col justify-center">{item.title}</h4>
                ) : (
                  <h3 className="flex flex-col justify-center">{item.title}</h3>
                )}
                <div
                  className={`fill-olive flex flex-col justify-center transition-transform duration-300 ${
                    isActive ? 'rotate-45' : ''
                  }`}
                >
                  <PlusIcon />
                </div>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                  isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="pb-4">{item.content}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
