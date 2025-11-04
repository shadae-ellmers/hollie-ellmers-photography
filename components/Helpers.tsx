'use client'

import { useEffect, useState } from 'react'

export const getColumnProperties = (services: any) => {
  const serviceCount = services.length
  let gridProperties = 'grid-cols-1'

  if (serviceCount >= 2) {
    gridProperties += ' sm:grid-cols-2'
  }

  if (serviceCount >= 3) {
    gridProperties += ' lg:grid-cols-3'
  }

  return gridProperties
}

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [breakpoint])

  return isMobile
}
