import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { ACTIVITY_LEVEL_LABELS, type ActivityLevel, type ProfileInput, type Sex } from '../types'
import { suggestProteinTargetPerKg } from '../utils/nutrition'
import { SPORTS } from '../data/sports'

export default function OnboardingPage() {
  const { profile, saveProfile, loading, error } = useAuthStore()
  const [form, setForm] = useState({
    display_name: '',
    sex: 'male' as Sex,
    age: '',
    height_cm: '',
    weight_kg: '',
    sport: SPORTS[0],
    activity_level: 'moderate' as ActivityLevel,
    protein_target_g_per_kg: suggestProteinTargetPerKg('moderate').toString(),
  })
  const [proteinTouched, setProteinTouched] = useState(false)

  if (profile) {
    return <Navigate to="/" replace />
  }

  const handleActivityChange = (level: ActivityLevel) => {
    setForm((f) => ({
      ...f,
      activity_level: level,
      protein_target_g_per_kg: proteinTouched ? f.protein_target_g_per_kg : suggestProteinTargetPerKg(level).toString(),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const input: ProfileInput = {
      display_name: form.display_name || '選手',
      sex: form.sex,
      age: Number(form.age),
      height_cm: Number(form.height_cm),
      weight_kg: Number(form.weight_kg),
      sport: form.sport,
      activity_level: form.activity_level,
      protein_target_g_per_kg: Number(form.protein_target_g_per_kg),
    }
    await saveProfile(input)
  }

  return (
    <div className="mx-auto min-h-svh max-w-md bg-slate-950 px-6 py-8 text-slate-100">
      <h1 className="mb-1 text-xl font-bold text-emerald-400">プロフィール登録</h1>
      <p className="mb-6 text-sm text-slate-400">目標設定のために、あなたの情報を教えてください。</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-slate-400">ニックネーム</label>
          <input
            value={form.display_name}
            onChange={(e) => setForm((f) => ({ ...f, display_name: e.target.value }))}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            placeholder="例: たろう"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-slate-400">性別</label>
            <select
              value={form.sex}
              onChange={(e) => setForm((f) => ({ ...f, sex: e.target.value as Sex }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            >
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">年齢</label>
            <input
              type="number"
              required
              min={1}
              max={119}
              value={form.age}
              onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-slate-400">身長(cm)</label>
            <input
              type="number"
              required
              step="0.1"
              value={form.height_cm}
              onChange={(e) => setForm((f) => ({ ...f, height_cm: e.target.value }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">体重(kg)</label>
            <input
              type="number"
              required
              step="0.1"
              value={form.weight_kg}
              onChange={(e) => setForm((f) => ({ ...f, weight_kg: e.target.value }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-400">競技種目</label>
          <select
            value={form.sport}
            onChange={(e) => setForm((f) => ({ ...f, sport: e.target.value }))}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          >
            {SPORTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-400">練習強度</label>
          <select
            value={form.activity_level}
            onChange={(e) => handleActivityChange(e.target.value as ActivityLevel)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          >
            {Object.entries(ACTIVITY_LEVEL_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-400">
            タンパク質目標(g/kg体重) <span className="text-slate-600">練習強度から自動提案。調整可能です</span>
          </label>
          <input
            type="number"
            step="0.1"
            min={0.5}
            max={4}
            value={form.protein_target_g_per_kg}
            onChange={(e) => {
              setProteinTouched(true)
              setForm((f) => ({ ...f, protein_target_g_per_kg: e.target.value }))
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {loading ? '保存中...' : '登録して始める'}
        </button>
      </form>
    </div>
  )
}
