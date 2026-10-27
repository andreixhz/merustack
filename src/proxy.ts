import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, locales } from '@/i18n/config'

// Next.js 16 renamed Middleware to Proxy. Same behavior: this runs before the
// request completes and prepends a locale to any path that lacks one.
function getLocale(request: NextRequest): string {
  const acceptLanguage = (request.headers.get('accept-language') ?? '').toLowerCase()
  if (acceptLanguage.split(',')[0]?.trim().startsWith('pt')) return 'pt'
  return defaultLocale
}

// The portfolio first shipped under the misspelled "/portifolio"; keep those links working.
const LEGACY_SEGMENT = new RegExp(`^(/(?:${locales.join('|')}))?/portifolio(?=/|$)`)

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const legacy = pathname.match(LEGACY_SEGMENT)
  if (legacy) {
    const locale = legacy[1] ?? `/${getLocale(request)}`
    request.nextUrl.pathname = `${locale}/portfolio${pathname.slice(legacy[0].length)}`
    return NextResponse.redirect(request.nextUrl, 308)
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Skip Next internals, the API, and any file with an extension (static assets).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
