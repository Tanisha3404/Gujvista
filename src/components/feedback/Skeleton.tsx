import { cn } from '../../lib/utils'

export default function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('animate-pulse rounded-2xl bg-white/5', className)} />
}