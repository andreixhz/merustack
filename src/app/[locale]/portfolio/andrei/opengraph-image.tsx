import { isLocale, locales } from '@/i18n/config'
import { getResume, visibleItems } from '@/data/resume'
import { ogSize, renderShareImage } from '@/lib/og'

export const alt = 'Andrei Avelino'
export const size = ogSize
export const contentType = 'image/png'

// Prerender one image per locale at build time.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/** Link preview for the personal portfolio. */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const resume = getResume(isLocale(raw) ? raw : 'pt')
  const { basics } = resume

  return renderShareImage({
    eyebrow: basics.location,
    title: basics.name,
    subtitle: basics.headline,
    // Lead technology of each skill group reads better than the first five keywords.
    tags: visibleItems(resume.sections.skills.items)
      .map((skill) => skill.keywords[0])
      .filter(Boolean)
      .slice(0, 5),
  })
}
