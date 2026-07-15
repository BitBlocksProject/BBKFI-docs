import type { Metadata } from 'next'
import { DM_Sans, Outfit } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { APP_URL, SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL } from '@/lib/seo'

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
    images: [{ url: '/hero.png', width: 1984, height: 795, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    site: SOCIAL.twitterHandle,
    creator: SOCIAL.twitterHandle,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/hero.png'],
  },
  icons: {
    icon: [{ url: '/icon0.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png' }],
    shortcut: '/favicon.ico',
  },
  category: 'technology',
}

const navbar = (
  <Navbar
    className="bbk-navbar"
    align="left"
    logo={
      <span className="bbk-brand">
        <span className="bbk-brand-mark">
          <Image src="/images/coins/BBKFI.png" alt="" width={30} height={30} priority />
        </span>
        <span className="bbk-brand-name">
          BitBlocks<span>.Finance</span>
        </span>
        <span className="bbk-brand-product">Docs</span>
      </span>
    }
    projectLink={SOCIAL.github}
    chatLink={SOCIAL.discord}
  >
    <Link className="bbk-app-link" href={APP_URL} target="_blank" rel="noreferrer">
      Open app
      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" /></svg>
    </Link>
  </Navbar>
)

const footer = (
  <Footer className="bbk-footer">
    <div className="bbk-footer-inner">
      <div>
        <span className="bbk-footer-title">Built for verification.</span>
        <span className="bbk-footer-copy"> Read the interface, inspect the contracts, verify on-chain.</span>
      </div>
      <div className="bbk-footer-links">
        <a href={SOCIAL.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={SOCIAL.twitter} target="_blank" rel="noreferrer">X / Twitter</a>
        <a href={APP_URL} target="_blank" rel="noreferrer">Open app</a>
      </div>
    </div>
  </Footer>
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
          footer={footer}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/bitblocksfinance/bbkfi-docs/tree/main"
          nextThemes={{ defaultTheme: 'dark', storageKey: 'bbkfi-docs-theme' }}
          sidebar={{ defaultMenuCollapseLevel: 1, autoCollapse: true }}
          editLink="View source"
          feedback={{ content: 'Found something unclear?', link: SOCIAL.github }}
          toc={{ title: 'On this page', backToTop: 'Back to top' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
