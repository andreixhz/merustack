import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { formatDuration, getProjects, type Project } from '@/data/projects'
import { container, counter } from '@/lib/ui'
import SectionHeading, { Eyebrow } from '@/components/SectionHeading'
import ProjectGallery from './ProjectGallery'

function ProjectBand({
  project,
  index,
  total,
  dict,
  locale,
}: {
  project: Project
  index: number
  total: number
  dict: Dictionary
  locale: Locale
}) {
  const labels = dict.projects
  const [title, subtitle] = project.name.split(' — ')
  // Alternate the band background and which side the images sit on.
  const odd = index % 2 === 1

  return (
    <article className={odd ? 'bg-ink' : 'bg-surface'}>
      <div className={`${container} grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2 lg:gap-16`}>
        <div className={odd ? 'lg:order-2' : ''}>
          <p className="text-xs font-medium tracking-[0.2em] text-subtle">{counter(index, total)}</p>

          <h3 className="mt-5 font-display text-headline uppercase [overflow-wrap:anywhere]">{title}</h3>
          {subtitle && <p className="mt-3 text-xl text-muted">{subtitle}</p>}

          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-semibold">
            <span>{project.endedAt ? labels.completed : labels.ongoing}</span>
            <span className="text-subtle" aria-hidden>
              ·
            </span>
            <span className="font-medium text-muted">
              {formatDuration(project, locale, labels.present)}
            </span>
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-fg/85">{project.description}</p>

          {project.tech.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={labels.tech}>
              {project.tech.map((tech) => (
                <li key={tech} className="border border-line px-2.5 py-1 text-xs font-medium text-muted">
                  {tech}
                </li>
              ))}
            </ul>
          )}

          {project.skills.length > 0 && (
            <div className="mt-6">
              <Eyebrow>{labels.skillsUsed}</Eyebrow>
              <p className="mt-2 text-sm text-muted">{project.skills.join(' · ')}</p>
            </div>
          )}
        </div>

        <div className={odd ? 'lg:order-1' : ''}>
          <ProjectGallery
            images={project.images}
            name={project.name}
            index={index}
            labels={labels}
          />
        </div>
      </div>
    </article>
  )
}

export default function Projects({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const projects = getProjects(locale)
  if (projects.length === 0) return null

  return (
    <section id="projects" className="scroll-mt-0 bg-ink pt-section">
      <div className={`${container} pb-14`}>
        <SectionHeading>{dict.sections.projects}</SectionHeading>
      </div>
      {projects.map((project, index) => (
        <ProjectBand
          key={project.id}
          project={project}
          index={index}
          total={projects.length}
          dict={dict}
          locale={locale}
        />
      ))}
    </section>
  )
}
