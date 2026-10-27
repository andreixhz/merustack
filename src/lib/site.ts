import type { Metadata } from 'next'
import { htmlLang, locales, type Locale } from '@/i18n/config'

export const siteName = 'Merustack'

/**
 * Absolute origin used for share links/images. Set NEXT_PUBLIC_SITE_URL once
 * the custom domain is live; on Vercel it falls back to the production domain.
 */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),
)

const ogLocale: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' }

/**
 * Title/description plus the Open Graph and Twitter tags that WhatsApp,
 * Instagram, LinkedIn, X, etc. read to build the link preview. The share image
 * itself comes from the route's `opengraph-image.tsx`.
 */
export function shareMetadata({
  locale,
  subpath,
  title,
  description,
}: {
  locale: Locale
  /** Path after the locale prefix ('' for the home page). */
  subpath: string
  title: string
  description: string
}): Metadata {
  const url = `/${locale}${subpath}`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}${subpath}`])),
    },
    openGraph: {
      type: 'website',
      siteName,
      url,
      title,
      description,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}
