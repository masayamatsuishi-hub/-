// Supabase Edge Function: Stripe Webhook (サブスクリプション状態の同期)
// デプロイ: supabase functions deploy stripe-webhook --no-verify-jwt
// Stripe側の Webhook エンドポイントに登録: <SUPABASE_URL>/functions/v1/stripe-webhook
// 必須シークレット: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
import { createClient } from 'jsr:@supabase/supabase-js@2'
import Stripe from 'npm:stripe@^17.0.0'

Deno.serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature')
  const body = await req.text()

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', { apiVersion: '2024-06-20' })
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature ?? '', webhookSecret)
  } catch (e) {
    return new Response(`Webhook signature verification failed: ${e instanceof Error ? e.message : e}`, {
      status: 400,
    })
  }

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  )

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.supabase_user_id
      if (userId) {
        await supabaseAdmin
          .from('profiles')
          .update({
            is_pro: true,
            subscription_status: 'active',
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
          })
          .eq('id', userId)
      }
      break
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const isActive = ['active', 'trialing'].includes(subscription.status)
      await supabaseAdmin
        .from('profiles')
        .update({ is_pro: isActive, subscription_status: subscription.status })
        .eq('stripe_customer_id', subscription.customer as string)
      break
    }
    default:
      break
  }

  return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' } })
})
