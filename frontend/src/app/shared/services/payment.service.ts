import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

interface PaymentType {
  user_id: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseService {
  stripe!: Stripe;
  card!: StripeCardElement;
  publishable_key =
    'pk_test_51OuNP1HHOG9PFvc89Di0uxA7jPpQHqPP9MwbUTaDzYHMVG4i57JKA1CscGK5KHD30XMKuuNydchN6c6hHyBo08f300pAh9UgTu';
  secret_key =
    'sk_test_51OuNP1HHOG9PFvc8Kpmelc5HyvX4J9YxkTEGaFZCqqiLjaDHCz3bF2Kmu6dZrAsJTSEve8BhX4iVDCJR7hC3IsFQ00GpcBvvqQ';
  test_cards = '4242424242424242';

  private data = new BehaviorSubject<PaymentType>({
    user_id: '',
    email: '',
  });

  data$ = this.data.asObservable();

  constructor(snackBar: MatSnackBar, private authService: AuthService) {
    super(snackBar);
    this.setCurrentUser();
  }

  async setCurrentUser() {
    this.stripe = (await loadStripe(this.publishable_key))!; // Your Stripe publishable key
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');

    await this.authService.getUser();
    this.authService.data$.subscribe((data) => {
      this.data.value.user_id = data.sessionUser.user_id;
      this.data.value.email = data.sessionUser.email;
      // this.readDonuts();
    });
  }

  async createPayment() {
    debugger;
    // const paymentData = {
    //   user_id: 'user-id', // Retrieve the logged-in user's ID
    //   amount: 5000, // Amount in cents, e.g., $50.00
    //   currency: 'usd',
    //   status: 'succeeded',
    //   payment_method_id: paymentMethod.id,
    //   created_at: new Date().toISOString(),
    // };
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
    });
    if (error) this.handleError(error, error.message!);

    // Prepare payment data
    const paymentData = {
      user_id: 'user-id', // Retrieve the logged-in user's ID
      amount: 5000, // Amount in cents, e.g., $50.00
      currency: 'usd',
      status: 'succeeded',
      payment_method_id: paymentMethod?.id,
      created_at: new Date().toISOString(),
    };

    try {
      const data = await this.insertPayment(paymentData);
      if (data)
        this.openSnackBar('Payment successful!', 'Close', 'snackbar-success');
    } catch (insertError) {
      this.handleError(null, 'Error saving payment info.');
    }
  }

  async insertPayment(payment: any) {
    const { data, error } = await this.supabase
      .from('payments')
      .insert([payment]);
    if (error) this.handleError(error, error.message);
    return { data };
  }
}
