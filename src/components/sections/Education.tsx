import type { Dictionary } from '@/i18n/dictionaries'
import type { Resume } from '@/lib/types'
import { visibleItems } from '@/data/resume'
import { Eyebrow } from '@/components/SectionHeading'

/** Compact education list shown in the About section's side column. */
export default function Education({ dict, resume }: { dict: Dictionary; resume: Resume }) {
  const items = visibleItems(resume.sections.education.items)
  if (items.length === 0) return null

  return (
    <div id="education" className="scroll-mt-24">
      <Eyebrow>{dict.sections.education}</Eyebrow>
      <ul className="mt-5 border-t border-line">
        {items.map((item) => (
          <li key={item.id} className="border-b border-line py-4">
            <p className="font-medium">
              {item.degree}
              {item.area && <span className="text-muted"> · {item.area}</span>}
            </p>
            {item.school && <p className="mt-0.5 text-sm text-muted">{item.school}</p>}
            {item.period && <p className="mt-1 text-xs text-subtle">{item.period}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
