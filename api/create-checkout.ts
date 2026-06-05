import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { planName, userId, userEmail, returnUrl } = req.body;

  if (!planName || !userId || !userEmail) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    // 1. Identificar o preço com base no plano (Isso normalmente vem do banco ou constante)
    // Para teste, vamos usar valores fixos ou criar dinamicamente
    let priceId = '';
    
    // ATENÇÃO: Em produção, você cria os Produtos no painel do Stripe e copia os IDs de Preço (Price ID).
    // Como estamos apenas implementando a arquitetura com chaves de teste novas,
    // nós vamos criar o Produto e o Preço On-the-fly para o checkout caso não tenhamos o ID.
    // O ideal é colocar os IDs fixos aqui:
    if (planName === 'Pro') {
      priceId = process.env.STRIPE_PRICE_ID_PRO || ''; 
    } else if (planName === 'Enterprise') {
      priceId = process.env.STRIPE_PRICE_ID_ENTERPRISE || '';
    }

    // Como você ainda não criou os produtos no painel, vamos criar dinamicamente apenas para este teste funcionar:
    if (!priceId) {
      const product = await stripe.products.create({
        name: `Plano ${planName} - EngenhariaPro`,
        description: 'Assinatura mensal do CRM',
      });
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: planName === 'Pro' ? 9900 : 29900, // em centavos (R$ 99,00)
        currency: 'brl',
        recurring: { interval: 'month' },
      });
      priceId = price.id;
    }

    // 2. Criar a sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      metadata: {
        user_id: userId, // Importante para o webhook saber quem pagou
      },
      success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?canceled=true`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ error: error.message });
  }
}
