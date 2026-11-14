import { createContext } from 'react'
import type { User } from '@supabase/supabase-js'

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: 'user' | 'admin'
}

export interface AuthContextValue {
  user: User | null
  profile: Profile | null
  isAdmin: boolean
  // True until we know whether someone is signed in (and have loaded their profile).
  loading: boolean
  signUp: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<{ needsEmailConfirmation: boolean }>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateFullName: (fullName: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)