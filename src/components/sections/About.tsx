import type { Dictionary } from '@/i18n/dictionaries'
import type { Resume } from '@/lib/types'
import { container } from '@/lib/ui'
import { Eyebrow } from '@/components/SectionHeading'
import RichText from '@/components/RichText'
import Education from './Education'
import Languages from './Languages'

export default function About({ dict, resume }: { dict: Dictionary; resume: Resume }) {
  return (
    <section id="about" className="scroll-mt-18 bg-ink py-section">
      <div className={`${container} grid gap-14 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-7">
          <Eyebrow>{dict.sections.about}</Eyebrow>
          <RichText
            html={resume.summary.content}
            className="mt-6 space-y-5 text-xl leading-snug font-medium text-fg/90 md:text-2xl md:leading-snug"
          />
        </div>

        <div className="space-y-12 lg:col-span-5">
          <Education dict={dict} resume={resume} />
          <Languages dict={dict} resume={resume} />
        </div>
      </div>
    </section>
  )
}
