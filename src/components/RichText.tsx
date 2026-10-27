/**
 * Renders trusted HTML coming from our own resume JSON (summary / experience
 * descriptions). Tailwind arbitrary variants style the nested <ul>/<li>/<strong>.
 */
export default function RichText({
  html,
  className = '',
}: {
  html: string
  className?: string
}) {
  return (
    <div
      className={
        'space-y-2 text-sm leading-relaxed text-muted ' +
        '[&_strong]:font-semibold [&_strong]:text-fg ' +
        '[&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:marker:text-subtle ' +
        '[&_a]:text-fg [&_a]:underline [&_p:empty]:hidden ' +
        className
      }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
