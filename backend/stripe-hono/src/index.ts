import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';
// import { handle } from '@hono/node-server/vercel';
import { serve } from '@hono/node-server';
import Stripe from 'stripe';
import 'dotenv/config';

const app = new Hono();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

app.use('*', cors());

app.post('/api/checkout', async (c) => {
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
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get('/api/get-stripe-session/:session_id', async (c) => {
  const sessionId = c.req.param('session_id');
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return c.json({ session });
  } catch (error) {
    console.error('Error retrieving session:', error);
    return c.json({ error: 'Error retrieving session details' }, 500);
  }
});

app.post('/api/cancel-order', async (c) => {
  const { payment_intent } = await c.req.json();
  try {
    const refund = await stripe.refunds.create({ payment_intent });
    return c.json({ refund });
  } catch (error: any) {
    return c.json({ error: `Stripe Error: ${error.message}` }, 500);
  }
});

// serve(app);

export default handle(app);

// {
//   "version": 2,
//   "builds": [{ "src": "src/index.ts", "use": "@vercel/node", "config": { "distDir": "dist" } }],
//   "routes": [{ "src": "/api/(.*)", "dest": "/dist/index.js" }]
// }
