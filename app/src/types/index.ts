export type Sex = 'male' | 'female'

export type ActivityLevel = 'low' | 'moderate' | 'high' | 'very_high'

export const ACTIVITY_LEVEL_FACTORS: Record<ActivityLevel, number> = {
  low: 1.375,
  moderate: 1.55,
  high: 1.725,
  very_high: 1.9,
}

export const ACTIVITY_LEVEL_LABELS: Record<ActivityLevel, string> = {
  low: '軽い(週1-2回の軽い練習)',
  moderate: '普通(週3-5回の練習)',
  high: '高い(ほぼ毎日の本格的な練習)',
  very_high: '非常に高い(1日2回練習・試合期)',
}

export interface Profile {
  id: string
  display_name: string
  sex: Sex
  age: number
  height_cm: number
  weight_kg: number
  sport: string
  activity_level: ActivityLevel
  protein_target_g_per_kg: number
  is_pro: boolean
  subscription_status: string | null
  created_at: string
}

export type ProfileInput = Omit<Profile, 'id' | 'is_pro' | 'subscription_status' | 'created_at'>

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: '朝食',
  lunch: '昼食',
  dinner: '夕食',
  snack: '間食',
}

export interface MealLog {
  id: string
  user_id: string
  date: string
  meal_type: MealType
  food_name: string
  grams: number
  calories: number
  protein: number
  fat: number
  carbs: number
  created_at: string
}

export type MealLogInput = Omit<MealLog, 'id' | 'user_id' | 'created_at'>

export interface FoodItem {
  id: string
  name: string
  category: string
  /** 表示用の目安量ラベル(例: "1パック(50g)") */
  unit: string
  /** 数量入力欄の初期値(g)。未指定なら100g。 */
  servingGrams?: number
  /** 以下はすべて100gあたりの値 */
  calories: number
  protein: number
  fat: number
  carbs: number
}

export interface DailyTotals {
  calories: number
  protein: number
  fat: number
  carbs: number
}

export interface TrainingMenuItem {
  id: string
  name: string
  /** METs(メッツ)値 */
  mets: number
}

export interface TrainingLog {
  id: string
  user_id: string
  date: string
  menu_name: string
  mets: number
  duration_minutes: number
  calories_burned: number
  created_at: string
}

export type TrainingLogInput = Omit<TrainingLog, 'id' | 'user_id' | 'created_at'>

