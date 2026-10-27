import type { Dictionary } from '@/i18n/dictionaries'
import { buttonPrimary, container, counter } from '@/lib/ui'
import SectionHeading from '@/components/SectionHeading'
import { ArrowUpRight } from '@/components/icons'

export default function Services({ copy }: { copy: Dictionary['home']['services'] }) {
  const { items } = copy

  return (
    <section id="services" className="scroll-mt-0 bg-ink pt-section">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading>{copy.title}</SectionHeading>
          </div>
          <p className="max-w-md text-lg text-muted lg:col-span-5 lg:justify-self-end">
            {copy.intro}
          </p>
        </div>

        <div className="mt-14 grid border-t border-l border-line md:grid-cols-3">
          {items.map((service, index) => (
            <article
              key={service.title}
              className="flex flex-col border-r border-b border-line p-6 transition-colors hover:bg-surface md:p-8"
            >
              <p className="text-xs font-medium tracking-[0.2em] text-subtle">
                {counter(index, items.length)}
              </p>
              <h3 className="mt-6 font-display text-title uppercase [overflow-wrap:anywhere]">
                {service.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">{service.description}</p>
              <ul className="mt-8 space-y-3 border-t border-line pt-6">
                {service.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm font-medium">
                    <span className="h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <a href="#contact" className={`${buttonPrimary} mt-10`}>
          {copy.cta}
          <ArrowUpRight />
        </a>
      </div>
    </section>
  )
}
