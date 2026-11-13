import Skeleton from '../feedback/Skeleton'

export default function GuideCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-surface">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-4 w-1/2 rounded-md" />
        <Skeleton className="h-6 w-4/5 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-9 w-32 rounded-full" />
      </div>
    </div>
  )
}