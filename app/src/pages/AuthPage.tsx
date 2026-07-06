import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export default function AuthPage() {
  const location = useLocation()
  const isSignup = location.pathname === '/signup'
  const { user, signIn, signUp, loading, error } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    try {
      if (isSignup) {
        await signUp(email, password)
        setMessage('確認メールを送信しました。メール内のリンクからログインしてください。')
      } else {
        await signIn(email, password)
      }
    } catch {
      // エラーは store 側の error に格納済み
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-slate-950 px-6 text-slate-100">
      <h1 className="mb-1 text-2xl font-bold text-emerald-400">FuuSpo</h1>
      <p className="mb-8 text-sm text-slate-400">スポーツ選手のためのAI栄養管理</p>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <h2 className="text-center text-lg font-semibold">{isSignup ? '新規登録' : 'ログイン'}</h2>
        <div>
          <label className="mb-1 block text-xs text-slate-400">メールアドレス</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-400">パスワード</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {message && <p className="text-sm text-emerald-400">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {loading ? '処理中...' : isSignup ? '登録する' : 'ログイン'}
        </button>

        <p className="text-center text-xs text-slate-500">
          {isSignup ? (
            <>
              すでにアカウントをお持ちですか?{' '}
              <Link to="/login" className="text-emerald-400 hover:underline">
                ログイン
              </Link>
            </>
          ) : (
            <>
              アカウントをお持ちでないですか?{' '}
              <Link to="/signup" className="text-emerald-400 hover:underline">
                新規登録
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  )
}
