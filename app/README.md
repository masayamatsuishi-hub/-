# FuuSpo - アスリート向けAI栄養管理PWA

スポーツ選手(学生アスリート〜社会人選手)のための、AIによるスポーツ栄養アドバイス機能付き食事管理アプリです。

## 主な機能

- 食事記録(カロリー・タンパク質・脂質・炭水化物)。内蔵の食品データベースから選択、または手入力
- 種目別の主な練習メニューを選択し、METs(メッツ)値から練習の消費カロリーを算出する運動記録
- 摂取カロリー目標は「基礎代謝×生活活動係数(1.2) + その日の練習消費カロリー」から算出し、栄養計算に反映
- PFCバランスの円グラフ表示
- 体重あたりのタンパク質摂取目標と達成率の表示
- BMI・基礎代謝(BMR)の自動計算
- 直近14日間の食事・練習履歴表示
- Claude API を使ったAIスポーツ栄養アドバイス(Proプラン限定)
- Stripe Checkout によるProプラン(サブスクリプション)課金
- PWA対応(スマートフォンにインストール可能)

## 技術スタック

- React + TypeScript + Vite
- Tailwind CSS v4
- Zustand(状態管理)
- Supabase(認証・Postgres データベース・Edge Functions)
- Claude API(AIアドバイス、Supabase Edge Function経由で呼び出し)
- Stripe(サブスクリプション課金、Supabase Edge Function経由で呼び出し)
- vite-plugin-pwa(PWA化)

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. Supabase プロジェクトの準備

1. [Supabase](https://supabase.com) でプロジェクトを作成
2. SQL Editor で `supabase/migrations/` 配下のSQLファイル(`0001_init.sql`, `0002_training_logs.sql`)を順番に実行し、`profiles` / `meal_logs` / `training_logs` テーブルとRLSポリシーを作成
3. Authentication > Providers でメール認証を有効化(デフォルトで有効)

### 3. 環境変数の設定

`.env.example` を `.env.local` にコピーし、Supabaseプロジェクトの値を設定してください。

```bash
cp .env.example .env.local
```

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. 開発サーバー起動

```bash
npm run dev
```

### 5. ビルド

```bash
npm run build
```

## Supabase Edge Functions のデプロイ(AIアドバイス・Stripe課金)

`supabase/functions/` 配下に3つのEdge Functionがあります。[Supabase CLI](https://supabase.com/docs/guides/cli) でデプロイしてください。

```bash
supabase functions deploy ai-advice
supabase functions deploy stripe-checkout
supabase functions deploy stripe-webhook --no-verify-jwt
```

### 必須シークレット(`supabase secrets set`)

| シークレット名 | 用途 |
| --- | --- |
| `ANTHROPIC_API_KEY` | Claude API 呼び出し(ai-advice) |
| `STRIPE_SECRET_KEY` | Stripe API 呼び出し(stripe-checkout, stripe-webhook) |
| `STRIPE_PRICE_ID_PRO` | ProプランのStripe Price ID(stripe-checkout) |
| `STRIPE_WEBHOOK_SECRET` | Webhook署名検証用シークレット(stripe-webhook) |
| `APP_URL` | Checkout完了後のリダイレクト先(例: `https://your-app.example.com`) |

`SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` は Supabase により自動注入されます。

Stripeダッシュボードの Webhook 設定で、エンドポイントに
`https://<プロジェクトref>.supabase.co/functions/v1/stripe-webhook` を登録し、
`checkout.session.completed` / `customer.subscription.updated` / `customer.subscription.deleted`
イベントを購読してください。

## ディレクトリ構成

```
app/
├── src/
│   ├── components/    # 共通UIコンポーネント
│   ├── pages/         # 画面ごとのページコンポーネント
│   ├── store/         # Zustand ストア(認証・食事記録・練習記録)
│   ├── data/          # 内蔵食品データベース・種目別練習メニュー(METs)
│   ├── utils/         # 栄養計算(BMR/TDEE/PFC等)・日付ユーティリティ
│   ├── lib/supabase.ts # Supabase クライアント
│   └── types/         # 型定義
└── supabase/
    ├── migrations/    # DBスキーマ
    └── functions/     # Edge Functions (AIアドバイス, Stripe)
```

## 料金プラン

- **Free**: 食事記録・タンパク質達成率・7日間の履歴
- **Pro(月額980円)**: Claude AIによるスポーツ栄養アドバイス、無制限の履歴、詳細分析
