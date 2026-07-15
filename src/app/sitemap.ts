import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

const ROUTES = [
  '',
  'introduction',
  'introduction/ecosystem',
  'introduction/tokenomics',
  'guides',
  'guides/swap',
  'guides/liquidity',
  'guides/earn',
  'guides/governance',
  'guides/safety',
  'contracts',
  'contracts/addresses',
  'contracts/architecture',
  'contracts/frontend-reference',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ROUTES.map((route) => {
    const url = route ? `${SITE_URL}/${route}` : SITE_URL
    return {
      url,
      lastModified: now,
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : route.includes('/') ? 0.7 : 0.8,
    }
  })
}
