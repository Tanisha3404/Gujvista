import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'outline' | 'light' | 'outlineDark'
type Size = 'md' | 'lg'

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50'

const variantStyles: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:bg-accent/90',
  outline: 'border border-white/20 text-white hover:border-accent hover:text-accent',
  light: 'bg-paper text-ink hover:bg-white',
  outlineDark: 'border border-ink/25 text-ink hover:bg-ink hover:text-white',
}

const sizeStyles: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

function buttonClasses(variant: Variant, size: Size, className?: string) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className)
}

interface CommonProps {
  variant?: Variant
  size?: Size
  children: ReactNode
}

// a standard HTML <button> with the same styling as the <ButtonLink> below
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}

// a router <Link> that looks like a button used for navigation
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & LinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Link>
  )
}