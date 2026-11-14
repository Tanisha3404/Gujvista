import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/auth/AuthCard'
import FormField from '../components/ui/FormField'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { validateFullName } from '../lib/validation'

export default function ProfilePage() {
  const { user, profile, isAdmin, signOut, updateFullName } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState(profile?.full_name ?? '')
  const [nameError, setNameError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  if (!user) return null // RequireAuth guarantees a user; this keeps TypeScript happy.

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const error = validateFullName(fullName)
    setNameError(error)
    setFormError(null)
    setSaved(false)
    if (error) return

    setSaving(true)
    try {
      await updateFullName(fullName.trim())
      setSaved(true)
    } catch (err) {
      console.error(err)
      setFormError('We could not save your changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleSignOut() {
    try {
      await signOut()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AuthCard title="Your profile">
      <dl className="mb-6 space-y-4 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-muted">Email</dt>
          <dd className="mt-1 break-all">{user.email}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-muted">Account type</dt>
          <dd className="mt-1">{isAdmin ? 'Administrator' : 'Member'}</dd>
        </div>
      </dl>

      <form onSubmit={handleSave} noValidate className="space-y-5">
        {formError && (
          <p
            role="alert"
            className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200"
          >
            {formError}
          </p>
        )}
        {saved && (
          <p role="status" className="text-sm text-accent">
            Saved.
          </p>
        )}
        <FormField
          label="Full name"
          autoComplete="name"
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value)
            setSaved(false)
          }}
          error={nameError}
        />
        <Button type="submit" size="lg" className="w-full" disabled={saving}>
          {saving ? 'Saving...' : 'Save changes'}
        </Button>
      </form>

      <div className="mt-6 border-t border-white/10 pt-6">
        <Button variant="outline" className="w-full" onClick={handleSignOut}>
          Log out
        </Button>
      </div>
    </AuthCard>
  )
}