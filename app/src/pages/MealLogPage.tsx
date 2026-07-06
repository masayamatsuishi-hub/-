import { useEffect, useMemo, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useMealStore } from '../store/useMealStore'
import { FOODS } from '../data/foods'
import { todayStr } from '../utils/date'
import { scaleFoodMacros } from '../utils/nutrition'
import { MEAL_TYPE_LABELS, type MealType } from '../types'

type Mode = 'food' | 'manual'

export default function MealLogPage() {
  const { user } = useAuthStore()
  const { logsByDate, fetchLogsForDate, addLog, deleteLog } = useMealStore()
  const date = todayStr()
  const logs = logsByDate[date] ?? []

  const [mealType, setMealType] = useState<MealType>('breakfast')
  const [mode, setMode] = useState<Mode>('food')
  const [query, setQuery] = useState('')
  const [selectedFoodId, setSelectedFoodId] = useState(FOODS[0].id)
  const [grams, setGrams] = useState('100')
  const [manual, setManual] = useState({ name: '', calories: '', protein: '', fat: '', carbs: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user) fetchLogsForDate(user.id, date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, date])

  const filteredFoods = useMemo(
    () => FOODS.filter((f) => f.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const selectedFood = FOODS.find((f) => f.id === selectedFoodId) ?? FOODS[0]

  useEffect(() => {
    setGrams(String(selectedFood.servingGrams ?? 100))
  }, [selectedFood])

  const preview = scaleFoodMacros(selectedFood, Number(grams) || 0)

  const handleAddFood = async () => {
    if (!user) return
    setSubmitting(true)
    try {
      await addLog(user.id, {
        date,
        meal_type: mealType,
        food_name: selectedFood.name,
        grams: Number(grams),
        ...preview,
      })
      setQuery('')
    } finally {
      setSubmitting(false)
    }
  }

  const handleAddManual = async () => {
    if (!user) return
    setSubmitting(true)
    try {
      await addLog(user.id, {
        date,
        meal_type: mealType,
        food_name: manual.name || '手入力',
        grams: Number(grams) || 0,
        calories: Number(manual.calories) || 0,
        protein: Number(manual.protein) || 0,
        fat: Number(manual.fat) || 0,
        carbs: Number(manual.carbs) || 0,
      })
      setManual({ name: '', calories: '', protein: '', fat: '', carbs: '' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-5 px-4 py-5">
      <h1 className="text-lg font-bold">食事を記録</h1>

      <div>
        <label className="mb-1 block text-xs text-slate-400">食事の種類</label>
        <div className="grid grid-cols-4 gap-2">
          {(Object.entries(MEAL_TYPE_LABELS) as [MealType, string][]).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setMealType(value)}
              className={`rounded-lg py-2 text-xs font-medium ${
                mealType === value ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('food')}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${
            mode === 'food' ? 'bg-slate-800 text-emerald-400' : 'bg-slate-900 text-slate-500'
          }`}
        >
          食品から選ぶ
        </button>
        <button
          type="button"
          onClick={() => setMode('manual')}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${
            mode === 'manual' ? 'bg-slate-800 text-emerald-400' : 'bg-slate-900 text-slate-500'
          }`}
        >
          手入力
        </button>
      </div>

      {mode === 'food' ? (
        <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="食品を検索..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
          <select
            size={5}
            value={selectedFoodId}
            onChange={(e) => setSelectedFoodId(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          >
            {filteredFoods.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.unit})
              </option>
            ))}
          </select>
          <div>
            <label className="mb-1 block text-xs text-slate-400">量(g)</label>
            <input
              type="number"
              min={1}
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex justify-between rounded-lg bg-slate-950 px-3 py-2 text-xs text-slate-400">
            <span>{preview.calories}kcal</span>
            <span>P {preview.protein}g</span>
            <span>F {preview.fat}g</span>
            <span>C {preview.carbs}g</span>
          </div>
          <button
            type="button"
            onClick={handleAddFood}
            disabled={submitting}
            className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
          >
            追加する
          </button>
        </div>
      ) : (
        <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
          <input
            value={manual.name}
            onChange={(e) => setManual((m) => ({ ...m, name: e.target.value }))}
            placeholder="食品名"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={manual.calories}
              onChange={(e) => setManual((m) => ({ ...m, calories: e.target.value }))}
              placeholder="カロリー(kcal)"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              value={manual.protein}
              onChange={(e) => setManual((m) => ({ ...m, protein: e.target.value }))}
              placeholder="タンパク質(g)"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              value={manual.fat}
              onChange={(e) => setManual((m) => ({ ...m, fat: e.target.value }))}
              placeholder="脂質(g)"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              value={manual.carbs}
              onChange={(e) => setManual((m) => ({ ...m, carbs: e.target.value }))}
              placeholder="炭水化物(g)"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>
          <button
            type="button"
            onClick={handleAddManual}
            disabled={submitting}
            className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
          >
            追加する
          </button>
        </div>
      )}

      <div>
        <h2 className="mb-2 text-sm font-semibold text-slate-300">今日の記録</h2>
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
                  <span className="mr-2 rounded bg-slate-800 px-1.5 py-0.5 text-xs text-slate-400">
                    {MEAL_TYPE_LABELS[log.meal_type]}
                  </span>
                  {log.food_name} ({log.grams}g) - {Math.round(log.calories)}kcal
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
