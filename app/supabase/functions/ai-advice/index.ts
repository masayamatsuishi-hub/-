// Supabase Edge Function: Claude API を使ったスポーツ栄養アドバイス生成
// デプロイ: supabase functions deploy ai-advice
// 必須シークレット: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (自動注入)
import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-5'

interface RequestBody {
  profile: {
    sex: string
    age: number
    height_cm: number
    weight_kg: number
    sport: string
    activity_level: string
    protein_target_g_per_kg: number
  }
  today: {
    logs: { food_name: string; grams: number; calories: number; protein: number; fat: number; carbs: number }[]
    totals: { calories: number; protein: number; fat: number; carbs: number }
    proteinTarget: number
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: '認証が必要です' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(authHeader.replace('Bearer ', ''))
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'ユーザーを確認できませんでした' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: profileRow, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('is_pro')
      .eq('id', user.id)
      .single()
    if (profileError || !profileRow?.is_pro) {
      return new Response(JSON.stringify({ error: 'この機能はProプラン限定です' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const body: RequestBody = await req.json()
    const { profile, today } = body

    const mealSummary = today.logs.length
      ? today.logs.map((l) => `- ${l.food_name}(${l.grams}g): ${l.calories}kcal P${l.protein}g F${l.fat}g C${l.carbs}g`).join('\n')
      : '(まだ記録がありません)'

    const userPrompt = `以下は選手のプロフィールと本日の食事記録です。スポーツ栄養士としてのアドバイスを日本語で、
具体的かつ実践的に(300字程度)提供してください。良い点は褒め、不足している栄養素があれば改善案となる具体的な食品を提案してください。

【プロフィール】
性別: ${profile.sex === 'male' ? '男性' : '女性'}
年齢: ${profile.age}歳
身長: ${profile.height_cm}cm
体重: ${profile.weight_kg}kg
競技: ${profile.sport}
練習強度: ${profile.activity_level}
タンパク質目標: ${profile.protein_target_g_per_kg}g/kg体重 (${today.proteinTarget.toFixed(0)}g)

【本日の食事記録】
${mealSummary}

【本日の合計】
カロリー: ${Math.round(today.totals.calories)}kcal
タンパク質: ${Math.round(today.totals.protein)}g
脂質: ${Math.round(today.totals.fat)}g
炭水化物: ${Math.round(today.totals.carbs)}g`

    const apiKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY が設定されていません' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const anthropicRes = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 700,
        system:
          'あなたは経験豊富なスポーツ栄養士です。学生アスリートにも分かりやすく、専門的かつ実践的なアドバイスを日本語で行います。',
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text()
      return new Response(JSON.stringify({ error: `Claude API エラー: ${errText}` }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const anthropicData = await anthropicRes.json()
    const advice = anthropicData.content?.[0]?.text ?? 'アドバイスを生成できませんでした。'

    return new Response(JSON.stringify({ advice }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : '不明なエラー' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
