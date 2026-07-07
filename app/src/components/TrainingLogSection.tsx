import { useEffect, useMemo, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useTrainingStore } from '../store/useTrainingStore'
import { getTrainingMenusForSport } from '../data/trainingMenus'
import { todayStr } from '../utils/date'
import { calcCaloriesBurned, sumTrainingCalories } from '../utils/nutrition'

export default function TrainingLogSection() {
  const { user, profile } = useAuthStore()
  const { logsByDate, fetchLogsForDate, addLog, deleteLog } = useTrainingStore()
  const date = todayStr()
  const logs = logsByDate[date] ?? []

  const menus = useMemo(() => getTrainingMenusForSport(profile?.sport ?? 'その他'), [profile?.sport])
  const [menuId, setMenuId] = useState(menus[0].id)
  const [customMets, setCustomMets] = useState('6.0')
  const [duration, setDuration] = useState('60')
  const [submitting, setSubmitting] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)

  useEffect(() => {
    if (user) fetchLogsForDate(user.id, date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, date])

  useEffect(() => {
    setMenuId(menus[0].id)
  }, [menus])

  if (!profile) return null

  const selectedMenu = menus.find((m) => m.id === menuId) ?? menus[0]
  const isCustom = selectedMenu.id === 'custom'
  const mets = isCustom ? Number(customMets) || 0 : selectedMenu.mets
  const preview = calcCaloriesBurned(mets, profile.weight_kg, Number(duration) || 0)
  const totalBurned = sumTrainingCalories(logs)

  const handleAdd = async () => {
    if (!user) return
    setSubmitting(true)
    setAddError(null)
    try {
      await addLog(user.id, {
        date,
        menu_name: isCustom ? `${profile.sport}(自由入力)` : selectedMenu.name,
        mets,
        duration_minutes: Number(duration),
        calories_burned: preview,
      })
    } catch (e) {
      setAddError(e instanceof Error ? e.message : '記録の追加に失敗しました')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-sky-800/50 bg-sky-950/20 p-4 text-center">
        <p className="text-xs text-slate-400">今日の運動消費カロリー</p>
        <p className="text-2xl font-bold tabular-nums text-sky-400">{Math.round(totalBurned)} kcal</p>
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
        <div>
          <label className="mb-1 block text-xs text-slate-400">練習メニュー({profile.sport})</label>
          <select
            value={menuId}
            onChange={(e) => setMenuId(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          >
            {menus.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
                {m.id !== 'custom' ? `(METs ${m.mets})` : ''}
              </option>
            ))}
          </select>
        </div>

        {isCustom && (
          <div>
            <label className="mb-1 block text-xs text-slate-400">METs(メッツ)値</label>
            <input
              type="number"
              step="0.1"
              min={0.1}
              value={customMets}
              onChange={(e) => setCustomMets(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>
        )}

        <div>
          <label className="mb-1 block text-xs text-slate-400">運動時間(分)</label>
          <input
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg bg-slate-950 px-3 py-2 text-xs text-slate-400">
          <span>METs {mets}</span>
          <span>体重 {profile.weight_kg}kg</span>
          <span className="font-semibold text-sky-400">消費 約{preview}kcal</span>
        </div>

        {addError && <p className="text-sm text-red-400">{addError}</p>}

        <button
          type="button"
          onClick={handleAdd}
          disabled={submitting || mets <= 0}
          className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
        >
          {submitting ? '追加中...' : '追加する'}
        </button>
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-slate-300">今日の練習記録</h2>
        {logs.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-800 p-4 text-center text-sm text-slate-500">
            まだ記録がありません
          </p>
        ) : (
          <ul className="space-y-2">
            {logs.map((log) => (
              <li
                key={log.id}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm"
              >
                <div>
                  {log.menu_name}({log.duration_minutes}分・METs {log.mets}) -{' '}
                  <span className="text-sky-400">{Math.round(log.calories_burned)}kcal</span>
                </div>
                <button
                  type="button"
                  onClick={() => user && deleteLog(user.id, log.id, date)}
                  className="text-xs text-slate-500 hover:text-red-400"
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
