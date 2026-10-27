import type { Dictionary } from '@/i18n/dictionaries'
import type { ExperienceItem, Resume } from '@/lib/types'
import { visibleItems } from '@/data/resume'
import { container, counter } from '@/lib/ui'
import SectionHeading from '@/components/SectionHeading'
import RichText from '@/components/RichText'

function ExperienceRow({
  item,
  index,
  total,
}: {
  item: ExperienceItem
  index: number
  total: number
}) {
  return (
    <article className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-5">
        <p className="text-xs font-medium tracking-[0.2em] text-subtle">{counter(index, total)}</p>
        <h3 className="mt-4 font-display text-headline uppercase [overflow-wrap:anywhere]">
          {item.company}
        </h3>
        <p className="mt-4 text-xl font-medium">{item.position}</p>
        <p className="mt-2 flex flex-wrap gap-x-2 text-sm text-muted">
          <span>{item.period}</span>
          {item.location && (
            <>
              <span className="text-subtle" aria-hidden>
                ·
              </span>
              <span>{item.location}</span>
            </>
          )}
        </p>
      </div>

      <div className="md:col-span-7 md:pt-9">
        {item.description && <RichText html={item.description} className="text-base" />}

        {item.roles.length > 0 && (
          <ol className="space-y-8">
            {item.roles.map((role) => (
              <li key={role.id} className="border-l border-line pl-5">
                <p className="text-base font-semibold">{role.position}</p>
                {role.period && <p className="mt-0.5 text-xs text-subtle">{role.period}</p>}
                <RichText html={role.description} className="mt-3 text-base" />
              </li>
            ))}
          </ol>
        )}
      </div>
    </article>
  )
}

export default function Experience({ dict, resume }: { dict: Dictionary; resume: Resume }) {
  const items = visibleItems(resume.sections.experience.items)
  if (items.length === 0) return null

  return (
    <section id="experience" className="scroll-mt-0 bg-ink pt-section">
      <div className={container}>
        <SectionHeading>{dict.sections.experience}</SectionHeading>
        <div className="mt-14">
          {items.map((item, index) => (
            <ExperienceRow key={item.id} item={item} index={index} total={items.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
