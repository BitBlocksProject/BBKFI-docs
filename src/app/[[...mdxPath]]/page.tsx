import type { Metadata } from 'next'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '@/mdx-components'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL } from '@/lib/seo'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: {
  params: Promise<{ mdxPath: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  const path = params.mdxPath?.join('/') ?? ''
  const canonical = path ? `${SITE_URL}/${path}` : SITE_URL
  const title = typeof metadata.title === 'string' ? metadata.title : SITE_NAME
  const description = typeof metadata.description === 'string' ? metadata.description : SITE_DESCRIPTION

  return {
    ...metadata,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: '/hero.png', width: 1984, height: 795, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      site: SOCIAL.twitterHandle,
      creator: SOCIAL.twitterHandle,
      title,
      description,
      images: ['/hero.png'],
    },
  }
}

// Nextra exposes this as a hook-shaped factory, but its wrapper is intentionally
// resolved once at module scope in the App Router integration.
// eslint-disable-next-line react-hooks/rules-of-hooks
const Wrapper = useMDXComponents({}).wrapper

export default async function Page(props: {
  params: Promise<{ mdxPath: string[] }>
}) {
  const params = await props.params
  const result = await importPage(params.mdxPath)
  const { default: MDXContent, toc, metadata, sourceCode } = result
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
