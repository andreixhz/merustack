export const locales = ['en', 'pt'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/** Maps our short locale codes to BCP-47 tags for the <html lang> attribute. */
export const htmlLang: Record<Locale, string> = {
  en: 'en',
  pt: 'pt-BR',
}

/** Human-readable label shown in the locale switcher. */
export const localeNames: Record<Locale, string> = {
  en: 'EN',
  pt: 'PT',
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
