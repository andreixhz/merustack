import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getResume } from '@/data/resume'
import { portfolioPath } from '@/lib/routes'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TechMarquee from '@/components/sections/TechMarquee'
import Contact from '@/components/sections/Contact'
import HomeHero from '@/components/home/HomeHero'
import Services from '@/components/home/Services'
import Process from '@/components/home/Process'
import HomeProjects from '@/components/home/HomeProjects'
import HomeAbout from '@/components/home/HomeAbout'
import Clients from '@/components/home/Clients'

type LocaleParams = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const { home } = await getDictionary(locale)
  return { title: home.meta.title, description: home.meta.description }
}

/** Landing page that presents the consulting / website / custom system services. */
export default async function ServicesHome({ params }: LocaleParams) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = await getDictionary(locale)
  const resume = getResume(locale)
  const { home } = dict

  const nav = [
    { href: '#services', label: home.nav.services },
    { href: '#process', label: home.nav.process },
    { href: '#projects', label: home.nav.projects },
    { href: '#clients', label: home.nav.clients },
    { href: '#about', label: home.nav.about },
  ]

  return (
    <>
      <Header
        locale={locale}
        name={resume.basics.name}
        homeHref={`/${locale}`}
        nav={nav}
        contactLabel={home.nav.contact}
      />
      <main>
        <HomeHero copy={home.hero} location={resume.basics.location} />
        <TechMarquee items={home.marquee} />
        <Services copy={home.services} />
        <Process copy={home.process} />
        <HomeProjects dict={dict} locale={locale} />
        <Clients dict={dict} locale={locale} />
        <HomeAbout copy={home.about} locale={locale} />
        <Contact resume={resume} copy={home.contact} followLabel={dict.contact.follow} />
      </main>
      <Footer
        resume={resume}
        dict={dict}
        nav={[...nav, { href: portfolioPath(locale), label: home.nav.portfolio }]}
      />
    </>
  )
}
