/** Scrolling strip of short labels (technologies, services) between sections. */
export default function TechMarquee({ items }: { items: string[] }) {
  if (items.length === 0) return null

  // The list is rendered twice so the -50% translate loops seamlessly.
  const strip = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-display text-2xl whitespace-nowrap uppercase">{item}</span>
          <span className="text-sm text-subtle" aria-hidden>
            ◆
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="group overflow-hidden border-y border-line bg-ink py-5">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  )
}
