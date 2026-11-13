import Skeleton from '../feedback/Skeleton'

// Same outer shape as DestinationCard, so the page doesn't jump when data arrives.
export default function DestinationCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-surface">
      <Skeleton className="aspect-[5/4] rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-2/3 rounded-md" />
        <Skeleton className="h-4 w-1/3 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-9 w-32 rounded-full" />
      </div>
    </div>
  )
}