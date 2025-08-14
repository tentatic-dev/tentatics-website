import { siteConfig } from '@/config/site'

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  author: {
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
  },
  publisher: {
    '@type': 'Person',
    name: siteConfig.author,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.author,
  url: siteConfig.url,
  description: siteConfig.description,
  jobTitle: 'Company Profile, Tentatics',
  worksFor: {
    '@type': 'Organization',
    name: siteConfig.name,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.location,
    addressCountry: 'Indonesia',
  },
  sameAs: [
    siteConfig.social.instagram,
  ],
  email: siteConfig.social.email.replace('mailto:', ''),
  telephone: siteConfig.social.whatsapp.replace('https://wa.me/', '+'),
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  founder: {
    '@type': 'Person',
    name: siteConfig.author,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.location,
    addressCountry: 'Indonesia',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.social.whatsapp.replace('https://wa.me/', '+'),
    contactType: 'customer service',
    email: siteConfig.social.email.replace('mailto:', ''),
  },
  sameAs: [
    siteConfig.social.instagram,
  ],
  serviceType: ['Photography', 'Videography', 'Visual Storytelling'],
  areaServed: {
    '@type': 'Place',
    name: 'Indonesia',
  },
}
