import { Metadata } from 'next'
import ServicesContainer from '@/components/ServicesContainer'

export const metadata: Metadata = {
  title: 'Photography Services | Hollie Ellmers | Wellington & NZ',
  description:
    'From weddings to portraits, I provide professional photography services based in Wellington and available across New Zealand, tailored to your vision.',
  openGraph: {
    title: 'Photography Services | Hollie Ellmers | Wellington & NZ',
    description:
      'From weddings to portraits, I provide professional photography services based in Wellington and available across New Zealand, tailored to your vision.',
    url: 'https://www.hollieellmers.photography/services/',
    images: [
      {
        url: '...',
      },
    ],
    type: 'website',
  },
}

export default function Services() {
  return <ServicesContainer />
}
