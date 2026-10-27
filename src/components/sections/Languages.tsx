import type { Dictionary } from '@/i18n/dictionaries'
import type { Resume } from '@/lib/types'
import { visibleItems } from '@/data/resume'
import { Eyebrow } from '@/components/SectionHeading'

/** Compact language list shown in the About section's side column. */
export default function Languages({ dict, resume }: { dict: Dictionary; resume: Resume }) {
  const languages = visibleItems(resume.sections.languages.items)
  if (languages.length === 0) return null

  return (
    <div>
      <Eyebrow>{dict.sections.languages}</Eyebrow>
      <ul className="mt-5 border-t border-line">
        {languages.map((lang) => (
          <li
            key={lang.id}
            className="flex items-baseline justify-between gap-4 border-b border-line py-4"
          >
            <span className="font-medium">{lang.language}</span>
            <span className="text-sm text-muted">{lang.fluency}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
