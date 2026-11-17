import { useId, type ChangeEvent } from 'react'
import { ACCEPTED_IMAGE_TYPES } from '../../hooks/useImagePicker'
import { cn } from '../../lib/utils'

interface ImagePickerProps {
  label: string
  previewSrc: string | null
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  error?: string | null
  hint?: string
  aspectClass?: string
}

export default function ImagePicker({
  label,
  previewSrc,
  onChange,
  error,
  hint = 'JPEG, PNG or WebP. Large photos are resized automatically.',
  aspectClass = 'aspect-[16/10]',
}: ImagePickerProps) {
  const id = useId()
  const hintId = `${id}-hint`

  return (
    <div className="space-y-4">
      {previewSrc ? (
        <img
          src={previewSrc}
          alt="Preview of the photo"
          className={cn('w-full max-w-md rounded-2xl object-cover', aspectClass)}
        />
      ) : (
        <div
          className={cn(
            'flex w-full max-w-md items-center justify-center rounded-2xl border border-dashed border-white/20 text-sm text-muted',
            aspectClass,
          )}
        >
          No photo yet
        </div>
      )}

      <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white/90">
          {label}
        </label>
        <input
          id={id}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          onChange={onChange}
          aria-describedby={hintId}
          className="block w-full max-w-md text-sm text-white file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink hover:file:bg-accent/90"
        />
        <p id={hintId} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
        {error && <p className="mt-1.5 text-sm text-red-300">{error}</p>}
      </div>
    </div>
  )
}