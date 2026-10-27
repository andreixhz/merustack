import type { Dictionary } from '@/i18n/dictionaries'
import { buttonPrimary, buttonSecondary, container } from '@/lib/ui'
import { ArrowUpRight, MailIcon } from '@/components/icons'

export default function HomeHero({
  copy,
  location,
}: {
  copy: Dictionary['home']['hero']
  location: string
}) {
  return (
    <section className="relative isolate flex min-h-[min(88svh,56rem)] flex-col justify-end overflow-hidden bg-ink pt-32 pb-16 md:pb-20">
      {/* Same backdrop as the portfolio hero, lit from the left this time. */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_0%,rgba(45,212,191,0.18),transparent_55%),radial-gradient(ellipse_at_85%_30%,rgba(120,140,150,0.28),transparent_60%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.035)_0_1px,transparent_1px_4px)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-ink to-transparent"
        aria-hidden
      />

      <div className={`${container} flex flex-col gap-10 md:flex-row md:items-end md:justify-between`}>
        <div>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-fg/90">
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
              {copy.eyebrow}
            </span>
            <span className="text-subtle" aria-hidden>
              ·
            </span>
            <span className="font-medium whitespace-nowrap text-muted">{location}</span>
          </p>

          <h1 className="mt-6 max-w-5xl font-display text-display uppercase [overflow-wrap:anywhere]">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-2xl text-xl text-fg/90">{copy.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className={buttonPrimary}>
              <MailIcon />
              {copy.cta}
            </a>
            <a href="#services" className={buttonSecondary}>
              {copy.secondary}
              <ArrowUpRight />
            </a>
          </div>
        </div>

        <a
          href="#services"
          className="hidden shrink-0 items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-subtle transition-colors hover:text-fg md:flex"
        >
          {copy.scroll}
          <span className="flex h-9 w-9 items-center justify-center border border-fg/30" aria-hidden>
            ↓
          </span>
        </a>
      </div>
    </section>
  )
}
