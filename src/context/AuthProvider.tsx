import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import { AuthContext, type AuthContextValue, type Profile } from './AuthContext'

interface ProfileState {
  userId: string
  profile: Profile | null
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [sessionReady, setSessionReady] = useState(false)
  const [profileState, setProfileState] = useState<ProfileState | null>(null)

  // Fires once at start (restoring a saved session), then on every sign-in/out.
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setSessionReady(true)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const user = session?.user ?? null
  const userId = user?.id ?? null

  // Load the signed-in user's profile (name and role).
  useEffect(() => {
    if (!userId) return
    let ignore = false

    supabase
      .from('profiles')
      .select('id, full_name, avatar_url, role')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (ignore) return
        if (error) console.error(error)
        setProfileState({ userId, profile: (data as Profile | null) ?? null })
      })

    return () => {
      ignore = true
    }
  }, [userId])

  const profile = userId && profileState?.userId === userId ? profileState.profile : null
  const profileLoading = Boolean(userId) && profileState?.userId !== userId

  const signUp = useCallback(async (fullName: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }, // read by the database trigger that creates the profile
        emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL}login`,
      },
    })
    if (error) throw new Error(error.message)
    // No session yet means "Confirm email" is on and the user must click the link.
    return { needsEmailConfirmation: !data.session }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
  }, [])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut({ scope: 'local' }) // this device only
    if (error) throw new Error(error.message)
  }, [])

  const updateFullName = useCallback(
    async (fullName: string) => {
      if (!userId) throw new Error('Not signed in')
      const { error } = await supabase.from('profiles').update({ full_name: fullName }).eq('id', userId)
      if (error) throw new Error(error.message)
      setProfileState((previous) =>
        previous && previous.userId === userId && previous.profile
          ? { userId, profile: { ...previous.profile, full_name: fullName } }
          : previous,
      )
    },
    [userId],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      isAdmin: profile?.role === 'admin',
      loading: !sessionReady || profileLoading,
      signUp,
      signIn,
      signOut,
      updateFullName,
    }),
    [user, profile, sessionReady, profileLoading, signUp, signIn, signOut, updateFullName],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}