import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../ui/FormField'
import FormTextarea from '../ui/FormTextarea'
import { Button, ButtonLink } from '../ui/Button'
import ImagePicker from './ImagePicker'
import { useImagePicker } from '../../hooks/useImagePicker'
import { getStorageImageUrl } from '../../lib/images'
import { slugify } from '../../lib/destinationForm'
import {
  emptyCategoryValues,
  toCategoryInput,
  validateCategoryForm,
  valuesFromCategory,
  type CategoryFormErrors,
  type CategoryFormValues,
} from '../../lib/categoryForm'
import { DuplicateCategoryError, saveCategory } from '../../services/adminCategoryService'
import { uploadSiteImage } from '../../services/storageService'
import type { AdminCategory } from '../../types/adminCategory'

export default function CategoryForm({ category }: { category?: AdminCategory }) {
  const navigate = useNavigate()
  const isEditing = Boolean(category)

  const [values, setValues] = useState<CategoryFormValues>(() =>
    category ? valuesFromCategory(category) : emptyCategoryValues(),
  )
  const [slugEdited, setSlugEdited] = useState(false)
  const picker = useImagePicker()
  const [errors, setErrors] = useState<CategoryFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function setField<K extends keyof CategoryFormValues>(key: K, value: CategoryFormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  function handleNameChange(name: string) {
    setValues((previous) => ({
      ...previous,
      name,
      // For a new category, build the web address from the name until it is edited by hand.
      slug: isEditing || slugEdited ? previous.slug : slugify(name),
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const nextErrors = validateCategoryForm(values, {
      requireImage: !isEditing,
      hasImage: Boolean(picker.file),
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setFormError('Please fix the highlighted fields.')
      return
    }

    setSaving(true)
    try {
      let imagePath = category?.imagePath ?? null
      if (picker.file) {
        // Category tiles are shown fairly small, so 1200 px wide is plenty.
        imagePath = await uploadSiteImage(picker.file, 'categories', values.slug.trim(), 1200)
      }

      await saveCategory(toCategoryInput(values, imagePath), category?.id)
      navigate('/admin/categories', { state: { message: `Saved "${values.name.trim()}".` } })
    } catch (error) {
      console.error(error)
      setFormError(
        error instanceof DuplicateCategoryError
          ? error.message
          : 'We could not save this category. Please try again.',
      )
    } finally {
      setSaving(false)
    }
  }

  const previewSrc =
    picker.previewUrl ?? (category?.imagePath ? getStorageImageUrl(category.imagePath) : null)

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl space-y-6">
      {formError && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {formError}
        </p>
      )}

      <FormField
        label="Name"
        maxLength={100}
        value={values.name}
        onChange={(event) => handleNameChange(event.target.value)}
        error={errors.name}
      />
      <FormField
        label="Web address name"
        maxLength={100}
        hint={
          isEditing
            ? 'Used in filter links such as /destinations?category=beaches. Changing it breaks old links.'
            : 'Used in filter links. Filled in from the name.'
        }
        value={values.slug}
        onChange={(event) => {
          setSlugEdited(true)
          setField('slug', event.target.value)
        }}
        error={errors.slug}
      />
      <FormTextarea
        label="Description"
        maxLength={200}
        className="min-h-24"
        hint={`${values.description.length} / 200 characters. Shown on the category tile.`}
        value={values.description}
        onChange={(event) => setField('description', event.target.value)}
        error={errors.description}
      />

      <ImagePicker
        label={isEditing ? 'Replace the photo (optional)' : 'Choose a photo'}
        previewSrc={previewSrc}
        onChange={picker.onChange}
        aspectClass="aspect-[4/3]"
        error={picker.error ?? (picker.file ? null : errors.image)}
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

      <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? 'Saving...' : isEditing ? 'Save changes' : 'Add category'}
        </Button>
        <ButtonLink to="/admin/categories" variant="outline" size="lg">
          Cancel
        </ButtonLink>
      </div>
    </form>
  )
}