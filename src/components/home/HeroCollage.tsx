import { cn } from '../../lib/utils'

interface HeroCollageProps {
  door: string
  stepwell: string
  beach: string
}

// Tall and narrow (set with aspect-ratio) plus fully rounded ends = a capsule.
function Capsule({ src, className }: { src: string; className?: string }) {
  return (
    <div className={cn('shrink-0 overflow-hidden rounded-full', className)}>
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  )
}

export default function HeroCollage({ door, stepwell, beach }: HeroCollageProps) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex h-[400px] w-full items-center justify-center gap-4 sm:h-[480px] lg:h-[600px]"
    >
      {/* Soft indigo glow behind the photos */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(88,70,200,0.4),transparent)]" />

      {/* Large capsule, 2 wide to 5 tall */}
      <Capsule src={door} className="relative aspect-[2/5] h-[78%]" />

      {/* Two smaller capsules stacked. They stick out above and below the large one. */}
      <div className="relative flex h-full flex-col justify-between">
        <Capsule src={stepwell} className="aspect-[1/2] h-[47%]" />
        <Capsule src={beach} className="aspect-[1/2] h-[47%]" />
      </div>
    </div>
  )
}