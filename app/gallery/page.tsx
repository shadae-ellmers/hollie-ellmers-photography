import PageBanner from '@/components/PageBanner'
import GalleryFilter from '@/components/GalleryFilter'
import InfiniteMasonry from '@/components/InfiniteMasonry'
import { list } from '@vercel/blob'
import { Metadata } from 'next'

const IMAGE_FILE_PATTERN = /\.(jpe?g|png|gif|webp|avif|svg|tiff?)$/i
const BASE_PREFIX = 'gallery/'
const FILTER_LABEL_ALL = 'All'

const capitalise = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

const normaliseLabel = (text: string) => capitalise(text.trim().toLowerCase())

const stripBase = (text: string) =>
  text.startsWith(BASE_PREFIX) ? text.slice(BASE_PREFIX.length) : text

const shuffleArray = <T,>(items: T[]): T[] => {
  const shuffled = items.slice()
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const parseFolderInfo = (folderName: string) => {
  const matchResult = folderName.match(/^(\d{3,})-(.+)$/)
  if (!matchResult) {
    return {
      folderKey: folderName,
      displayLabel: capitalise(folderName),
      sortWeight: Number.POSITIVE_INFINITY,
    }
  }
  const [, weightString, rawLabel] = matchResult
  return {
    folderKey: folderName,
    displayLabel: capitalise(rawLabel),
    sortWeight: parseInt(weightString, 10),
  }
}

type MetadataMap = Record<string, { alt?: string }>

export const metadata: Metadata = {
  title: 'Portfolio | Hollie Ellmers | Photographer NZ',
  description:
    'Explore my photography portfolio, featuring weddings, portraits, and events captured across New Zealand with artistry and heart.',
  openGraph: {
    title: 'Portfolio | Hollie Ellmers | Photographer NZ',
    description:
      'Explore my photography portfolio, featuring weddings, portraits, and events captured across New Zealand with artistry and heart.',
    url: 'https://www.hollieellmers.photography/gallery/',
    images: [
      {
        url: '...',
      },
    ],
    type: 'website',
  },
}

export default async function Gallery({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const searchParam = await searchParams
  const requestedFilterLabel = (
    searchParam?.filter ?? FILTER_LABEL_ALL
  ).toString()

  const { blobs: allBlobs } = await list({ prefix: BASE_PREFIX })

  let metadataMap: MetadataMap = {}
  const metadataBlob = allBlobs.find(
    (blob) => blob.pathname === `${BASE_PREFIX}metadata.json`
  )
  if (metadataBlob?.url) {
    try {
      const response = await fetch(metadataBlob.url, {
        next: { revalidate: 300 },
      })
      if (response.ok) {
        metadataMap = (await response.json()) as MetadataMap
      }
    } catch {}
  }

  const topLevelFolderNames = Array.from(
    new Set(
      allBlobs
        .filter((blob) => IMAGE_FILE_PATTERN.test(blob.pathname))
        .map((blob) => stripBase(blob.pathname).split('/')[0])
        .filter((seg) => !!seg && seg !== 'metadata.json')
    )
  )

  const folders = topLevelFolderNames
    .map(parseFolderInfo)
    .sort((a, b) => a.sortWeight - b.sortWeight)

  const folderLabelToFolderKey = new Map(
    folders.map((folderInfo) => [folderInfo.displayLabel, folderInfo.folderKey])
  )

  const allFilterLabels = [
    FILTER_LABEL_ALL,
    ...folders.map((folderInfo) => folderInfo.displayLabel),
  ]

  const normalisedRequestedLabel = normaliseLabel(requestedFilterLabel)
  const activeFilterLabel = allFilterLabels.includes(normalisedRequestedLabel)
    ? normalisedRequestedLabel
    : FILTER_LABEL_ALL

  const allImageBlobs = allBlobs.filter((blob) =>
    IMAGE_FILE_PATTERN.test(blob.pathname)
  )

  const filteredImages =
    activeFilterLabel === FILTER_LABEL_ALL
      ? allImageBlobs
      : allImageBlobs.filter((blob) =>
          blob.pathname.startsWith(
            `${BASE_PREFIX}${folderLabelToFolderKey.get(activeFilterLabel)}/`
          )
        )

  const shuffledImages = shuffleArray(filteredImages)

  const enrichedImages = shuffledImages.map((image) => ({
    ...image,
    alt: metadataMap[image.pathname]?.alt ?? '',
  }))

  return (
    <div>
      <PageBanner
        title="Gallery"
        imageSrc="/images/gallery-banner.jpg"
        imageAlt="A bride and groom kiss in a sunflower field. The bride wears a white dress and veil, whilst the groom wears a light shirt. Bright sunflowers surround them, creating a romantic, natural setting."
      />
      <section className="px-6 sm:px-12 py-8 lg:text-lg flex flex-col justify-center text-center bg-olive text-amber-50">
        <div
          aria-label="Filters"
          className="flex flex-row flex-wrap justify-center w-full gap-4 self-center pb-8"
        >
          <GalleryFilter filters={allFilterLabels} active={activeFilterLabel} />
        </div>
        <InfiniteMasonry
          key={activeFilterLabel}
          images={enrichedImages}
          initialCount={12}
          step={12}
          rootMargin="1000px"
        />
      </section>
    </div>
  )
}
