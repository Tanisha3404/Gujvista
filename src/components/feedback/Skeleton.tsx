import { cn } from '../../lib/utils'

// A pulsing placeholder block shown while content loads.
export default function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('animate-pulse rounded-2xl bg-white/5', className)} />
}