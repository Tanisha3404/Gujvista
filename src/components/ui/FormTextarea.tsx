import { useId, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface FormTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label: string
  error?: string | null
  hint?: string
}

export default function FormTextarea({
  label,
  error,
  hint,
  className,
  ...textareaProps
}: FormTextareaProps) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white/90">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={cn(
          'min-h-36 w-full resize-y rounded-xl border bg-ink px-4 py-3 text-sm leading-relaxed text-white placeholder:text-muted transition-colors hover:border-white/25 focus:border-accent [color-scheme:dark]',
          error ? 'border-red-400' : 'border-white/10',
          className,
        )}
        {...textareaProps}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}