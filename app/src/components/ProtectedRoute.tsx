import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export function RequireAuth({ children }: { children: ReactNode }) {
  const { initialized, user, profile } = useAuthStore()

  if (!initialized) {
    return <div className="flex h-svh items-center justify-center text-slate-400">読み込み中...</div>
  }
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (!profile) {
    return <Navigate to="/onboarding" replace />
  }
  return <>{children}</>
}
