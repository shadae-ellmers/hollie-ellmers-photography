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
          const buttonId = `faq-button-${index}`
          const panelId = `faq-panel-${index}`

          return (
            <div
              className="w-full flex flex-col justify-center first:border-t-2 border-olive/20 px border-solid border-b-2"
              key={index}
            >
              <button
                id={buttonId}
                aria-expanded={isActive}
                aria-controls={panelId}
                className="flex flex-row justify-between flex-nowrap w-full cursor-pointer group px-6 py-4 text-left"
                onClick={() => toggleFAQ(index)}
              >
                {isMobile ? (
                  <h4 className="flex flex-col justify-center">{item.title}</h4>
                ) : (
                  <h3 className="flex flex-col justify-center">{item.title}</h3>
                )}
                <div
                  className={`fill-olive group-hover:bg-olive group-hover:fill-amber-50 group-focus:bg-olive group-focus:fill-amber-50 p-2 rounded-full flex flex-col justify-center transition-transform duration-300 ${
                    isActive ? 'rotate-45' : ''
                  }`}
                  aria-hidden="true"
                >
                  <PlusIcon />
                </div>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isActive}
                className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                  isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className=" pt-2 pb-4">{item.content}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
