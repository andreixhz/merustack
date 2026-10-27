import type { Dictionary } from '@/i18n/dictionaries'
import type { Resume } from '@/lib/types'
import { visibleItems } from '@/data/resume'
import { container, type NavItem } from '@/lib/ui'
import { MailIcon, NetworkIcon } from './icons'

export default function Footer({
  resume,
  dict,
  nav,
}: {
  resume: Resume
  dict: Dictionary
  nav: NavItem[]
}) {
  const { basics } = resume
  const profiles = visibleItems(resume.sections.profiles.items)
  const year = new Date().getFullYear()


  const linkClass = 'text-sm text-muted transition-colors hover:text-fg'

  return (
    <footer className="bg-ink">
      <div className={`${container} grid gap-12 py-16 md:grid-cols-12`}>
        <div className="md:col-span-6">
          <p className="font-display text-xl uppercase tracking-[0.08em]">{basics.name}</p>
          <p className="mt-4 max-w-xs text-sm text-muted">{basics.headline}</p>
          <div className="mt-6 flex gap-2">
            <a
              href={`mailto:${basics.email}`}
              aria-label={dict.contact.labels.email}
              className="flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-fg hover:text-fg"
            >
              <MailIcon />
            </a>
            {profiles.map((profile) => (
              <a
                key={profile.id}
                href={profile.website.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={profile.network}
                className="flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-fg hover:text-fg"
              >
                <NetworkIcon network={profile.network} />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="text-sm font-semibold">{dict.footer.navigation}</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-sm font-semibold">{dict.sections.contact}</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={`mailto:${basics.email}`} className={`${linkClass} break-all`}>
                {basics.email}
              </a>
            </li>
            <li>
              <a href={`tel:${basics.phone.replace(/[^+\d]/g, '')}`} className={linkClass}>
                {basics.phone}
              </a>
            </li>
            <li className="text-sm text-muted">{basics.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div
          className={`${container} flex flex-col gap-2 py-6 text-xs text-subtle sm:flex-row sm:justify-between`}
        >
          <p>
            © {year} {basics.name}. {dict.footer.rights}
          </p>
          <p>{dict.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
