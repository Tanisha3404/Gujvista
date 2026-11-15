import { useState, type FormEvent } from 'react'
import { Check } from 'lucide-react'
import FormField from '../ui/FormField'
import FormTextarea from '../ui/FormTextarea'
import { Button } from '../ui/Button'
import { submitFeedback } from '../../services/feedbackService'
import {
  EMAIL_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
  SUBJECT_MAX_LENGTH,
  validateEmail,
  validateFullName,
  validateMessage,
  validateSubject,
} from '../../lib/validation'

type FieldErrors = Partial<Record<'name' | 'email' | 'subject' | 'message', string | null>>

interface ContactFormProps {
  initialName: string
  initialEmail: string
}

export default function ContactForm({ initialName, initialEmail }: ContactFormProps) {
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('') // real visitors never see or fill this
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // A bot filled the hidden field. Pretend it worked and send nothing.
    if (honeypot) {
      setSent(true)
      return
    }

    const nextErrors: FieldErrors = {
      name: validateFullName(name),
      email: validateEmail(email),
      subject: validateSubject(subject),
      message: validateMessage(message),
    }
    setErrors(nextErrors)
    setFormError(null)
    if (Object.values(nextErrors).some(Boolean)) return

    setSubmitting(true)
    try {
      await submitFeedback({ name, email, subject, message })
      setSent(true)
    } catch (error) {
      console.error(error)
      setFormError("We couldn't send your message. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  function writeAnother() {
    setSubject('')
    setMessage('')
    setErrors({})
    setSent(false)
  }

  if (sent) {
    return (
      <div role="status" className="py-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Check size={28} aria-hidden="true" />
        </div>
        <h2 className="mt-5 text-2xl font-bold">Thank you</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Your message has been sent.
        </p>
        <Button variant="outline" className="mt-6" onClick={writeAnother}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
      {formError && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {formError}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Name"
          autoComplete="name"
          maxLength={NAME_MAX_LENGTH}
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
        />
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          maxLength={EMAIL_MAX_LENGTH}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />
      </div>

      <FormField
        label="Subject"
        maxLength={SUBJECT_MAX_LENGTH}
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
        error={errors.subject}
      />

      <FormTextarea
        label="Message"
        maxLength={MESSAGE_MAX_LENGTH}
        hint={`${message.length} / ${MESSAGE_MAX_LENGTH} characters`}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        error={errors.message}
      />

      {/* Honeypot: hidden from people, but bots tend to fill every field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input
            type="text"
            name="contact_url"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}