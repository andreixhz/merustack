/** Small uppercase label used above content blocks ("About", "Languages"). */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.2em] text-subtle">{children}</p>
  )
}

/** Oversized display title that opens a section ("EXPERIENCE", "PROJECTS"). */
export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-display uppercase [overflow-wrap:anywhere]">{children}</h2>
  )
}
