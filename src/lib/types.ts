/**
 * Typed subset of the Reactive Resume v5 export schema used by the portfolio.
 * Source data lives in src/data/resume.<locale>.json.
 */

export interface Website {
  url: string
  label?: string
  inlineLink?: boolean
}

export interface Basics {
  name: string
  headline: string
  email: string
  phone: string
  location: string
  website: Website
}

export interface Summary {
  /** Raw HTML (<p>, <strong>, ...). */
  content: string
}

export interface Profile {
  id: string
  hidden: boolean
  network: string
  username: string
  website: Website
}

export interface Role {
  id: string
  position: string
  period: string
  /** Raw HTML. */
  description: string
}

export interface ExperienceItem {
  id: string
  hidden: boolean
  company: string
  position: string
  location: string
  period: string
  website: Website
  /** Raw HTML; empty when the item uses nested roles instead. */
  description: string
  roles: Role[]
}

export interface EducationItem {
  id: string
  hidden: boolean
  school: string
  degree: string
  area: string
  grade: string
  location: string
  period: string
  description: string
}

export interface Skill {
  id: string
  hidden: boolean
  name: string
  /** 0–5; 0 means "unrated / no bar shown". */
  level: number
  keywords: string[]
}

export interface LanguageItem {
  id: string
  hidden: boolean
  language: string
  fluency: string
  level: number
}

export interface Section<T> {
  title: string
  columns: number
  hidden: boolean
  items: T[]
}

export interface Resume {
  basics: Basics
  summary: Summary
  sections: {
    profiles: Section<Profile>
    experience: Section<ExperienceItem>
    education: Section<EducationItem>
    skills: Section<Skill>
    languages: Section<LanguageItem>
  }
}
