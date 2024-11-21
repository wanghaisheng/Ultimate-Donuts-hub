import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { cors } from 'hono/cors';
import Stripe from 'stripe';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

app.use('*', cors());

app.post('/checkout', async (c) => {
  try {
    const { lineItems, user } = await c.req.json();
    const origin = c.req.header('origin');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/donuts/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donuts/cancel`,
      customer_email: user?.email,
    });
    return c.json({ session });
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
});

app.get('/get-stripe-session/:session_id', async (c) => {
  const sessionId = c.req.param('session_id');
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return c.json({ session });
  } catch (error) {
    console.error('Error retrieving session:', error);
    return c.json({ error: 'Error retrieving session details' }, 500);
  }
});

app.post('/cancel-order', async (c) => {
  const { payment_intent } = await c.req.json();
  try {
    const refund = await stripe.refunds.create({ payment_intent });
    return c.json({ refund });
  } catch (error) {
    return c.json({ error: `Stripe Error: ${(error as Error).message}` }, 500);
  }
});

export default handle(app);
