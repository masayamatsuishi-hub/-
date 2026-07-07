import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { TrainingLog, TrainingLogInput } from '../types'

interface TrainingState {
  logsByDate: Record<string, TrainingLog[]>
  loading: boolean
  error: string | null
  fetchLogsForDate: (userId: string, date: string) => Promise<void>
  addLog: (userId: string, input: TrainingLogInput) => Promise<void>
  deleteLog: (userId: string, id: string, date: string) => Promise<void>
  fetchHistoryRange: (userId: string, fromDate: string, toDate: string) => Promise<void>
}

export const useTrainingStore = create<TrainingState>((set) => ({
  logsByDate: {},
  loading: false,
  error: null,

  fetchLogsForDate: async (userId, date) => {
    set({ loading: true, error: null })
    const { data, error } = await supabase
      .from('training_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .order('created_at', { ascending: true })
    set({ loading: false })
    if (error) {
      set({ error: error.message })
      return
    }
    set((state) => ({ logsByDate: { ...state.logsByDate, [date]: (data ?? []) as TrainingLog[] } }))
  },

  addLog: async (userId, input) => {
    set({ loading: true, error: null })
    const { data, error } = await supabase
      .from('training_logs')
      .insert({ user_id: userId, ...input })
      .select()
      .single()
    set({ loading: false })
    if (error) {
      set({ error: error.message })
      throw error
    }
    const log = data as TrainingLog
    set((state) => ({
      logsByDate: {
        ...state.logsByDate,
        [log.date]: [...(state.logsByDate[log.date] ?? []), log],
      },
    }))
  },

  deleteLog: async (userId, id, date) => {
    const { error } = await supabase.from('training_logs').delete().eq('id', id).eq('user_id', userId)
    if (error) {
      set({ error: error.message })
      throw error
    }
    set((state) => ({
      logsByDate: {
        ...state.logsByDate,
        [date]: (state.logsByDate[date] ?? []).filter((l) => l.id !== id),
      },
    }))
  },

  fetchHistoryRange: async (userId, fromDate, toDate) => {
    set({ loading: true, error: null })
    const { data, error } = await supabase
      .from('training_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('date', fromDate)
      .lte('date', toDate)
      .order('date', { ascending: false })
    set({ loading: false })
    if (error) {
      set({ error: error.message })
      return
    }
    const logs = (data ?? []) as TrainingLog[]
    const grouped: Record<string, TrainingLog[]> = {}
    for (const log of logs) {
      grouped[log.date] = [...(grouped[log.date] ?? []), log]
    }
    set((state) => ({ logsByDate: { ...state.logsByDate, ...grouped } }))
  },
}))
