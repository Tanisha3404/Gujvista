import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthCard from '../components/auth/AuthCard'
import FormField from '../components/ui/FormField'
import { Button, ButtonLink } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import {
  PASSWORD_MIN_LENGTH,
  validateEmail,
  validateFullName,
  validatePassword,
} from '../lib/validation'
import { friendlyAuthError } from '../lib/authErrors'

type FieldErrors = Partial<
  Record<'fullName' | 'email' | 'password' | 'confirmPassword', string | null>
>

export default function SignUpPage() {
  const { user, loading, signUp } = useAuth()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [confirmationSent, setConfirmationSent] = useState(false)

  // redirect to home if the user is already logged in
  if (!loading && user) return <Navigate to="/" replace />

  if (confirmationSent) {
    return (
      <AuthCard
        title="Check your email"
        description={`We sent a confirmation link to ${email.trim()}. Open it to activate your account, then log in.`}
      >
        <ButtonLink to="/login" size="lg" className="w-full">
          Go to log in
        </ButtonLink>
      </AuthCard>
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: FieldErrors = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: password === confirmPassword ? null : 'Passwords do not match.',
    }
    setErrors(nextErrors)
    setFormError(null)
    if (Object.values(nextErrors).some(Boolean)) return

    setSubmitting(true)
    try {
      const result = await signUp(fullName.trim(), email.trim(), password)
      if (result.needsEmailConfirmation) setConfirmationSent(true)
      // on success the provider updates "user" and this page redirects by itself
    } catch (error) {
      console.error(error)
      setFormError(friendlyAuthError(error instanceof Error ? error.message : ''))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthCard
      title="Create your account"
      description="Save your favourite destinations and find them again whenever you log in."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Log in
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
          label="Full name"
          autoComplete="name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          error={errors.fullName}
        />
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />
        <FormField
          label="Password"
          type="password"
          autoComplete="new-password"
          hint={`At least ${PASSWORD_MIN_LENGTH} characters.`}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        <FormField
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={errors.confirmPassword}
        />
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Sign up'}
        </Button>
      </form>
    </AuthCard>
  )
}