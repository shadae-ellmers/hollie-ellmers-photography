'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

type Props = {
  filters: string[]
  active: string
}

export default function GalleryFilter({ filters, active }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const setFilter = (label: string) => {
    if (label === active) return

    const params = new URLSearchParams(searchParams.toString())
    const isAll = label.trim().toLowerCase() === 'all'

    if (isAll) {
      params.delete('filter')
    } else {
      params.set('filter', label)
    }

    const qs = params.toString()
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  return (
    <>
      {filters.map((label) => (
        <button
          key={label}
          type="button"
          className="transition text-lg lg:text-xl flex justify-center cursor-pointer"
          onClick={() => setFilter(label)}
          aria-pressed={active === label}
        >
          <div
            className={`px-10 py-1 w-min rounded-3xl hover:bg-amber-50/80 hover:text-olive ${
              active === label
                ? 'bg-amber-50 text-olive'
                : 'bg-amber-50/10 text-amber-50'
            }`}
          >
            {label}
          </div>
        </button>
      ))}
    </>
  )
}
