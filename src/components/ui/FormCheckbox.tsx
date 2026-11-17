import { useId, type InputHTMLAttributes } from 'react'

interface FormCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  label: string
  description?: string
}

export default function FormCheckbox({ label, description, ...inputProps }: FormCheckboxProps) {
  const id = useId()
  const descriptionId = `${id}-description`

  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        aria-describedby={description ? descriptionId : undefined}
        className="mt-1 h-4 w-4 shrink-0 accent-accent"
        {...inputProps}
      />
      <div>
        <label htmlFor={id} className="text-sm font-medium text-white/90">
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="mt-0.5 text-xs text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}