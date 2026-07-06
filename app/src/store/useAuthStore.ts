import { create } from 'zustand'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Profile, ProfileInput } from '../types'

interface AuthState {
  session: Session | null
  user: User | null
  profile: Profile | null
  initialized: boolean
  loading: boolean
  error: string | null
  init: () => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  fetchProfile: () => Promise<void>
  saveProfile: (input: ProfileInput) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  initialized: false,
  loading: false,
  error: null,

  init: async () => {
    const { data } = await supabase.auth.getSession()
    set({ session: data.session, user: data.session?.user ?? null })
    if (data.session?.user) {
      await get().fetchProfile()
    }
    set({ initialized: true })

    supabase.auth.onAuthStateChange(async (_event, session) => {
      set({ session, user: session?.user ?? null })
      if (session?.user) {
        await get().fetchProfile()
      } else {
        set({ profile: null })
      }
    })
  },

  signUp: async (email, password) => {
    set({ loading: true, error: null })
    const { error } = await supabase.auth.signUp({ email, password })
    set({ loading: false })
    if (error) {
      set({ error: error.message })
      throw error
    }
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null })
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    set({ loading: false })
    if (error) {
      set({ error: error.message })
      throw error
    }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ session: null, user: null, profile: null })
  },

  fetchProfile: async () => {
    const userId = get().user?.id
    if (!userId) return
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
    if (error) {
      set({ error: error.message })
      return
    }
    set({ profile: data as Profile | null })
  },

  saveProfile: async (input) => {
    const userId = get().user?.id
    if (!userId) throw new Error('ログインしてください')
    set({ loading: true, error: null })
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: userId, ...input })
      .select()
      .single()
    set({ loading: false })
    if (error) {
      set({ error: error.message })
      throw error
    }
    set({ profile: data as Profile })
  },
}))
