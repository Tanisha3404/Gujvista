import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../ui/FormField'
import FormTextarea from '../ui/FormTextarea'
import FormSelect from '../ui/FormSelect'
import { Button, ButtonLink } from '../ui/Button'
import ImagePicker from './ImagePicker'
import ArticleBody from '../guides/ArticleBody'
import { useImagePicker } from '../../hooks/useImagePicker'
import { getStorageImageUrl } from '../../lib/images'
import { slugify } from '../../lib/destinationForm'
import {
  CONTENT_MAX_LENGTH,
  EXCERPT_MAX_LENGTH,
  emptyPostValues,
  toPostInput,
  validatePostForm,
  valuesFromPost,
  type PostFormErrors,
  type PostFormValues,
} from '../../lib/postForm'
import { DuplicatePostSlugError, savePost } from '../../services/adminPostService'
import { uploadSiteImage } from '../../services/storageService'
import type { AdminPost, PostStatus } from '../../types/adminPost'

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft (hidden from visitors)' },
  { value: 'published', label: 'Published (visible to everyone)' },
]

export default function PostForm({ post }: { post?: AdminPost }) {
  const navigate = useNavigate()
  const isEditing = Boolean(post)

  const [values, setValues] = useState<PostFormValues>(() =>
    post ? valuesFromPost(post) : emptyPostValues(),
  )
  const [slugEdited, setSlugEdited] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const picker = useImagePicker()
  const [errors, setErrors] = useState<PostFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function setField<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  function handleTitleChange(title: string) {
    setValues((previous) => ({
      ...previous,
      title,
      // For a new guide, build the web address from the title until it is edited by hand.
      slug: isEditing || slugEdited ? previous.slug : slugify(title),
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const nextErrors = validatePostForm(values, {
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
      let coverPath = post?.coverImagePath ?? null
      if (picker.file) coverPath = await uploadSiteImage(picker.file, 'guides', values.slug.trim())

      await savePost(toPostInput(values, coverPath), post?.id)
      navigate('/admin/guides', { state: { message: `Saved "${values.title.trim()}".` } })
    } catch (error) {
      console.error(error)
      if (error instanceof DuplicatePostSlugError) {
        setErrors((previous) => ({ ...previous, slug: error.message }))
        setFormError('Please fix the highlighted fields.')
      } else {
        setFormError('We could not save this guide. Please try again.')
      }
    } finally {
      setSaving(false)
    }
  }

  const previewSrc =
    picker.previewUrl ?? (post?.coverImagePath ? getStorageImageUrl(post.coverImagePath) : null)

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-3xl space-y-8">
      {formError && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {formError}
        </p>
      )}

      <FormField
        label="Title"
        maxLength={200}
        value={values.title}
        onChange={(event) => handleTitleChange(event.target.value)}
        error={errors.title}
      />
      <FormField
        label="Web address name"
        maxLength={200}
        hint={
          isEditing
            ? 'Used in the guide address. Changing it changes the address, and old links stop working.'
            : 'Used in the guide address. Filled in from the title.'
        }
        value={values.slug}
        onChange={(event) => {
          setSlugEdited(true)
          setField('slug', event.target.value)
        }}
        error={errors.slug}
      />
      <FormTextarea
        label="Short summary"
        maxLength={EXCERPT_MAX_LENGTH}
        className="min-h-24"
        hint={`${values.excerpt.length} / ${EXCERPT_MAX_LENGTH} characters. Shown on the guide card.`}
        value={values.excerpt}
        onChange={(event) => setField('excerpt', event.target.value)}
        error={errors.excerpt}
      />

      <div>
        <FormTextarea
          label="Article text"
          maxLength={CONTENT_MAX_LENGTH}
          className="min-h-96 font-mono"
          hint="Separate paragraphs with a blank line. A line starting with ## is a heading (keep it alone, with a blank line before and after). Start every line of a list with - ."
          value={values.content}
          onChange={(event) => setField('content', event.target.value)}
          error={errors.content}
        />
        <Button
          variant="outline"
          className="mt-3"
          onClick={() => setShowPreview((visible) => !visible)}
          aria-expanded={showPreview}
        >
          {showPreview ? 'Hide preview' : 'Show preview'}
        </Button>
        {showPreview && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-surface p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted">
              Preview
            </p>
            <ArticleBody content={values.content} />
          </div>
        )}
      </div>

      <ImagePicker
        label={isEditing ? 'Replace the cover photo (optional)' : 'Choose a cover photo'}
        previewSrc={previewSrc}
        onChange={picker.onChange}
        error={picker.error ?? (picker.file ? null : errors.image)}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormSelect
          label="Status"
          options={STATUS_OPTIONS}
          value={values.status}
          onChange={(event) => setField('status', event.target.value as PostStatus)}
        />
        <FormField
          label="Publish date"
          type="date"
          hint="Used to order guides. Left blank, today's date is used when you publish."
          value={values.publishedAt}
          onChange={(event) => setField('publishedAt', event.target.value)}
          error={errors.publishedAt}
        />
      </div>

      <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? 'Saving...' : isEditing ? 'Save changes' : 'Add guide'}
        </Button>
        <ButtonLink to="/admin/guides" variant="outline" size="lg">
          Cancel
        </ButtonLink>
      </div>
    </form>
  )
}