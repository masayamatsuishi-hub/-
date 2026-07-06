import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { ACTIVITY_LEVEL_LABELS, type ActivityLevel, type Sex } from '../types'

export default function SettingsPage() {
  const { profile, user, saveProfile, signOut, loading, error } = useAuthStore()
  const [form, setForm] = useState(() => ({
    display_name: profile?.display_name ?? '',
    sex: (profile?.sex ?? 'male') as Sex,
    age: String(profile?.age ?? ''),
    height_cm: String(profile?.height_cm ?? ''),
    weight_kg: String(profile?.weight_kg ?? ''),
    sport: profile?.sport ?? '',
    activity_level: (profile?.activity_level ?? 'moderate') as ActivityLevel,
    protein_target_g_per_kg: String(profile?.protein_target_g_per_kg ?? 1.6),
  }))
  const [saved, setSaved] = useState(false)

  if (!profile) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(false)
    await saveProfile({
      display_name: form.display_name,
      sex: form.sex,
      age: Number(form.age),
      height_cm: Number(form.height_cm),
      weight_kg: Number(form.weight_kg),
      sport: form.sport,
      activity_level: form.activity_level,
      protein_target_g_per_kg: Number(form.protein_target_g_per_kg),
    })
    setSaved(true)
  }

  return (
    <div className="space-y-6 px-4 py-5">
      <h1 className="text-lg font-bold">設定</h1>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-400">プラン</span>
          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs">
            {profile.is_pro ? '⭐ Pro プラン' : 'Free プラン'}
          </span>
        </div>
        {!profile.is_pro && (
          <Link
            to="/pricing"
            className="mt-1 block w-full rounded-lg bg-emerald-500 py-2 text-center text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Proにアップグレード
          </Link>
        )}
      </section>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-slate-400">ニックネーム</label>
          <input
            value={form.display_name}
            onChange={(e) => setForm((f) => ({ ...f, display_name: e.target.value }))}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
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
              step="0.1"
              value={form.weight_kg}
              onChange={(e) => setForm((f) => ({ ...f, weight_kg: e.target.value }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-400">競技種目</label>
          <input
            value={form.sport}
            onChange={(e) => setForm((f) => ({ ...f, sport: e.target.value }))}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-400">練習強度</label>
          <select
            value={form.activity_level}
            onChange={(e) => setForm((f) => ({ ...f, activity_level: e.target.value as ActivityLevel }))}
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
          <label className="mb-1 block text-xs text-slate-400">タンパク質目標(g/kg体重)</label>
          <input
            type="number"
            step="0.1"
            value={form.protein_target_g_per_kg}
            onChange={(e) => setForm((f) => ({ ...f, protein_target_g_per_kg: e.target.value }))}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {saved && <p className="text-sm text-emerald-400">保存しました</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
        >
          保存する
        </button>
      </form>

      <div className="border-t border-slate-800 pt-4 text-center">
        <p className="mb-2 text-xs text-slate-600">{user?.email}</p>
        <button type="button" onClick={signOut} className="text-sm text-slate-500 hover:text-red-400">
          ログアウト
        </button>
      </div>
    </div>
  )
}
