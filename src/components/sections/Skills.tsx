import type { Dictionary } from '@/i18n/dictionaries'
import type { Resume } from '@/lib/types'
import { visibleItems } from '@/data/resume'
import { container, counter } from '@/lib/ui'
import SectionHeading from '@/components/SectionHeading'

export default function Skills({ dict, resume }: { dict: Dictionary; resume: Resume }) {
  const items = visibleItems(resume.sections.skills.items)
  if (items.length === 0) return null

  return (
    <section id="skills" className="scroll-mt-0 bg-ink pt-section">
      <div className={container}>
        <SectionHeading>{dict.sections.skills}</SectionHeading>
        <div className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((skill, index) => (
            <div key={skill.id} className="border-r border-b border-line p-6 md:p-8">
              <p className="text-xs font-medium tracking-[0.2em] text-subtle">
                {counter(index, items.length)}
              </p>
              <h3 className="mt-4 text-title font-semibold">{skill.name}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {skill.keywords.map((keyword) => (
                  <li
                    key={keyword}
                    className="border border-line px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
