import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../ui/FormField'
import FormTextarea from '../ui/FormTextarea'
import FormSelect from '../ui/FormSelect'
import FormCheckbox from '../ui/FormCheckbox'
import { Button, ButtonLink } from '../ui/Button'
import { getStorageImageUrl } from '../../lib/images'
import {
  emptyFormValues,
  slugify,
  toDestinationInput,
  validateDestinationForm,
  valuesFromDestination,
  type DestinationFormErrors,
  type DestinationFormValues,
} from '../../lib/destinationForm'
import {
  DuplicateSlugError,
  saveDestination,
  uploadDestinationImage,
} from '../../services/adminDestinationService'
import type { AdminDestination } from '../../types/adminDestination'
import type { Category } from '../../types/category'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024

interface DestinationFormProps {
  categories: Category[]
  destination?: AdminDestination // present when editing
}

function SectionTitle({ children }: { children: string }) {
  return <h3 className="border-b border-white/10 pb-2 text-lg font-semibold">{children}</h3>
}

export default function DestinationForm({ categories, destination }: DestinationFormProps) {
  const navigate = useNavigate()
  const fileInputId = useId()
  const isEditing = Boolean(destination)

  const [values, setValues] = useState<DestinationFormValues>(() =>
    destination ? valuesFromDestination(destination) : emptyFormValues(),
  )
  const [slugEdited, setSlugEdited] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [errors, setErrors] = useState<DestinationFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // clean up the preview URL when a new file is selected
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function setField<K extends keyof DestinationFormValues>(key: K, value: DestinationFormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  function handleNameChange(name: string) {
    setValues((previous) => ({
      ...previous,
      name,
      // only update the slug if the user hasn't edited it manually
      slug: isEditing || slugEdited ? previous.slug : slugify(name),
    }))
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type) || file.size > MAX_UPLOAD_BYTES) {
      setErrors((previous) => ({ ...previous, image: 'Choose a JPEG, PNG or WebP image under 15 MB.' }))
      event.target.value = ''
      return
    }

    setErrors((previous) => ({ ...previous, image: undefined }))
    setImageFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const nextErrors = validateDestinationForm(values, {
      requireImage: !isEditing,
      hasImage: Boolean(imageFile),
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setFormError('Please fix the highlighted fields.')
      return
    }

    setSaving(true)
    try {
      let imagePath = destination?.mainImagePath ?? null
      if (imageFile) imagePath = await uploadDestinationImage(imageFile, values.slug.trim())

      await saveDestination(toDestinationInput(values, imagePath), destination?.id)
      navigate('/admin/destinations', { state: { message: `Saved "${values.name.trim()}".` } })
    } catch (error) {
      console.error(error)
      if (error instanceof DuplicateSlugError) {
        setErrors((previous) => ({ ...previous, slug: error.message }))
        setFormError('Please fix the highlighted fields.')
      } else {
        setFormError('We could not save this destination. Please try again.')
      }
    } finally {
      setSaving(false)
    }
  }

  const previewSrc = previewUrl ?? (destination?.mainImagePath ? getStorageImageUrl(destination.mainImagePath) : null)

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-3xl space-y-10">
      {formError && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {formError}
        </p>
      )}

      <section className="space-y-5">
        <SectionTitle>Basics</SectionTitle>
        <FormField
          label="Name"
          maxLength={150}
          value={values.name}
          onChange={(event) => handleNameChange(event.target.value)}
          error={errors.name}
        />
        <FormField
          label="Web address name"
          maxLength={150}
          hint={
            isEditing
              ? 'Used in the page address. Changing it changes the destination page address.'
              : 'Used in the page address, for example "rani-ki-vav". Filled in from the name.'
          }
          value={values.slug}
          onChange={(event) => {
            setSlugEdited(true)
            setField('slug', event.target.value)
          }}
          error={errors.slug}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="District"
            maxLength={100}
            value={values.district}
            onChange={(event) => setField('district', event.target.value)}
            error={errors.district}
          />
          <FormSelect
            label="Category"
            placeholder="Choose a category"
            options={categories.map((category) => ({ value: category.id, label: category.name }))}
            value={values.categoryId}
            onChange={(event) => setField('categoryId', event.target.value)}
            error={errors.categoryId}
          />
        </div>
      </section>

      <section className="space-y-5">
        <SectionTitle>Location</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Latitude"
            type="number"
            step="any"
            inputMode="decimal"
            hint="Between -90 and 90. Check it on openstreetmap.org."
            value={values.latitude}
            onChange={(event) => setField('latitude', event.target.value)}
            error={errors.latitude}
          />
          <FormField
            label="Longitude"
            type="number"
            step="any"
            inputMode="decimal"
            hint="Between -180 and 180."
            value={values.longitude}
            onChange={(event) => setField('longitude', event.target.value)}
            error={errors.longitude}
          />
        </div>
      </section>

      <section className="space-y-5">
        <SectionTitle>Descriptions</SectionTitle>
        <FormTextarea
          label="Short description"
          maxLength={300}
          className="min-h-24"
          hint={`${values.shortDescription.length} / 300 characters. Shown on cards.`}
          value={values.shortDescription}
          onChange={(event) => setField('shortDescription', event.target.value)}
          error={errors.shortDescription}
        />
        <FormTextarea
          label="Full description (overview)"
          value={values.fullDescription}
          onChange={(event) => setField('fullDescription', event.target.value)}
          error={errors.fullDescription}
        />
        <FormTextarea
          label="Historical and cultural significance"
          value={values.historicalSignificance}
          onChange={(event) => setField('historicalSignificance', event.target.value)}
          error={errors.historicalSignificance}
        />
        <FormField
          label="Best time to visit"
          value={values.bestTimeToVisit}
          onChange={(event) => setField('bestTimeToVisit', event.target.value)}
          error={errors.bestTimeToVisit}
        />
        <FormTextarea
          label="Travel tips"
          className="min-h-24"
          value={values.travelTips}
          onChange={(event) => setField('travelTips', event.target.value)}
          error={errors.travelTips}
        />
      </section>

      <section className="space-y-5">
        <SectionTitle>Lists</SectionTitle>
        <FormTextarea
          label="Major attractions"
          className="min-h-28"
          hint="One per line."
          value={values.majorAttractions}
          onChange={(event) => setField('majorAttractions', event.target.value)}
          error={errors.majorAttractions}
        />
        <FormTextarea
          label="Things to do"
          className="min-h-28"
          hint="One per line."
          value={values.thingsToDo}
          onChange={(event) => setField('thingsToDo', event.target.value)}
          error={errors.thingsToDo}
        />
      </section>

      <section className="space-y-5">
        <SectionTitle>Main photo</SectionTitle>
        {previewSrc ? (
          <img
            src={previewSrc}
            alt="Preview of the main photo"
            className="aspect-[16/10] w-full max-w-md rounded-2xl object-cover"
          />
        ) : (
          <div className="flex aspect-[16/10] w-full max-w-md items-center justify-center rounded-2xl border border-dashed border-white/20 text-sm text-muted">
            No photo yet
          </div>
        )}
        <div>
          <label htmlFor={fileInputId} className="mb-1.5 block text-sm font-medium text-white/90">
            {isEditing ? 'Replace the photo (optional)' : 'Choose a photo'}
          </label>
          <input
            id={fileInputId}
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            onChange={handleFileChange}
            aria-describedby={`${fileInputId}-hint`}
            className="block w-full max-w-md text-sm text-white file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink hover:file:bg-accent/90"
          />
          <p id={`${fileInputId}-hint`} className="mt-1.5 text-xs text-muted">
            JPEG, PNG or WebP. Large photos are resized to 1600 px wide automatically.
          </p>
          {errors.image && <p className="mt-1.5 text-sm text-red-300">{errors.image}</p>}
        </div>
      </section>

      <section className="space-y-5">
        <SectionTitle>Where it appears</SectionTitle>
        <FormCheckbox
          label="Featured"
          description="Show in Top Destinations on the homepage (the homepage shows up to 6)."
          checked={values.isFeatured}
          onChange={(event) => setField('isFeatured', event.target.checked)}
        />
        <FormCheckbox
          label="Hidden gem"
          description="Show in the Hidden Gems section on the homepage."
          checked={values.isHiddenGem}
          onChange={(event) => setField('isHiddenGem', event.target.checked)}
        />
        <div className="max-w-xs">
          <FormField
            label="Display order"
            type="number"
            inputMode="numeric"
            hint="Lower numbers come first on the homepage."
            value={values.sortOrder}
            onChange={(event) => setField('sortOrder', event.target.value)}
            error={errors.sortOrder}
          />
        </div>
      </section>

      <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? 'Saving...' : isEditing ? 'Save changes' : 'Add destination'}
        </Button>
        <ButtonLink to="/admin/destinations" variant="outline" size="lg">
          Cancel
        </ButtonLink>
      </div>
    </form>
  )
}