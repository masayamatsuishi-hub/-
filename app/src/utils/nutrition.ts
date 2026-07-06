import { ACTIVITY_LEVEL_FACTORS, type ActivityLevel, type DailyTotals, type MealLog, type Sex } from '../types'

export function calcBmr(sex: Sex, weightKg: number, heightCm: number, age: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return sex === 'male' ? base + 5 : base - 161
}

export function calcTdee(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * ACTIVITY_LEVEL_FACTORS[activityLevel]
}

export function calcBmi(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100
  return weightKg / (heightM * heightM)
}

/** アスリート向けの推奨タンパク質量(g/kg体重)。競技強度に応じて 1.2〜2.2g/kg が目安。 */
export function suggestProteinTargetPerKg(activityLevel: ActivityLevel): number {
  switch (activityLevel) {
    case 'low':
      return 1.2
    case 'moderate':
      return 1.6
    case 'high':
      return 1.8
    case 'very_high':
      return 2.2
  }
}

export function calcProteinTargetGrams(weightKg: number, proteinTargetPerKg: number): number {
  return weightKg * proteinTargetPerKg
}

export function sumDailyTotals(logs: MealLog[]): DailyTotals {
  return logs.reduce(
    (acc, log) => ({
      calories: acc.calories + log.calories,
      protein: acc.protein + log.protein,
      fat: acc.fat + log.fat,
      carbs: acc.carbs + log.carbs,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 },
  )
}

export interface PfcCalorieBreakdown {
  proteinKcal: number
  fatKcal: number
  carbsKcal: number
  proteinPct: number
  fatPct: number
  carbsPct: number
}

/** P/F/C の各カロリー換算(タンパク質・炭水化物 4kcal/g、脂質 9kcal/g)と構成比 */
export function calcPfcBreakdown(totals: DailyTotals): PfcCalorieBreakdown {
  const proteinKcal = totals.protein * 4
  const fatKcal = totals.fat * 9
  const carbsKcal = totals.carbs * 4
  const total = proteinKcal + fatKcal + carbsKcal
  if (total === 0) {
    return { proteinKcal: 0, fatKcal: 0, carbsKcal: 0, proteinPct: 0, fatPct: 0, carbsPct: 0 }
  }
  return {
    proteinKcal,
    fatKcal,
    carbsKcal,
    proteinPct: (proteinKcal / total) * 100,
    fatPct: (fatKcal / total) * 100,
    carbsPct: (carbsKcal / total) * 100,
  }
}

export function calcAchievementRate(actual: number, target: number): number {
  if (target <= 0) return 0
  return Math.min(999, (actual / target) * 100)
}

export function scaleFoodMacros(
  base: { calories: number; protein: number; fat: number; carbs: number },
  grams: number,
) {
  const factor = grams / 100
  return {
    calories: Math.round(base.calories * factor * 10) / 10,
    protein: Math.round(base.protein * factor * 10) / 10,
    fat: Math.round(base.fat * factor * 10) / 10,
    carbs: Math.round(base.carbs * factor * 10) / 10,
  }
}
