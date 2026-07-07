import type { FoodItem } from '../types'

/**
 * 出典: 文部科学省「日本食品標準成分表2020年版(八訂)」本表(エネルギー・たんぱく質・脂質・炭水化物)。
 * 各行末尾のコメントは対応する食品番号。ホエイプロテインのみ同成分表に収載がないため、
 * 一般的な製品の表示値を目安として使用。
 */
export const FOODS: FoodItem[] = [
  { id: 'rice-cooked', name: '白米(ごはん)', category: '主食', unit: '100g', calories: 156, protein: 2.5, fat: 0.3, carbs: 37.1 }, // 01088 こめ[水稲めし]精白米 うるち米
  { id: 'bread-white', name: '食パン', category: '主食', unit: '100g', calories: 248, protein: 8.9, fat: 4.1, carbs: 46.4 }, // 01026 こむぎ[パン類]角形食パン 食パン
  { id: 'udon-boiled', name: 'うどん(ゆで)', category: '主食', unit: '100g', calories: 95, protein: 2.6, fat: 0.4, carbs: 21.6 }, // 01039 こむぎ[うどん・そうめん類]うどん ゆで
  { id: 'pasta-boiled', name: 'スパゲッティ(ゆで)', category: '主食', unit: '100g', calories: 150, protein: 5.8, fat: 0.9, carbs: 32.2 }, // 01064 こむぎ[マカロニ・スパゲッティ類]マカロニ・スパゲッティ ゆで
  { id: 'rice-ball', name: 'おにぎり(1個)', category: '主食', unit: '1個(100g)', calories: 170, protein: 2.7, fat: 0.3, carbs: 39.4 }, // 01111 こめ[うるち米製品]おにぎり
  { id: 'chicken-breast', name: '鶏むね肉(皮なし)', category: '肉類', unit: '100g', calories: 105, protein: 23.3, fat: 1.9, carbs: 0.1 }, // 11220 にわとり[若どり・主品目]むね 皮なし 生
  { id: 'chicken-thigh', name: '鶏もも肉(皮なし)', category: '肉類', unit: '100g', calories: 113, protein: 19.0, fat: 5.0, carbs: 0 }, // 11224 にわとり[若どり・主品目]もも 皮なし 生
  { id: 'pork-loin', name: '豚ロース肉', category: '肉類', unit: '100g', calories: 248, protein: 19.3, fat: 19.2, carbs: 0.2 }, // 11123 ぶた[大型種肉]ロース 脂身つき 生
  { id: 'beef-lean', name: '牛もも肉(赤身)', category: '肉類', unit: '100g', calories: 176, protein: 21.3, fat: 10.7, carbs: 0.6 }, // 11021 うし[和牛肉]もも 赤肉 生
  { id: 'egg', name: '鶏卵', category: '卵・乳製品', unit: '100g(約2個)', calories: 142, protein: 12.2, fat: 10.2, carbs: 0.4 }, // 12004 鶏卵 全卵 生
  { id: 'milk', name: '牛乳', category: '卵・乳製品', unit: '100ml', calories: 61, protein: 3.3, fat: 3.8, carbs: 4.8 }, // 13003 普通牛乳
  { id: 'yogurt', name: 'ヨーグルト(無糖)', category: '卵・乳製品', unit: '100g', calories: 56, protein: 3.6, fat: 3.0, carbs: 4.9 }, // 13025 ヨーグルト 全脂無糖
  { id: 'protein-powder', name: 'ホエイプロテイン', category: '卵・乳製品', unit: '1杯(30g)', servingGrams: 30, calories: 390, protein: 80, fat: 5, carbs: 10 }, // 成分表に収載なし。一般的な製品の表示値
  { id: 'cheese', name: 'プロセスチーズ', category: '卵・乳製品', unit: '100g', calories: 313, protein: 22.7, fat: 26.0, carbs: 1.3 }, // 13040 プロセスチーズ
  { id: 'salmon', name: '鮭(生)', category: '魚介類', unit: '100g', calories: 124, protein: 22.3, fat: 4.1, carbs: 0.1 }, // 10134 さけ・ます類 しろさけ 生
  { id: 'tuna-canned', name: 'ツナ缶(水煮)', category: '魚介類', unit: '100g', calories: 70, protein: 16.0, fat: 0.7, carbs: 0.2 }, // 10260 まぐろ類 缶詰 水煮 フレーク ライト
  { id: 'saba', name: 'さば(生)', category: '魚介類', unit: '100g', calories: 211, protein: 20.6, fat: 16.8, carbs: 0.3 }, // 10154 さば類 まさば 生
  { id: 'tofu', name: '木綿豆腐', category: '大豆製品', unit: '100g', calories: 73, protein: 7.0, fat: 4.9, carbs: 1.5 }, // 04032 だいず[豆腐・油揚げ類]木綿豆腐
  { id: 'natto', name: '納豆', category: '大豆製品', unit: '1パック(50g)', servingGrams: 50, calories: 190, protein: 16.5, fat: 10.0, carbs: 12.1 }, // 04046 だいず[納豆類]糸引き納豆
  { id: 'broccoli', name: 'ブロッコリー(ゆで)', category: '野菜', unit: '100g', calories: 30, protein: 3.9, fat: 0.4, carbs: 5.2 }, // 06264 ブロッコリー 花序 ゆで
  { id: 'cabbage', name: 'キャベツ', category: '野菜', unit: '100g', calories: 21, protein: 1.3, fat: 0.2, carbs: 5.2 }, // 06061 キャベツ類 キャベツ 結球葉 生
  { id: 'tomato', name: 'トマト', category: '野菜', unit: '100g', calories: 20, protein: 0.7, fat: 0.1, carbs: 4.7 }, // 06182 トマト類 赤色トマト 果実 生
  { id: 'spinach', name: 'ほうれん草(ゆで)', category: '野菜', unit: '100g', calories: 23, protein: 2.6, fat: 0.5, carbs: 4.0 }, // 06268 ほうれんそう 葉 通年平均 ゆで
  { id: 'potato', name: 'じゃがいも(蒸し)', category: '野菜', unit: '100g', calories: 76, protein: 1.9, fat: 0.3, carbs: 18.1 }, // 02018 じゃがいも 塊茎 皮なし 蒸し
  { id: 'banana', name: 'バナナ', category: '果物', unit: '1本(100g)', calories: 93, protein: 1.1, fat: 0.2, carbs: 22.5 }, // 07107 バナナ 生
  { id: 'apple', name: 'りんご', category: '果物', unit: '100g', calories: 56, protein: 0.2, fat: 0.3, carbs: 16.2 }, // 07176 りんご 皮つき 生
]

export const FOOD_CATEGORIES = Array.from(new Set(FOODS.map((f) => f.category)))
