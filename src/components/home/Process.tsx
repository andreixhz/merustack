import type { Dictionary } from '@/i18n/dictionaries'
import { container } from '@/lib/ui'
import SectionHeading from '@/components/SectionHeading'

export default function Process({ copy }: { copy: Dictionary['home']['process'] }) {
  return (
    <section id="process" className="scroll-mt-0 bg-ink pt-section">
      <div className={container}>
        <SectionHeading>{copy.title}</SectionHeading>
        <ol className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="border-r border-b border-line p-6 md:p-8">
              <span className="font-display text-headline text-fg/20" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-8 text-title font-semibold">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
