import { useCallback, useEffect, useState, type ChangeEvent } from 'react'

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024

export function useImagePicker() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const picked = event.target.files?.[0]
    if (!picked) return

    if (!ACCEPTED_IMAGE_TYPES.includes(picked.type) || picked.size > MAX_UPLOAD_BYTES) {
      setError('Choose a JPEG, PNG or WebP image under 15 MB.')
      event.target.value = ''
      return
    }

    setError(null)
    setFile(picked)
    setPreviewUrl(URL.createObjectURL(picked))
  }, [])

  return { file, previewUrl, error, onChange }
}