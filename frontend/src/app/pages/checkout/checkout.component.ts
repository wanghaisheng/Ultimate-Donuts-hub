import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  stripe: any;
  items = [
    { id: 'donut1', name: 'Chocolate Donut', price: 250 }, // price in cents
    { id: 'donut2', name: 'Sprinkle Donut', price: 200 }, // price in cents
  ];

  constructor() {
    this.stripe = loadStripe(environment.STRIPE_PUBLISHABLE_KEY);
  }

  async checkout() {
    debugger;
    // const sessionData = {
    //   line_items: this.items.map((item) => ({
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: item.name,
    //       },
    //       unit_amount: item.price, // Price in cents
    //     },
    //     quantity: 1,
    //   })),
    //   mode: 'payment',
    //   success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${window.location.origin}/cancel`,
    // };

    const sessionData = {
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Chocolate Donut',
            },
            unit_amount: 250, // Price in cents
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Sprinkle Donut',
            },
            unit_amount: 200, // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}/cancel`,
    };

    // Create a checkout session
    const response = await fetch(
      'https://api.stripe.com/v1/checkout/sessions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${environment.STRIPE_SECRET_KEY}`, // Use your secret key here
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          line_items: JSON.stringify(sessionData.line_items),
          mode: sessionData.mode,
          success_url: sessionData.success_url,
          cancel_url: sessionData.cancel_url,
        }).toString(),
      }
    );

    const session = await response.json();

    if (session.id) {
      const { error } = await this.stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Session creation failed:', session);
    }
  }
}
