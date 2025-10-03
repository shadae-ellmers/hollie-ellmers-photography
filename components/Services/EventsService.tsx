'use client'

import eventsServices from '../../data/eventsServices.json'
import useIsMobile from '../useIsMobile'

export default function CouplesService() {
  const isMobile = useIsMobile()

  return (
    <div className="flex flex-col justify-center max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-8 ">
        {eventsServices.map((item, index: number) => (
          <div
            className="bg-amber-50/80 rounded-sm overflow-hidden text-olive relative h-full flex flex-col justify-between"
            key={index}
          >
            <div className="text-left flex flex-col">
              {isMobile ? (
                <h3 className="pr-4 text-2xl p-4">
                  {item.label ? item.label : 'Classic Package'}
                </h3>
              ) : (
                <h2 className="pr-4 text-2xl p-4">
                  {item.label ? item.label : 'Classic Package'}
                </h2>
              )}
              <ul className="p-4">
                {item.features.map((feature, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 rounded-b-sm overflow-hidden">
              <p className="p-4 font-semibold ">From ${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
