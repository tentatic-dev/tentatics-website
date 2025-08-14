import { siteConfig } from '@/config/site'
import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
}

export function generateSEO({
  title,
  description,
  image,
  url,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const seoDescription = description || siteConfig.description
  const seoImage = image || `${siteConfig.url}/og-image.jpg`
  const seoUrl = url || siteConfig.url

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      'proptech',
      'real estate',
      'AI',
      'southeast asia',
      'property technology',
      'developers',
      'agencies',
      'agents',
      'tentatics',
      'indonesia',
      'jakarta',
    ],
    authors: [
      {
        name: siteConfig.author,
        url: siteConfig.url,
      },
    ],
    creator: siteConfig.author,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: seoUrl,
      title: seoTitle,
      description: seoDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: `@${siteConfig.username}`,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    metadataBase: new URL(siteConfig.url),
  }
}
