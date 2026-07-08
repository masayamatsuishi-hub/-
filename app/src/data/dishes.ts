import type { FoodItem } from '../types'

/**
 * 出典: 文部科学省「日本食品標準成分表2020年版(八訂)」本表 18 調理済み流通食品類、
 * 12 卵類(厚焼きたまご)。()付きの値は同成分表内でも「文献等をもとに推計した値」とされているもので、
 * 実際に使う具材の種類・量・味付けによって変動する。あくまで一般的なレシピをもとにした目安として扱うこと。
 */
export const DISHES: FoodItem[] = [
  { id: 'nikujaga', name: '肉じゃが', category: '和食', unit: '1人前(150g)', servingGrams: 150, calories: 78, protein: 4.3, fat: 1.3, carbs: 13.0, note: '肉の量や砂糖・みりんの加減で変動' }, // 18036
  { id: 'mapo-tofu', name: '麻婆豆腐', category: '中華', unit: '1人前(200g)', servingGrams: 200, calories: 104, protein: 7.8, fat: 6.8, carbs: 3.8, note: 'ひき肉の量や辛さ・油の量で変動' }, // 18049
  { id: 'hamburg-steak', name: 'ハンバーグ(合いびき)', category: '洋食', unit: '1人前(150g)', servingGrams: 150, calories: 197, protein: 13.4, fat: 12.2, carbs: 10.0, note: '肉の配合やソースの種類で変動' }, // 18050
  { id: 'oyakodon-topping', name: '親子丼の具', category: '和食', unit: '1人前(150g)', servingGrams: 150, calories: 101, protein: 8.4, fat: 5.2, carbs: 5.6, note: 'ご飯は含まない。ご飯は別途「食品から選ぶ」で追加' }, // 18030
  { id: 'gyoza', name: 'ぎょうざ', category: '中華', unit: '6個(120g)', servingGrams: 120, calories: 209, protein: 6.9, fat: 11.3, carbs: 22.3, note: '具の肉・野菜の割合や皮の厚さで変動' }, // 18002
  { id: 'beef-stew', name: 'ビーフシチュー', category: '洋食', unit: '1人前(250g)', servingGrams: 250, calories: 153, protein: 4.1, fat: 12.6, carbs: 7.1, note: '肉の量やルウの種類で変動' }, // 18011
  { id: 'chicken-stew', name: 'チキンシチュー', category: '洋食', unit: '1人前(250g)', servingGrams: 250, calories: 124, protein: 6.2, fat: 8.0, carbs: 7.8, note: '肉の量やクリームの量で変動' }, // 18045
  { id: 'potato-korokke', name: 'ポテトコロッケ', category: '洋食', unit: '1個(80g)', servingGrams: 80, calories: 226, protein: 5.3, fat: 12.6, carbs: 25.2, note: '揚げ油の吸収量や具の配合で変動' }, // 18018
  { id: 'ebi-gratin', name: 'えびグラタン', category: '洋食', unit: '1人前(200g)', servingGrams: 200, calories: 128, protein: 5.5, fat: 6.9, carbs: 12.1, note: 'チーズ・ホワイトソースの量で変動' }, // 18003
  { id: 'subuta', name: '酢豚', category: '中華', unit: '1人前(200g)', servingGrams: 200, calories: 77, protein: 4.6, fat: 3.3, carbs: 7.6, note: '肉の量や衣・甘酢あんの量で変動' }, // 18047
  { id: 'happosai', name: '八宝菜', category: '中華', unit: '1人前(200g)', servingGrams: 200, calories: 64, protein: 5.8, fat: 3.2, carbs: 3.8, note: '具材(肉・魚介・野菜)の配合で変動' }, // 18048
  { id: 'shumai', name: 'しゅうまい', category: '中華', unit: '5個(100g)', servingGrams: 100, calories: 191, protein: 9.1, fat: 9.2, carbs: 19.5, note: '具の肉と皮の割合で変動' }, // 18012
  { id: 'ebi-fry', name: 'えびフライ', category: '洋食', unit: '3尾(100g)', servingGrams: 100, calories: 236, protein: 15.9, fat: 11.6, carbs: 20.5, note: '衣の量や揚げ油の吸収量で変動' }, // 18020
  { id: 'chikuzenni', name: '筑前煮', category: '和食', unit: '1人前(150g)', servingGrams: 150, calories: 85, protein: 4.4, fat: 3.5, carbs: 10.2, note: '鶏肉・根菜の配合や味付けで変動' }, // 18035
  { id: 'kinpira-gobo', name: 'きんぴらごぼう', category: '和食', unit: '小鉢(60g)', servingGrams: 60, calories: 84, protein: 1.4, fat: 4.5, carbs: 11.3, note: '油の量や砂糖・みりんの加減で変動' }, // 18033
  { id: 'tamagoyaki', name: '厚焼きたまご', category: '和食', unit: '2切れ(60g)', servingGrams: 60, calories: 146, protein: 10.5, fat: 9.2, carbs: 6.5, note: '卵以外の材料(だし・砂糖)の配合で変動' }, // 12018
]

export const DISH_CATEGORIES = Array.from(new Set(DISHES.map((d) => d.category)))
