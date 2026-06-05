import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
});

// A chave Service Role do Supabase ignora as políticas de RLS, permitindo que nosso backend seguro atualize as tabelas
const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// Necessário para o Vercel não parsear o body como JSON puro, pois o Stripe precisa do raw body para checar a assinatura
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper para ler o raw body do stream (necessário para stripe.webhooks.constructEvent)
async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return res.status(400).send('Missing signature or secret');
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        const stripeCustomerId = session.customer as string;
        const stripeSubscriptionId = session.subscription as string;

        if (userId) {
          // Salvar ou atualizar o cliente
          await supabaseAdmin.from('stripe_customers').upsert({
            user_id: userId,
            stripe_customer_id: stripeCustomerId,
          }, { onConflict: 'user_id' });

          // Salvar a nova assinatura
          await supabaseAdmin.from('subscriptions').upsert({
            user_id: userId,
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,
            status: 'active',
            plan_id: 'pro', // ou ler dos line_items
          }, { onConflict: 'user_id' });
        }
        break;
      }
      
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Procurar qual usuário é dono deste stripe_customer_id
        const { data: customerData } = await supabaseAdmin
          .from('stripe_customers')
          .select('user_id')
          .eq('stripe_customer_id', subscription.customer as string)
          .single();

        if (customerData?.user_id) {
          await supabaseAdmin.from('subscriptions').upsert({
            user_id: customerData.user_id,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer as string,
            status: subscription.status,
            plan_id: subscription.items.data[0].price.id,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          }, { onConflict: 'user_id' });
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Erro processando webhook', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
