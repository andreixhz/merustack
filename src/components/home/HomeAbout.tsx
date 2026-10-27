import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { buttonPrimary, container } from '@/lib/ui'
import { portfolioPath } from '@/lib/routes'
import { Eyebrow } from '@/components/SectionHeading'
import { ArrowUpRight } from '@/components/icons'

export default function HomeAbout({
  copy,
  locale,
}: {
  copy: Dictionary['home']['about']
  locale: Locale
}) {
  return (
    <section id="about" className="scroll-mt-18 bg-ink pt-section">
      <div className={`${container} grid gap-14 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-7">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="mt-6 text-headline font-semibold">{copy.heading}</h2>
          <p className="mt-6 max-w-2xl text-xl leading-snug text-fg/85">{copy.text}</p>
          <Link href={portfolioPath(locale)} className={`${buttonPrimary} mt-8`}>
            {copy.cta}
            <ArrowUpRight />
          </Link>
        </div>

        <div className="lg:col-span-5">
          <Eyebrow>{copy.highlightsTitle}</Eyebrow>
          <ul className="mt-5 border-t border-line">
            {copy.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-3 border-b border-line py-4 font-medium"
              >
                <span className="h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
