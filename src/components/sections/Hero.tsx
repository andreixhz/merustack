import type { Dictionary } from '@/i18n/dictionaries'
import type { Resume } from '@/lib/types'
import { visibleItems } from '@/data/resume'
import { buttonPrimary, buttonSecondary, container } from '@/lib/ui'
import { MailIcon, NetworkIcon } from '@/components/icons'

export default function Hero({ dict, resume }: { dict: Dictionary; resume: Resume }) {
  const { basics } = resume
  const profiles = visibleItems(resume.sections.profiles.items)
  const [firstName, ...rest] = basics.name.split(' ')

  return (
    <section className="relative isolate flex min-h-[min(88svh,56rem)] flex-col justify-end overflow-hidden bg-ink pt-32 pb-16 md:pb-20">
      {/* Backdrop: soft light from the top-right, scanlines, and a fade into the page. */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_10%,rgba(120,140,150,0.35),transparent_60%)]"
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
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-subtle">
            {basics.location}
          </p>

          <h1 className="mt-6 font-display text-mega uppercase">
            <span className="block">{firstName}</span>
            {rest.length > 0 && <span className="block">{rest.join(' ')}</span>}
          </h1>

          <p className="mt-6 max-w-xl text-xl text-fg/90">{basics.headline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className={buttonPrimary}>
              <MailIcon />
              {dict.hero.cta}
            </a>
            {profiles.map((profile) => (
              <a
                key={profile.id}
                href={profile.website.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonSecondary}
              >
                <NetworkIcon network={profile.network} />
                {profile.network}
              </a>
            ))}
          </div>
        </div>

        <a
          href="#about"
          className="hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-subtle transition-colors hover:text-fg md:flex"
        >
          {dict.hero.scroll}
          <span className="flex h-9 w-9 items-center justify-center border border-fg/30" aria-hidden>
            ↓
          </span>
        </a>
      </div>
    </section>
  )
}
