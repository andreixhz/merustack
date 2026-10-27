import { isLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getResume } from '@/data/resume'
import { ogSize, renderShareImage } from '@/lib/og'

export const alt = 'Merustack'
export const size = ogSize
export const contentType = 'image/png'

// Prerender one image per locale at build time.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/** Link preview for the services home page. */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : 'pt'
  const { home } = await getDictionary(locale)

  return renderShareImage({
    eyebrow: `${home.hero.eyebrow} · ${getResume(locale).basics.location}`,
    title: home.hero.title,
    subtitle: home.contact.subheading,
    tags: home.services.items.map((service) => service.title),
  })
}
