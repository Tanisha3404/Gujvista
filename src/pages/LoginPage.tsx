import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import AuthCard from '../components/auth/AuthCard'
import FormField from '../components/ui/FormField'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { validateEmail } from '../lib/validation'
import { friendlyAuthError } from '../lib/authErrors'

export default function LoginPage() {
  const { user, loading, signIn } = useAuth()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to={from} replace />

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextEmailError = validateEmail(email)
    const nextPasswordError = password ? null : 'Enter your password.'
    setEmailError(nextEmailError)
    setPasswordError(nextPasswordError)
    setFormError(null)
    if (nextEmailError || nextPasswordError) return

    setSubmitting(true)
    try {
      await signIn(email.trim(), password)
      // on success the provider updates "user"
    } catch (error) {
      console.error(error)
      setFormError(friendlyAuthError(error instanceof Error ? error.message : ''))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthCard
      title="Log in"
      description="Welcome back. Log in to see your saved places."
      footer={
        <>
          New to GujVista?{' '}
          <Link to="/signup" className="text-accent hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {formError && (
          <p
            role="alert"
            className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200"
          >
            {formError}
          </p>
        )}
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={emailError}
        />
        <FormField
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={passwordError}
        />
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
    </AuthCard>
  )
}