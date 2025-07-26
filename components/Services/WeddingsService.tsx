'use client'

import weddingServices from '../../data/weddingServices.json'
import useIsMobile from '../useIsMobile'

export default function WeddingsService() {
  const isMobile = useIsMobile()

  return (
    <div className="flex flex-col justify-center max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-8 ">
        {weddingServices.map((item, index: number) => (
          <div
            className="bg-amber-50/80 rounded-sm overflow-hidden text-olive relative h-full flex flex-col justify-between"
            key={index}
          >
            <div className="text-left">
              <div className="text-2xl flex flex-row flex-nowrap justify-between p-4">
                {isMobile ? (
                  <h3 className="pr-4">{item.label}</h3>
                ) : (
                  <h2 className="pr-4">{item.label}</h2>
                )}
                <h3>💍</h3>
              </div>
              <ul className="p-4">
                Includes:
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
