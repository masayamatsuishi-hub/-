import type { FoodItem } from '../types'

/**
 * 出典: 文部科学省「日本食品標準成分表2020年版(八訂)」本表(エネルギー・たんぱく質・脂質・炭水化物)。
 * 各行末尾のコメントは対応する食品番号。ホエイプロテインのみ同成分表に収載がないため、
 * 一般的な製品の表示値を目安として使用。
 */
export const FOODS: FoodItem[] = [
  // 主食
  { id: 'rice-cooked', name: '白米(ごはん)', category: '主食', unit: '100g', calories: 156, protein: 2.5, fat: 0.3, carbs: 37.1 }, // 01088 こめ[水稲めし]精白米 うるち米
  { id: 'brown-rice-cooked', name: '玄米ごはん', category: '主食', unit: '100g', calories: 152, protein: 2.8, fat: 1.0, carbs: 35.6 }, // 01085 こめ[水稲めし]玄米
  { id: 'oatmeal', name: 'オートミール(乾)', category: '主食', unit: '100g', calories: 350, protein: 13.7, fat: 5.7, carbs: 69.1 }, // 01004 えんばく オートミール
  { id: 'bread-white', name: '食パン', category: '主食', unit: '100g', calories: 248, protein: 8.9, fat: 4.1, carbs: 46.4 }, // 01026 こむぎ[パン類]角形食パン 食パン
  { id: 'bread-roll', name: 'ロールパン', category: '主食', unit: '100g', calories: 309, protein: 10.1, fat: 9.0, carbs: 48.6 }, // 01034 こむぎ[パン類]ロールパン
  { id: 'bread-rye', name: 'ライ麦パン', category: '主食', unit: '100g', calories: 252, protein: 8.4, fat: 2.2, carbs: 52.7 }, // 01032 こむぎ[パン類]ライ麦パン
  { id: 'udon-boiled', name: 'うどん(ゆで)', category: '主食', unit: '100g', calories: 95, protein: 2.6, fat: 0.4, carbs: 21.6 }, // 01039 こむぎ[うどん・そうめん類]うどん ゆで
  { id: 'soba-boiled', name: 'そば(ゆで)', category: '主食', unit: '100g', calories: 130, protein: 4.8, fat: 1.0, carbs: 26.0 }, // 01128 そば そば ゆで
  { id: 'pasta-boiled', name: 'スパゲッティ(ゆで)', category: '主食', unit: '100g', calories: 150, protein: 5.8, fat: 0.9, carbs: 32.2 }, // 01064 こむぎ[マカロニ・スパゲッティ類]マカロニ・スパゲッティ ゆで
  { id: 'rice-ball', name: 'おにぎり(1個)', category: '主食', unit: '1個(100g)', calories: 170, protein: 2.7, fat: 0.3, carbs: 39.4 }, // 01111 こめ[うるち米製品]おにぎり
  { id: 'sweet-potato', name: 'さつまいも(皮つき生)', category: '主食', unit: '100g', calories: 127, protein: 0.9, fat: 0.5, carbs: 33.1 }, // 02045 さつまいも 塊根 皮つき 生

  // 肉類
  { id: 'chicken-breast', name: '鶏むね肉(皮なし)', category: '肉類', unit: '100g', calories: 105, protein: 23.3, fat: 1.9, carbs: 0.1 }, // 11220 にわとり[若どり・主品目]むね 皮なし 生
  { id: 'chicken-thigh', name: '鶏もも肉(皮なし)', category: '肉類', unit: '100g', calories: 113, protein: 19.0, fat: 5.0, carbs: 0 }, // 11224 にわとり[若どり・主品目]もも 皮なし 生
  { id: 'chicken-tenderloin', name: '鶏ささみ', category: '肉類', unit: '100g', calories: 98, protein: 23.9, fat: 0.8, carbs: 0.1 }, // 11227 にわとり[若どり・副品目]ささみ 生
  { id: 'pork-loin', name: '豚ロース肉', category: '肉類', unit: '100g', calories: 248, protein: 19.3, fat: 19.2, carbs: 0.2 }, // 11123 ぶた[大型種肉]ロース 脂身つき 生
  { id: 'pork-tenderloin', name: '豚ヒレ肉(赤肉)', category: '肉類', unit: '100g', calories: 118, protein: 22.2, fat: 3.7, carbs: 0.3 }, // 11140 ぶた[大型種肉]ヒレ 赤肉 生
  { id: 'pork-thigh', name: '豚もも肉(赤肉)', category: '肉類', unit: '100g', calories: 119, protein: 22.1, fat: 3.6, carbs: 0.2 }, // 11134 ぶた[大型種肉]もも 赤肉 生
  { id: 'beef-lean', name: '牛もも肉(赤身)', category: '肉類', unit: '100g', calories: 176, protein: 21.3, fat: 10.7, carbs: 0.6 }, // 11021 うし[和牛肉]もも 赤肉 生
  { id: 'lamb-thigh', name: 'ラム肉(もも)', category: '肉類', unit: '100g', calories: 164, protein: 20.0, fat: 12.0, carbs: 0.3 }, // 11203 めんよう[ラム]もも 脂身つき 生

  // 卵・乳製品
  { id: 'egg', name: '鶏卵', category: '卵・乳製品', unit: '100g(約2個)', calories: 142, protein: 12.2, fat: 10.2, carbs: 0.4 }, // 12004 鶏卵 全卵 生
  { id: 'quail-egg', name: 'うずら卵', category: '卵・乳製品', unit: '100g', calories: 157, protein: 12.6, fat: 13.1, carbs: 0.3 }, // 12002 うずら卵 全卵 生
  { id: 'milk', name: '牛乳', category: '卵・乳製品', unit: '100ml', calories: 61, protein: 3.3, fat: 3.8, carbs: 4.8 }, // 13003 普通牛乳
  { id: 'yogurt', name: 'ヨーグルト(無糖)', category: '卵・乳製品', unit: '100g', calories: 56, protein: 3.6, fat: 3.0, carbs: 4.9 }, // 13025 ヨーグルト 全脂無糖
  { id: 'protein-powder', name: 'ホエイプロテイン', category: '卵・乳製品', unit: '1杯(30g)', servingGrams: 30, calories: 390, protein: 80, fat: 5, carbs: 10 }, // 成分表に収載なし。一般的な製品の表示値
  { id: 'cheese', name: 'プロセスチーズ', category: '卵・乳製品', unit: '100g', calories: 313, protein: 22.7, fat: 26.0, carbs: 1.3 }, // 13040 プロセスチーズ

  // 魚介類
  { id: 'salmon', name: '鮭(生)', category: '魚介類', unit: '100g', calories: 124, protein: 22.3, fat: 4.1, carbs: 0.1 }, // 10134 さけ・ます類 しろさけ 生
  { id: 'tuna-canned', name: 'ツナ缶(水煮)', category: '魚介類', unit: '100g', calories: 70, protein: 16.0, fat: 0.7, carbs: 0.2 }, // 10260 まぐろ類 缶詰 水煮 フレーク ライト
  { id: 'katsuo', name: 'かつお(生)', category: '魚介類', unit: '100g', calories: 108, protein: 25.8, fat: 0.5, carbs: 0.1 }, // 10086 かつお類 かつお 春獲り 生
  { id: 'saba', name: 'さば(生)', category: '魚介類', unit: '100g', calories: 211, protein: 20.6, fat: 16.8, carbs: 0.3 }, // 10154 さば類 まさば 生
  { id: 'aji', name: 'あじ(生)', category: '魚介類', unit: '100g', calories: 112, protein: 19.7, fat: 4.5, carbs: 0.1 }, // 10003 あじ類 まあじ 皮つき 生
  { id: 'iwashi', name: 'いわし(生)', category: '魚介類', unit: '100g', calories: 156, protein: 19.2, fat: 9.2, carbs: 0.2 }, // 10047 いわし類 まいわし 生
  { id: 'buri', name: 'ぶり(生)', category: '魚介類', unit: '100g', calories: 222, protein: 21.4, fat: 17.6, carbs: 0.3 }, // 10241 ぶり 成魚 生
  { id: 'tara', name: 'たら(生)', category: '魚介類', unit: '100g', calories: 72, protein: 17.6, fat: 0.2, carbs: 0.1 }, // 10205 たら類 まだら 生
  { id: 'shirasu', name: 'しらす干し', category: '魚介類', unit: '100g', calories: 113, protein: 24.5, fat: 2.1, carbs: 0.1 }, // 10055 いわし類 しらす干し 微乾燥品
  { id: 'ebi', name: 'えび(バナメイ, 生)', category: '魚介類', unit: '100g', calories: 82, protein: 19.6, fat: 0.6, carbs: 0.7 }, // 10415 えび類 バナメイえび 養殖 生
  { id: 'ika', name: 'いか(生)', category: '魚介類', unit: '100g', calories: 76, protein: 17.9, fat: 0.8, carbs: 0.1 }, // 10345 いか類 するめいか 生
  { id: 'tako', name: 'たこ(生)', category: '魚介類', unit: '100g', calories: 70, protein: 16.4, fat: 0.7, carbs: 0.1 }, // 10361 たこ類 まだこ 生
  { id: 'chikuwa', name: 'ちくわ', category: '魚介類', unit: '100g', calories: 119, protein: 12.2, fat: 2.0, carbs: 13.5 }, // 10381 水産練り製品 焼き竹輪
  { id: 'kanikama', name: 'かに風味かまぼこ', category: '魚介類', unit: '100g', calories: 89, protein: 12.1, fat: 0.5, carbs: 9.2 }, // 10376 水産練り製品 かに風味かまぼこ

  // 大豆製品
  { id: 'tofu', name: '木綿豆腐', category: '大豆製品', unit: '100g', calories: 73, protein: 7.0, fat: 4.9, carbs: 1.5 }, // 04032 だいず[豆腐・油揚げ類]木綿豆腐
  { id: 'atsuage', name: '厚揚げ(生揚げ)', category: '大豆製品', unit: '100g', calories: 143, protein: 10.7, fat: 11.3, carbs: 0.9 }, // 04039 だいず[豆腐・油揚げ類]生揚げ
  { id: 'aburaage', name: '油揚げ', category: '大豆製品', unit: '100g', calories: 377, protein: 23.4, fat: 34.4, carbs: 0.4 }, // 04040 だいず[豆腐・油揚げ類]油揚げ 生
  { id: 'natto', name: '納豆', category: '大豆製品', unit: '1パック(50g)', servingGrams: 50, calories: 190, protein: 16.5, fat: 10.0, carbs: 12.1 }, // 04046 だいず[納豆類]糸引き納豆
  { id: 'edamame', name: '枝豆(生)', category: '大豆製品', unit: '100g', calories: 125, protein: 11.7, fat: 6.2, carbs: 8.8 }, // 06015 えだまめ 生
  { id: 'soybean-boiled', name: '蒸し大豆(ゆで)', category: '大豆製品', unit: '100g', calories: 163, protein: 14.8, fat: 9.8, carbs: 8.4 }, // 04024 だいず[全粒・全粒製品]黄大豆 国産 ゆで
  { id: 'okara', name: 'おから', category: '大豆製品', unit: '100g', calories: 88, protein: 6.1, fat: 3.6, carbs: 13.8 }, // 04051 だいず[その他]おから 生
  { id: 'soymilk', name: '豆乳(無調整)', category: '大豆製品', unit: '100ml', calories: 44, protein: 3.6, fat: 2.0, carbs: 3.1 }, // 04052 だいず[その他]豆乳 豆乳

  // 野菜
  { id: 'broccoli', name: 'ブロッコリー(ゆで)', category: '野菜', unit: '100g', calories: 30, protein: 3.9, fat: 0.4, carbs: 5.2 }, // 06264 ブロッコリー 花序 ゆで
  { id: 'cabbage', name: 'キャベツ', category: '野菜', unit: '100g', calories: 21, protein: 1.3, fat: 0.2, carbs: 5.2 }, // 06061 キャベツ類 キャベツ 結球葉 生
  { id: 'tomato', name: 'トマト', category: '野菜', unit: '100g', calories: 20, protein: 0.7, fat: 0.1, carbs: 4.7 }, // 06182 トマト類 赤色トマト 果実 生
  { id: 'spinach', name: 'ほうれん草(ゆで)', category: '野菜', unit: '100g', calories: 23, protein: 2.6, fat: 0.5, carbs: 4.0 }, // 06268 ほうれんそう 葉 通年平均 ゆで
  { id: 'potato', name: 'じゃがいも(蒸し)', category: '野菜', unit: '100g', calories: 76, protein: 1.9, fat: 0.3, carbs: 18.1 }, // 02018 じゃがいも 塊茎 皮なし 蒸し
  { id: 'carrot', name: 'にんじん', category: '野菜', unit: '100g', calories: 30, protein: 0.8, fat: 0.1, carbs: 8.7 }, // 06214 にんじん類 にんじん 根 皮なし 生
  { id: 'onion', name: 'たまねぎ', category: '野菜', unit: '100g', calories: 33, protein: 1.0, fat: 0.1, carbs: 8.4 }, // 06153 たまねぎ類 たまねぎ りん茎 生
  { id: 'cucumber', name: 'きゅうり', category: '野菜', unit: '100g', calories: 13, protein: 1.0, fat: 0.1, carbs: 3.0 }, // 06065 きゅうり 果実 生
  { id: 'moyashi', name: 'もやし', category: '野菜', unit: '100g', calories: 15, protein: 1.7, fat: 0.1, carbs: 2.6 }, // 06291 もやし類 りょくとうもやし 生
  { id: 'eggplant', name: 'なす', category: '野菜', unit: '100g', calories: 18, protein: 1.1, fat: 0.1, carbs: 5.1 }, // 06191 なす類 なす 果実 生
  { id: 'green-pepper', name: 'ピーマン', category: '野菜', unit: '100g', calories: 20, protein: 0.9, fat: 0.2, carbs: 5.1 }, // 06245 ピーマン類 青ピーマン 果実 生
  { id: 'renkon', name: 'れんこん', category: '野菜', unit: '100g', calories: 66, protein: 1.9, fat: 0.1, carbs: 15.5 }, // 06317 れんこん 根茎 生
  { id: 'daikon', name: '大根', category: '野菜', unit: '100g', calories: 15, protein: 0.5, fat: 0.1, carbs: 4.1 }, // 06132 だいこん類 だいこん 根 皮つき 生
  { id: 'pumpkin', name: 'かぼちゃ(西洋)', category: '野菜', unit: '100g', calories: 78, protein: 1.9, fat: 0.3, carbs: 20.6 }, // 06048 かぼちゃ類 西洋かぼちゃ 果実 生
  { id: 'corn', name: 'とうもろこし', category: '野菜', unit: '100g', calories: 89, protein: 3.6, fat: 1.7, carbs: 16.8 }, // 06175 とうもろこし類 スイートコーン 未熟種子 生
  { id: 'burdock', name: 'ごぼう', category: '野菜', unit: '100g', calories: 58, protein: 1.8, fat: 0.1, carbs: 15.4 }, // 06084 ごぼう 根 生
  { id: 'ginger', name: 'しょうが', category: '野菜', unit: '100g', calories: 28, protein: 0.9, fat: 0.3, carbs: 6.6 }, // 06103 しょうが類 しょうが 根茎 皮なし 生
  { id: 'garlic', name: 'にんにく', category: '野菜', unit: '100g', calories: 129, protein: 6.4, fat: 0.9, carbs: 27.5 }, // 06223 にんにく類 にんにく りん茎 生
  { id: 'green-onion', name: '長ねぎ', category: '野菜', unit: '100g', calories: 35, protein: 1.4, fat: 0.1, carbs: 8.3 }, // 06226 ねぎ類 根深ねぎ 葉 軟白 生

  // きのこ類
  { id: 'enoki', name: 'えのきたけ', category: 'きのこ類', unit: '100g', calories: 34, protein: 2.7, fat: 0.2, carbs: 7.6 }, // 08001 えのきたけ 生
  { id: 'shiitake', name: 'しいたけ(生)', category: 'きのこ類', unit: '100g', calories: 25, protein: 3.1, fat: 0.3, carbs: 6.4 }, // 08039 しいたけ 生しいたけ 菌床栽培 生
  { id: 'shimeji', name: 'しめじ', category: 'きのこ類', unit: '100g', calories: 26, protein: 2.7, fat: 0.5, carbs: 4.8 }, // 08016 しめじ類 ぶなしめじ 生
  { id: 'maitake', name: 'まいたけ', category: 'きのこ類', unit: '100g', calories: 22, protein: 2.0, fat: 0.5, carbs: 4.4 }, // 08028 まいたけ 生
  { id: 'eringi', name: 'エリンギ', category: 'きのこ類', unit: '100g', calories: 31, protein: 2.8, fat: 0.4, carbs: 6.0 }, // 08025 ひらたけ類 エリンギ 生

  // 海藻類
  { id: 'hijiki', name: 'ひじき(乾)', category: '海藻類', unit: '100g', calories: 180, protein: 9.2, fat: 3.2, carbs: 58.4 }, // 09050 ひじき ほしひじき ステンレス釜 乾
  { id: 'wakame', name: 'わかめ(カット乾)', category: '海藻類', unit: '100g', calories: 186, protein: 17.9, fat: 4.0, carbs: 42.1 }, // 09044 わかめ カットわかめ 乾
  { id: 'mozuku', name: 'もずく(塩抜き)', category: '海藻類', unit: '100g', calories: 4, protein: 0.2, fat: 0.1, carbs: 1.4 }, // 09038 もずく類 もずく 塩蔵 塩抜き
  { id: 'konbu', name: 'こんぶ(素干し)', category: '海藻類', unit: '100g', calories: 170, protein: 5.8, fat: 1.3, carbs: 64.3 }, // 09017 こんぶ類 まこんぶ 素干し 乾

  // 種実類
  { id: 'almond', name: 'アーモンド(いり)', category: '種実類', unit: '100g', calories: 608, protein: 20.3, fat: 54.1, carbs: 20.7 }, // 05040 アーモンド いり 無塩
  { id: 'walnut', name: 'くるみ(いり)', category: '種実類', unit: '100g', calories: 713, protein: 14.6, fat: 68.8, carbs: 11.7 }, // 05014 くるみ いり

  // 果物
  { id: 'banana', name: 'バナナ', category: '果物', unit: '1本(100g)', calories: 93, protein: 1.1, fat: 0.2, carbs: 22.5 }, // 07107 バナナ 生
  { id: 'apple', name: 'りんご', category: '果物', unit: '100g', calories: 56, protein: 0.2, fat: 0.3, carbs: 16.2 }, // 07176 りんご 皮つき 生
  { id: 'orange', name: 'オレンジ(ネーブル)', category: '果物', unit: '100g', calories: 48, protein: 0.9, fat: 0.1, carbs: 11.8 }, // 07040 かんきつ類 オレンジ ネーブル 砂じょう 生
  { id: 'mikan', name: 'みかん', category: '果物', unit: '100g', calories: 49, protein: 0.5, fat: 0.1, carbs: 11.9 }, // 07026 かんきつ類 うんしゅうみかん じょうのう 早生 生
  { id: 'grapefruit', name: 'グレープフルーツ', category: '果物', unit: '100g', calories: 40, protein: 0.9, fat: 0.1, carbs: 9.6 }, // 07062 かんきつ類 グレープフルーツ 白肉種 砂じょう 生
  { id: 'kiwi', name: 'キウイフルーツ', category: '果物', unit: '100g', calories: 51, protein: 1.0, fat: 0.2, carbs: 13.4 }, // 07054 キウイフルーツ 緑肉種 生
  { id: 'strawberry', name: 'いちご', category: '果物', unit: '100g', calories: 31, protein: 0.9, fat: 0.1, carbs: 8.5 }, // 07012 いちご 生
]

export const FOOD_CATEGORIES = Array.from(new Set(FOODS.map((f) => f.category)))
