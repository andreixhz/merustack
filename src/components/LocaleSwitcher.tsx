import Link from 'next/link'
import { locales, type Locale } from '@/i18n/config'

export default function LocaleSwitcher({
  currentLocale,
  subpath = '',
}: {
  currentLocale: Locale
  /** Path after the locale prefix, so switching language keeps the page. */
  subpath?: string
}) {
  return (
    <div className="flex items-center gap-3 text-xs font-medium uppercase">
      {locales.map((locale) => {
        const active = locale === currentLocale
        return (
          <Link
            key={locale}
            href={`/${locale}${subpath}`}
            aria-current={active ? 'true' : undefined}
            className={
              'border-b py-0.5 transition-colors ' +
              (active
                ? 'border-fg text-fg'
                : 'border-transparent text-subtle hover:text-fg')
            }
          >
            {locale}
          </Link>
        )
      })}
    </div>
  )
}
