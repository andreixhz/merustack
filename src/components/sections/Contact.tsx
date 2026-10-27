import type { Resume } from '@/lib/types'
import { visibleItems } from '@/data/resume'
import { container } from '@/lib/ui'
import { ArrowUpRight, MailIcon, NetworkIcon } from '@/components/icons'

// Brand colors for the profile cards; anything unknown falls back to a surface card.
const networkCard: Record<string, string> = {
  linkedin: 'bg-[#0a66c2] text-white',
  github: 'border border-line bg-surface text-fg',
}

export type ContactCopy = {
  heading: string
  subheading: string
  emailCta: string
  /** Prefills the email subject when set. */
  emailSubject?: string
}

export default function Contact({
  resume,
  copy,
  followLabel,
  footnote,
}: {
  resume: Resume
  copy: ContactCopy
  /** "Follow on" prefix for the profile cards. */
  followLabel: string
  /** Optional line under the cards (e.g. a link to the other page). */
  footnote?: React.ReactNode
}) {
  const { basics } = resume
  const profiles = visibleItems(resume.sections.profiles.items)
  const mailto = copy.emailSubject
    ? `mailto:${basics.email}?subject=${encodeURIComponent(copy.emailSubject)}`
    : `mailto:${basics.email}`

  return (
    <section id="contact" className="scroll-mt-18 bg-ink py-section">
      <div className={`${container} grid gap-3 lg:grid-cols-3`}>
        {/* Main card */}
        <div className="relative overflow-hidden bg-[#0f766e] p-8 text-white md:p-10 lg:col-span-2 lg:row-span-2">
          <MailIcon className="h-8 w-8" />
          <h2 className="relative mt-10 max-w-2xl font-display text-display uppercase [overflow-wrap:anywhere]">
            {copy.heading}
          </h2>
          <p className="relative mt-6 max-w-md text-base text-white/90 md:text-lg">
            {copy.subheading}
          </p>
          <a
            href={mailto}
            className="relative mt-8 inline-flex items-center gap-2 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
          >
            {copy.emailCta}
            <ArrowUpRight />
          </a>
          <MailIcon className="pointer-events-none absolute -right-10 -bottom-14 h-72 w-72 text-white/10" />
        </div>

        {/* Profile cards */}
        {profiles.map((profile) => (
          <a
            key={profile.id}
            href={profile.website.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex min-h-52 flex-col justify-between p-8 transition-opacity hover:opacity-90 ${
              networkCard[profile.network.toLowerCase()] ?? networkCard.github
            }`}
          >
            <NetworkIcon network={profile.network} className="h-7 w-7" />
            <div>
              <p className="flex items-center gap-2 font-display text-xl uppercase">
                {followLabel} {profile.network}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
              <p className="mt-2 text-sm opacity-80">@{profile.username}</p>
            </div>
          </a>
        ))}
      </div>

      {footnote && <div className={`${container} mt-8`}>{footnote}</div>}
    </section>
  )
}
