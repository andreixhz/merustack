import type { Locale } from '@/i18n/config'

/** Path (without locale) of Andrei's portfolio page. */
export const portfolioSubpath = '/portfolio/andrei'

export function portfolioPath(locale: Locale): string {
  return `/${locale}${portfolioSubpath}`
}
