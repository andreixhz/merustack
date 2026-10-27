'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { container, type NavItem } from '@/lib/ui'
import LocaleSwitcher from './LocaleSwitcher'
import { MailIcon } from './icons'

export default function Header({
  locale,
  name,
  homeHref,
  subpath = '',
  nav,
  contactLabel,
}: {
  locale: Locale
  name: string
  /** Where the name/logo links to. */
  homeHref: string
  /** Path after the locale prefix, kept when switching language. */
  subpath?: string
  nav: NavItem[]
  contactLabel: string
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  const closeMenu = () => setIsMenuOpen(false)
  const solid = isScrolled || isMenuOpen

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ' +
        (solid
          ? 'border-line bg-ink/95 backdrop-blur-md'
          : 'border-transparent bg-linear-to-b from-black/70 to-transparent')
      }
    >
      <div className={`${container} flex h-18 items-center justify-between gap-6`}>
        <Link href={homeHref} aria-label={name} className="shrink-0 transition-opacity hover:opacity-80">
          <Image src="/logo.png" alt={name} width={40} height={40} priority className="h-10 w-10" />
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium whitespace-nowrap text-fg/85 transition-colors hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <span className="hidden h-5 w-px bg-line lg:block" aria-hidden />

          <LocaleSwitcher currentLocale={locale} subpath={subpath} />

          <a
            href="#contact"
            className="hidden items-center gap-2 border border-fg/40 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-fg sm:inline-flex"
          >
            <MailIcon className="h-3.5 w-3.5" />
            {contactLabel}
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="-mr-2 flex h-9 w-9 items-center justify-center text-fg/85 transition-colors hover:text-fg lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <nav className="border-t border-line bg-ink lg:hidden">
          <ul className={`${container} flex flex-col py-4`}>
            {[...nav, { href: '#contact', label: contactLabel }].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="block py-3 font-display text-xl uppercase text-fg/85 transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
