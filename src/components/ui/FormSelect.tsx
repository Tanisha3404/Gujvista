import { useId, type SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
  error?: string | null
}

export default function FormSelect({
  label,
  options,
  placeholder,
  error,
  className,
  ...selectProps
}: FormSelectProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white/90">
        {label}
      </label>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'h-11 w-full rounded-xl border bg-ink px-4 text-sm text-white transition-colors hover:border-white/25 focus:border-accent [color-scheme:dark]',
          error ? 'border-red-400' : 'border-white/10',
          className,
        )}
        {...selectProps}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}