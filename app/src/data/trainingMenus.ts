import type { TrainingMenuItem } from '../types'

const CUSTOM_ITEM: TrainingMenuItem = { id: 'custom', name: 'その他(メッツを直接入力)', mets: 6.0 }

/**
 * 各種目の主な練習メニューとMETs(メッツ)値。
 * 出典: 国立健康・栄養研究所「身体活動のメッツ表」を参考にした目安値。
 */
export const TRAINING_MENUS: Record<string, TrainingMenuItem[]> = {
  陸上競技: [
    { id: 'track-jog', name: 'ウォームアップ・ジョグ', mets: 6.0 },
    { id: 'track-interval', name: 'インターバル走', mets: 12.0 },
    { id: 'track-sprint', name: '流し・スプリント練習', mets: 10.0 },
    { id: 'track-strength', name: '筋力トレーニング', mets: 6.0 },
    { id: 'track-core', name: '補強・体幹トレーニング', mets: 4.0 },
  ],
  サッカー: [
    { id: 'soccer-pass', name: 'パス・トラップ練習', mets: 4.0 },
    { id: 'soccer-rondo', name: 'ボール回し(ロンド)', mets: 5.5 },
    { id: 'soccer-shoot', name: 'シュート練習', mets: 5.0 },
    { id: 'soccer-mini', name: 'ミニゲーム', mets: 7.0 },
    { id: 'soccer-match', name: '紅白戦・試合形式', mets: 10.0 },
    { id: 'soccer-run', name: '走り込み(ランニングトレーニング)', mets: 8.0 },
  ],
  バスケットボール: [
    { id: 'bball-shoot', name: 'シューティング練習', mets: 4.5 },
    { id: 'bball-handling', name: 'ドリブル・ハンドリング', mets: 4.5 },
    { id: 'bball-1on1', name: '1on1', mets: 8.0 },
    { id: 'bball-5on5', name: '5on5(ゲーム形式)', mets: 8.0 },
    { id: 'bball-run', name: 'ランニングトレーニング', mets: 8.0 },
  ],
  野球: [
    { id: 'baseball-catch', name: 'キャッチボール', mets: 3.0 },
    { id: 'baseball-fielding', name: 'ノック(守備練習)', mets: 5.0 },
    { id: 'baseball-batting', name: 'バッティング練習', mets: 4.0 },
    { id: 'baseball-running', name: '走塁練習', mets: 6.0 },
    { id: 'baseball-run', name: 'ランニング', mets: 7.0 },
  ],
  ラグビー: [
    { id: 'rugby-pass', name: 'パス練習', mets: 4.0 },
    { id: 'rugby-contact', name: 'コンタクト練習', mets: 7.0 },
    { id: 'rugby-run', name: 'ランニングトレーニング', mets: 8.0 },
    { id: 'rugby-match', name: '紅白戦・試合形式', mets: 10.0 },
  ],
  水泳: [
    { id: 'swim-easy', name: 'クロール(ゆっくり)', mets: 6.0 },
    { id: 'swim-fast', name: 'クロール(速い)', mets: 10.0 },
    { id: 'swim-interval', name: 'インターバル練習', mets: 11.0 },
    { id: 'swim-kick', name: 'キック練習', mets: 8.0 },
  ],
  バレーボール: [
    { id: 'volley-serve', name: 'サーブ・レシーブ練習', mets: 4.0 },
    { id: 'volley-spike', name: 'スパイク練習', mets: 5.0 },
    { id: 'volley-game', name: 'ゲーム形式', mets: 6.0 },
  ],
  '柔道・レスリング': [
    { id: 'judo-uchikomi', name: '打ち込み・技の練習', mets: 6.0 },
    { id: 'judo-randori', name: '乱取り・スパーリング', mets: 10.3 },
    { id: 'judo-strength', name: '筋力トレーニング', mets: 6.0 },
  ],
  剣道: [
    { id: 'kendo-suburi', name: '素振り', mets: 5.0 },
    { id: 'kendo-uchikomi', name: '打ち込み稽古', mets: 7.0 },
    { id: 'kendo-jigeiko', name: '地稽古(実践練習)', mets: 9.0 },
  ],
  テニス: [
    { id: 'tennis-form', name: '素振り・フォーム練習', mets: 4.0 },
    { id: 'tennis-rally', name: 'ラリー練習', mets: 6.0 },
    { id: 'tennis-match', name: '試合形式', mets: 8.0 },
  ],
  その他: [
    { id: 'general-light', name: '軽い運動', mets: 4.0 },
    { id: 'general-moderate', name: '中程度の運動', mets: 6.0 },
    { id: 'general-hard', name: '高強度の運動', mets: 8.0 },
    { id: 'general-strength', name: '筋力トレーニング', mets: 6.0 },
  ],
}

export function getTrainingMenusForSport(sport: string): TrainingMenuItem[] {
  const menus = TRAINING_MENUS[sport] ?? TRAINING_MENUS['その他']
  return [...menus, CUSTOM_ITEM]
}
