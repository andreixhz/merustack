import Image from 'next/image'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { getClients, type Client } from '@/data/clients'
import { container } from '@/lib/ui'
import SectionHeading from '@/components/SectionHeading'
import { ArrowUpRight } from '@/components/icons'

function ClientCell({ client }: { client: Client }) {
  const body = (
    <>
      <div className="flex min-h-16 items-center">
        {client.logo ? (
          <Image
            src={client.logo}
            alt={client.name}
            width={160}
            height={48}
            className="h-10 w-auto opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : (
          <span className="font-display text-title uppercase [overflow-wrap:anywhere]">
            {client.name}
          </span>
        )}
      </div>
      <p className="mt-6 flex items-center gap-2 text-sm text-muted">
        {client.sector}
        {client.url && <ArrowUpRight className="h-3.5 w-3.5" />}
      </p>
    </>
  )

  const cell = 'group flex flex-col justify-between border-r border-b border-line p-6 md:p-8'
  return client.url ? (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cell} transition-colors hover:bg-surface`}
    >
      {body}
    </a>
  ) : (
    <div className={cell}>{body}</div>
  )
}

export default function Clients({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const copy = dict.home.clients
  const clients = getClients(locale)
  if (clients.length === 0) return null

  return (
    <section id="clients" className="scroll-mt-0 bg-ink pt-section">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading>{copy.title}</SectionHeading>
          </div>
          <p className="max-w-md text-lg text-muted lg:col-span-5 lg:justify-self-end">
            {copy.intro}
          </p>
        </div>

        <div className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <ClientCell key={client.id} client={client} />
          ))}
        </div>
      </div>
    </section>
  )
}
