import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getResume, skillKeywords } from '@/data/resume'
import { portfolioPath, portfolioSubpath } from '@/lib/routes'
import { stripHtml } from '@/lib/html'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import TechMarquee from '@/components/sections/TechMarquee'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

type LocaleParams = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const { basics, summary } = getResume(locale)
  return {
    title: `${basics.name} — ${basics.headline}`,
    description: stripHtml(summary.content).slice(0, 160),
  }
}

export default async function AndreiPortfolio({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const resume = getResume(locale)

  const nav = [
    { href: '#about', label: dict.nav.about },
    { href: '#experience', label: dict.nav.experience },
    { href: '#projects', label: dict.nav.projects },
    { href: '#skills', label: dict.nav.skills },
  ]

  return (
    <>
      <Header
        locale={locale}
        name={resume.basics.name}
        homeHref={portfolioPath(locale)}
        subpath={portfolioSubpath}
        nav={nav}
        contactLabel={dict.nav.contact}
      />
      <main>
        <Hero dict={dict} resume={resume} />
        <TechMarquee items={skillKeywords(resume)} />
        <About dict={dict} resume={resume} />
        <Experience dict={dict} resume={resume} />
        <Projects dict={dict} locale={locale} />
        <Skills dict={dict} resume={resume} />
        <Contact
          resume={resume}
          copy={dict.contact}
          followLabel={dict.contact.follow}
          footnote={
            <p className="text-sm text-muted">
              {dict.contact.servicesPrompt}{' '}
              <Link
                href={`/${locale}`}
                className="font-semibold text-fg underline underline-offset-4 hover:text-accent"
              >
                {dict.contact.servicesLink}
              </Link>
            </p>
          }
        />
      </main>
      <Footer
        resume={resume}
        dict={dict}
        nav={[...nav, { href: `/${locale}`, label: dict.home.nav.services }]}
      />
    </>
  )
}
