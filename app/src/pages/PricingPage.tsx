import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { supabase } from '../lib/supabase'

const PRO_FEATURES = [
  'Claude AIによるスポーツ栄養アドバイス',
  '詳細なPFC・タンパク質達成率の分析',
  '無制限の食事記録履歴',
]

export default function PricingPage() {
  const { profile } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpgrade = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fnError } = await supabase.functions.invoke('stripe-checkout')
      if (fnError) throw fnError
      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error('決済ページを取得できませんでした')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '決済の開始に失敗しました')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 px-4 py-5">
      <h1 className="text-lg font-bold">料金プラン</h1>

      <div className="grid gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
          <h2 className="text-sm font-semibold text-slate-300">Free</h2>
          <p className="my-2 text-2xl font-bold">¥0</p>
          <ul className="space-y-1 text-sm text-slate-400">
            <li>・食事記録(カロリー/PFC)</li>
            <li>・タンパク質達成率の表示</li>
            <li>・7日間の履歴</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-emerald-600 bg-emerald-950/20 p-4">
          <h2 className="text-sm font-semibold text-emerald-400">Pro</h2>
          <p className="my-2 text-2xl font-bold">
            ¥980<span className="text-sm font-normal text-slate-400"> / 月</span>
          </p>
          <ul className="space-y-1 text-sm text-slate-300">
            {PRO_FEATURES.map((f) => (
              <li key={f}>・{f}</li>
            ))}
          </ul>

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

          {profile?.is_pro ? (
            <p className="mt-4 text-center text-sm text-emerald-400">✓ ご利用中です</p>
          ) : (
            <button
              type="button"
              onClick={handleUpgrade}
              disabled={loading}
              className="mt-4 w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
            >
              {loading ? '処理中...' : 'Proにアップグレード'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
