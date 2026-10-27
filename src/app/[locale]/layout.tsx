import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import { htmlLang, isLocale, locales } from '@/i18n/config'
import { siteName, siteUrl } from '@/lib/site'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: siteName,
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html
      lang={htmlLang[locale]}
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-fg">{children}</body>
    </html>
  )
}
