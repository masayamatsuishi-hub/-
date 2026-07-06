import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useMealStore } from '../store/useMealStore'
import { supabase } from '../lib/supabase'
import { todayStr } from '../utils/date'
import { calcProteinTargetGrams, sumDailyTotals } from '../utils/nutrition'

export default function AdvicePage() {
  const { profile } = useAuthStore()
  const { logsByDate } = useMealStore()
  const [advice, setAdvice] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!profile) return null

  if (!profile.is_pro) {
    return (
      <div className="flex h-[70svh] flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="text-4xl">🤖</span>
        <h1 className="text-lg font-bold">AI栄養アドバイスはProプラン限定です</h1>
        <p className="text-sm text-slate-400">
          あなたの練習強度・体組成・食事記録をもとに、Claude AIがスポーツ栄養の専門的なアドバイスを提供します。
        </p>
        <Link
          to="/pricing"
          className="rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
        >
          Proにアップグレード
        </Link>
      </div>
    )
  }

  const date = todayStr()
  const logs = logsByDate[date] ?? []
  const totals = sumDailyTotals(logs)
  const proteinTarget = calcProteinTargetGrams(profile.weight_kg, profile.protein_target_g_per_kg)

  const requestAdvice = async () => {
    setLoading(true)
    setError(null)
    setAdvice(null)
    try {
      const { data, error: fnError } = await supabase.functions.invoke('ai-advice', {
        body: {
          profile: {
            sex: profile.sex,
            age: profile.age,
            height_cm: profile.height_cm,
            weight_kg: profile.weight_kg,
            sport: profile.sport,
            activity_level: profile.activity_level,
            protein_target_g_per_kg: profile.protein_target_g_per_kg,
          },
          today: { logs, totals, proteinTarget },
        },
      })
      if (fnError) throw fnError
      setAdvice(data?.advice ?? 'アドバイスを取得できませんでした。')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'アドバイスの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5 px-4 py-5">
      <h1 className="text-lg font-bold">AI栄養アドバイス</h1>
      <p className="text-sm text-slate-400">
        今日の食事記録({logs.length}件、{Math.round(totals.calories)}kcal)をもとに、{profile.sport}
        選手向けのアドバイスを生成します。
      </p>

      <button
        type="button"
        onClick={requestAdvice}
        disabled={loading}
        className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
      >
        {loading ? 'AIが分析中...' : 'アドバイスをもらう'}
      </button>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {advice && (
        <div className="whitespace-pre-wrap rounded-2xl border border-emerald-800/50 bg-emerald-950/20 p-4 text-sm leading-relaxed text-slate-200">
          {advice}
        </div>
      )}
    </div>
  )
}
