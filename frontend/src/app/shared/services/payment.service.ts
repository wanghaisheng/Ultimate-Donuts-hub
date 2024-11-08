import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadStripe } from '@stripe/stripe-js';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Donut } from '../types/donut.model';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

interface PaymentType {
  isUserExist: boolean;
  user_id: string;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseService {
  private data = new BehaviorSubject<PaymentType>({
    isUserExist: false,
    user_id: '',
    email: '',
    name: '',
  });

  data$ = this.data.asObservable();

  constructor(
    private http: HttpClient,
    snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    super(snackBar);
    this.setCurrentUser();
  }

  async setCurrentUser() {
    await this.authService.getUser();
    this.authService.data$.subscribe((data) => {
      this.data.value.isUserExist = data.isUserExist;
      this.data.value.email = data.sessionUser.email;
    });
  }

  async createCheckoutSession(cartDonuts: Donut[]) {
    const lineItems = cartDonuts.map((donut: Donut) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: donut.name,
          images: [donut.image],
        },
        unit_amount: donut.price * 100,
      },
      quantity: donut.quantity,
    }));
    this.http
      .post<any>(
        `${environment.SERVER_URL}/api/checkout`,
        JSON.stringify({
          lineItems,
          user: this.data.value.isUserExist
            ? { email: this.data.value.email }
            : undefined,
        })
      )
      .subscribe(async (response) => {
        try {
          if (response) {
            const stripe = await loadStripe(environment.STRIPE_PUBLISHABLE_KEY);
            stripe?.redirectToCheckout({ sessionId: response.session.id });
          }
        } catch (error: any) {
          this.openSnackBar(error.message, 'Close', 'snackbar-error');
        }
      });
  }

  getSessionDetails(sessionId: string): Observable<any> {
    return this.http
      .get(`${environment.SERVER_URL}/api/get-stripe-session/${sessionId}`)
      .pipe(
        map((data: any) => {
          if (data.session.status == 'complete') {
            return {
              customer: data.session.customer_details.email,
              amountReceived: data.session.amount_total / 100,
              transactionId: data.session.id,
            };
          }
          return null;
        }),
        catchError((error) => {
          console.error('Error fetching session details', error);
          this.openSnackBar(
            'There was an error getting payment details.',
            'Close',
            'snackbar-error'
          );
          return of(null);
        })
      );
  }

  async createPayment() {
    debugger;

    // const { paymentMethod, error } = await this.stripe.createPaymentMethod({
    //   type: 'card',
    //   card: this.card,
    // });
    // if (error) this.handleError(error, error.message!);

    // try {
    //   //const data = await this.insertPayment(paymentData);
    //   if (data)
    //     this.openSnackBar('Payment successful!', 'Close', 'snackbar-success');
    // } catch (insertError) {
    //   this.handleError(null, 'Error saving payment info.');
    // }
  }

  // async insertPayment(payment: any) {
  //   const { data, error } = await this.supabase
  //     .from('payments')
  //     .insert([payment]);
  //   if (error) this.handleError(error, error.message);
  //   return { data };
  // }
}
