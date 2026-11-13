import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
}

// Centres content and gives every section the same side padding.
export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8', className)}>
      {children}
    </div>
  )
}