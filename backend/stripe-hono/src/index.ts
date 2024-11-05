import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import 'dotenv/config';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const app = new Hono();

app.get('/', (c) => c.text(`Hello Hono on Node.js! ${process.env.STRIPE_PUBLISHABLE_KEY}`));

app.post('/checkout', async (c) => {
  try {
    const { lineItems } = await c.req.json();
    const origin = c.req.header('origin');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return c.json({ id: session.id });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

serve(app);
