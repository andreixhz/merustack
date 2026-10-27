import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { getProjects } from '@/data/projects'
import { buttonSecondary, container } from '@/lib/ui'
import { portfolioPath } from '@/lib/routes'
import SectionHeading from '@/components/SectionHeading'
import { ArrowUpRight } from '@/components/icons'
import ProjectGallery from '@/components/sections/ProjectGallery'

const MAX_PROJECTS = 6
const MAX_TECH = 4

/** Compact project cards; the full write-ups live on the portfolio page. */
export default function HomeProjects({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const copy = dict.home.projects
  const projects = getProjects(locale).slice(0, MAX_PROJECTS)
  if (projects.length === 0) return null

  return (
    <section id="projects" className="scroll-mt-0 bg-ink pt-section">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading>{copy.title}</SectionHeading>
          </div>
          <p className="max-w-md text-lg text-muted lg:col-span-5 lg:justify-self-end">
            {copy.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const [title, subtitle] = project.name.split(' — ')
            return (
              <article key={project.id}>
                <ProjectGallery
                  images={project.images.slice(0, 1)}
                  name={project.name}
                  index={index}
                  labels={dict.projects}
                />
                <h3 className="mt-5 font-display text-title uppercase [overflow-wrap:anywhere]">
                  {title}
                </h3>
                {subtitle && <p className="mt-1 text-base text-muted">{subtitle}</p>}
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={dict.projects.tech}>
                  {project.tech.slice(0, MAX_TECH).map((tech) => (
                    <li
                      key={tech}
                      className="border border-line px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <a href={`${portfolioPath(locale)}#projects`} className={`${buttonSecondary} mt-12`}>
          {copy.cta}
          <ArrowUpRight />
        </a>
      </div>
    </section>
  )
}
