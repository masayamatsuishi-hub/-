import { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useMealStore } from '../store/useMealStore'
import { useTrainingStore } from '../store/useTrainingStore'
import { addDays, formatDateJp, todayStr } from '../utils/date'
import { calcAchievementRate, calcProteinTargetGrams, sumDailyTotals, sumTrainingCalories } from '../utils/nutrition'

const DAYS_BACK = 14

export default function HistoryPage() {
  const { user, profile } = useAuthStore()
  const { logsByDate, fetchHistoryRange } = useMealStore()
  const { logsByDate: trainingLogsByDate, fetchHistoryRange: fetchTrainingHistoryRange } = useTrainingStore()
  const today = todayStr()
  const fromDate = addDays(today, -(DAYS_BACK - 1))

  useEffect(() => {
    if (user) {
      fetchHistoryRange(user.id, fromDate, today)
      fetchTrainingHistoryRange(user.id, fromDate, today)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  if (!profile) return null

  const proteinTarget = calcProteinTargetGrams(profile.weight_kg, profile.protein_target_g_per_kg)
  const dates = Array.from({ length: DAYS_BACK }, (_, i) => addDays(today, -i))

  return (
    <div className="space-y-4 px-4 py-5">
      <h1 className="text-lg font-bold">履歴</h1>
      <ul className="space-y-2">
        {dates.map((date) => {
          const logs = logsByDate[date] ?? []
          const trainingLogs = trainingLogsByDate[date] ?? []
          const totals = sumDailyTotals(logs)
          const exerciseCalories = sumTrainingCalories(trainingLogs)
          const achievement = calcAchievementRate(totals.protein, proteinTarget)
          return (
            <li key={date} className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">{formatDateJp(date)}</span>
                <span className="text-xs text-slate-500">
                  食事{logs.length}件・練習{trainingLogs.length}件
                </span>
              </div>
              {logs.length === 0 && trainingLogs.length === 0 ? (
                <p className="text-xs text-slate-600">記録なし</p>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span>{Math.round(totals.calories)} kcal</span>
                  <span>P {Math.round(totals.protein)}g</span>
                  <span>F {Math.round(totals.fat)}g</span>
                  <span>C {Math.round(totals.carbs)}g</span>
                  {exerciseCalories > 0 && <span className="text-sky-400">運動 -{Math.round(exerciseCalories)}kcal</span>}
                  <span className={achievement >= 100 ? 'text-emerald-400' : 'text-amber-400'}>
                    P達成 {achievement.toFixed(0)}%
                  </span>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
