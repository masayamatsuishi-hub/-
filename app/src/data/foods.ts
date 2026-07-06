import type { FoodItem } from '../types'

export const FOODS: FoodItem[] = [
  { id: 'rice-cooked', name: '白米(ごはん)', category: '主食', unit: '100g', calories: 156, protein: 2.5, fat: 0.3, carbs: 37.1 },
  { id: 'bread-white', name: '食パン', category: '主食', unit: '100g', calories: 248, protein: 8.9, fat: 4.1, carbs: 46.4 },
  { id: 'udon-boiled', name: 'うどん(ゆで)', category: '主食', unit: '100g', calories: 95, protein: 2.6, fat: 0.4, carbs: 20.8 },
  { id: 'pasta-boiled', name: 'スパゲッティ(ゆで)', category: '主食', unit: '100g', calories: 150, protein: 5.2, fat: 0.9, carbs: 28.4 },
  { id: 'rice-ball', name: 'おにぎり(1個)', category: '主食', unit: '1個(100g)', calories: 170, protein: 2.7, fat: 0.3, carbs: 39.4 },
  { id: 'chicken-breast', name: '鶏むね肉(皮なし)', category: '肉類', unit: '100g', calories: 116, protein: 23.3, fat: 1.9, carbs: 0 },
  { id: 'chicken-thigh', name: '鶏もも肉(皮なし)', category: '肉類', unit: '100g', calories: 127, protein: 19, fat: 5, carbs: 0 },
  { id: 'pork-loin', name: '豚ロース肉', category: '肉類', unit: '100g', calories: 263, protein: 19.3, fat: 19.2, carbs: 0.2 },
  { id: 'beef-lean', name: '牛もも肉(赤身)', category: '肉類', unit: '100g', calories: 176, protein: 21.3, fat: 9.6, carbs: 0.5 },
  { id: 'egg', name: '鶏卵', category: '卵・乳製品', unit: '100g(約2個)', calories: 151, protein: 12.3, fat: 10.3, carbs: 0.3 },
  { id: 'milk', name: '牛乳', category: '卵・乳製品', unit: '100ml', calories: 61, protein: 3.3, fat: 3.8, carbs: 4.8 },
  { id: 'yogurt', name: 'ヨーグルト(無糖)', category: '卵・乳製品', unit: '100g', calories: 56, protein: 3.6, fat: 3, carbs: 4.9 },
  { id: 'protein-powder', name: 'ホエイプロテイン', category: '卵・乳製品', unit: '1杯(30g)', servingGrams: 30, calories: 390, protein: 80, fat: 5, carbs: 10 },
  { id: 'cheese', name: 'プロセスチーズ', category: '卵・乳製品', unit: '100g', calories: 313, protein: 22.7, fat: 26, carbs: 1.3 },
  { id: 'salmon', name: '鮭(生)', category: '魚介類', unit: '100g', calories: 133, protein: 22.3, fat: 4.1, carbs: 0.1 },
  { id: 'tuna-canned', name: 'ツナ缶(水煮)', category: '魚介類', unit: '100g', calories: 70, protein: 16.5, fat: 0.5, carbs: 0.1 },
  { id: 'saba', name: 'さば(生)', category: '魚介類', unit: '100g', calories: 211, protein: 20.6, fat: 16.8, carbs: 0.3 },
  { id: 'tofu', name: '木綿豆腐', category: '大豆製品', unit: '100g', calories: 73, protein: 7, fat: 4.5, carbs: 1.6 },
  { id: 'natto', name: '納豆', category: '大豆製品', unit: '1パック(50g)', servingGrams: 50, calories: 200, protein: 16.6, fat: 10, carbs: 12.2 },
  { id: 'broccoli', name: 'ブロッコリー(ゆで)', category: '野菜', unit: '100g', calories: 30, protein: 3.9, fat: 0.2, carbs: 5.2 },
  { id: 'cabbage', name: 'キャベツ', category: '野菜', unit: '100g', calories: 21, protein: 1.3, fat: 0.2, carbs: 5.2 },
  { id: 'tomato', name: 'トマト', category: '野菜', unit: '100g', calories: 19, protein: 0.7, fat: 0.1, carbs: 4.7 },
  { id: 'spinach', name: 'ほうれん草(ゆで)', category: '野菜', unit: '100g', calories: 25, protein: 2.6, fat: 0.5, carbs: 4.3 },
  { id: 'potato', name: 'じゃがいも', category: '野菜', unit: '100g', calories: 76, protein: 1.6, fat: 0.1, carbs: 17.6 },
  { id: 'banana', name: 'バナナ', category: '果物', unit: '1本(100g)', calories: 93, protein: 1.1, fat: 0.2, carbs: 22.5 },
  { id: 'apple', name: 'りんご', category: '果物', unit: '100g', calories: 56, protein: 0.2, fat: 0.1, carbs: 14.6 },
]

export const FOOD_CATEGORIES = Array.from(new Set(FOODS.map((f) => f.category)))
