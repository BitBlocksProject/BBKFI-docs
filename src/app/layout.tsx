import type { Metadata } from 'next'
import { DM_Sans, Outfit } from 'next/font/google'
import Image from 'next/image'
import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL } from '@/lib/seo'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'BitBlocks Finance',
    'BBKFI',
    'DeFi',
    'BNB Smart Chain',
    'BSC',
    'DEX',
    'liquidity',
    'staking',
    'tokenomics',
    'smart contracts',
    'yield farming',
    'swap',
  ],
  authors: [{ name: 'BitBlocks Finance', url: SITE_URL }],
  creator: 'BitBlocks Finance',
  publisher: 'BitBlocks Finance',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    site: SOCIAL.twitterHandle,
    creator: SOCIAL.twitterHandle,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/og-default.png'],
  },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png' }],
    shortcut: '/favicon.ico',
  },
  category: 'technology',
}

const navbar = (
  <Navbar
    logo={
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Image src="/images/coins/BBKFI.png" alt="BitBlocks Finance" width={28} height={28} style={{ borderRadius: '6px' }} />
        <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1.1rem' }}>
          <span style={{ color: '#2dd4bf' }}>BitBlocks</span>
          <span style={{ color: '#ffffff', opacity: 0.9 }}> Finance</span>
        </span>
        <span
          style={{
            fontSize: '0.65rem',
            background: 'rgba(45,212,191,0.15)',
            color: '#2dd4bf',
            border: '1px solid rgba(45,212,191,0.3)',
            borderRadius: '4px',
            padding: '1px 6px',
          }}
        >
          DOCS
        </span>
      </span>
    }
    projectLink={SOCIAL.github}
  />
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap()

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/bitblocksfinance/bbkfi-docs/tree/main"
          nextThemes={{ defaultTheme: 'dark' }}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
