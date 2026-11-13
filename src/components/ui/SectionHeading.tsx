import { cn } from '../../lib/utils'

interface SectionHeadingProps {
  title: string
  eyebrow?: string
  description?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' // use "h1" for a page's main title
}

export default function SectionHeading({
  title,
  eyebrow,
  description,
  align = 'left',
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <Heading className="text-3xl font-bold leading-tight sm:text-4xl">{title}</Heading>
      {description && <p className="mt-4 text-muted">{description}</p>}
    </div>
  )
}