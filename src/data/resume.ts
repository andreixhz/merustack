import type { Locale } from '@/i18n/config'
import type { Resume } from '@/lib/types'
import en from './resume.en.json'
import pt from './resume.pt.json'

// The JSON files carry extra sections (projects, awards, ...) we don't type;
// casting through `unknown` keeps the consumer-facing type clean.
const resumes: Record<Locale, Resume> = {
  en: en as unknown as Resume,
  pt: pt as unknown as Resume,
}

export function getResume(locale: Locale): Resume {
  return resumes[locale]
}

/** Convenience helpers that hide hidden items and empty sections. */
export function visibleItems<T extends { hidden: boolean }>(items: T[]): T[] {
  return items.filter((item) => !item.hidden)
}

/** Unique skill keywords, in resume order (used by the portfolio marquee). */
export function skillKeywords(resume: Resume, max = 18): string[] {
  return [...new Set(visibleItems(resume.sections.skills.items).flatMap((s) => s.keywords))].slice(0, max)
}
