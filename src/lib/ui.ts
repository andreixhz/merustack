/** Shared page container: same max width and gutters for every section. */
export const container = 'mx-auto w-full max-w-site px-5 sm:px-8 lg:px-12'

/** Solid light button (primary call to action). */
export const buttonPrimary =
  'inline-flex items-center gap-2 bg-fg px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white'

/** Outlined button (secondary action). */
export const buttonSecondary =
  'inline-flex items-center gap-2 border border-fg/30 px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-fg'

/** "01 / 07" style position label used on numbered lists. */
export function counter(index: number, total: number): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(index + 1)} / ${pad(total)}`
}

/** A link in the header/footer navigation. */
export type NavItem = { href: string; label: string }
