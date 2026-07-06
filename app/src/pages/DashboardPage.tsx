import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useMealStore } from '../store/useMealStore'
import MacroBar from '../components/MacroBar'
import PfcPieChart from '../components/PfcPieChart'
import { todayStr } from '../utils/date'
import {
  calcAchievementRate,
  calcBmi,
  calcBmr,
  calcPfcBreakdown,
  calcProteinTargetGrams,
  calcTdee,
  sumDailyTotals,
} from '../utils/nutrition'
import { MEAL_TYPE_LABELS } from '../types'

export default function DashboardPage() {
  const { user, profile } = useAuthStore()
  const { logsByDate, fetchLogsForDate } = useMealStore()
  const date = todayStr()
  const logs = logsByDate[date] ?? []

  useEffect(() => {
    if (user) fetchLogsForDate(user.id, date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, date])

  if (!profile) return null

  const totals = sumDailyTotals(logs)
  const bmr = calcBmr(profile.sex, profile.weight_kg, profile.height_cm, profile.age)
  const tdee = calcTdee(bmr, profile.activity_level)
  const bmi = calcBmi(profile.weight_kg, profile.height_cm)
  const proteinTarget = calcProteinTargetGrams(profile.weight_kg, profile.protein_target_g_per_kg)
  const proteinAchievement = calcAchievementRate(totals.protein, proteinTarget)
  const pfc = calcPfcBreakdown(totals)

  return (
    <div className="space-y-6 px-4 py-5">
      <div>
        <h1 className="text-lg font-bold">こんにちは、{profile.display_name}さん</h1>
        <p className="text-xs text-slate-500">{profile.sport} / 今日の栄養状況</p>
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-sm text-slate-400">摂取カロリー</span>
          <span className="text-2xl font-bold tabular-nums">
            {Math.round(totals.calories)}
            <span className="ml-1 text-sm font-normal text-slate-500">/ {Math.round(tdee)} kcal</span>
          </span>
        </div>
        <MacroBar label="カロリー" actual={totals.calories} target={tdee} unit="kcal" colorClass="bg-sky-500" />
      </section>

      <section className="rounded-2xl border border-emerald-800/50 bg-emerald-950/20 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-emerald-400">タンパク質達成率</span>
          <span className="text-xl font-bold tabular-nums text-emerald-400">{proteinAchievement.toFixed(0)}%</span>
        </div>
        <MacroBar
          label={`目標 ${profile.protein_target_g_per_kg}g/kg体重`}
          actual={totals.protein}
          target={proteinTarget}
          unit="g"
          colorClass="bg-emerald-500"
        />
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
        <h2 className="mb-2 text-sm font-semibold text-slate-300">PFCバランス</h2>
        <PfcPieChart breakdown={pfc} />
        <div className="mt-3 space-y-2">
          <MacroBar label="脂質" actual={totals.fat} target={tdee * 0.25 / 9} unit="g" colorClass="bg-amber-500" />
          <MacroBar label="炭水化物" actual={totals.carbs} target={tdee * 0.55 / 4} unit="g" colorClass="bg-sky-500" />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-center">
          <p className="text-xs text-slate-500">BMI</p>
          <p className="text-xl font-bold tabular-nums">{bmi.toFixed(1)}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-center">
          <p className="text-xs text-slate-500">基礎代謝(BMR)</p>
          <p className="text-xl font-bold tabular-nums">{Math.round(bmr)} kcal</p>
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-300">今日の食事</h2>
          <Link to="/log" className="text-xs text-emerald-400">
            + 記録を追加
          </Link>
        </div>
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
                  {log.food_name} ({log.grams}g)
                </div>
                <span className="tabular-nums text-slate-400">{Math.round(log.calories)}kcal</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
