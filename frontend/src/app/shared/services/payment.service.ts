import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadStripe } from '@stripe/stripe-js';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Donut } from '../types/donut.model';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CartWishlistService } from './cart-wishlist.service';

interface PaymentType {
  isUserExist: boolean;
  user_id: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseService {
  private data = new BehaviorSubject<PaymentType>({
    isUserExist: false,
    user_id: '',
    email: '',
  });

  data$ = this.data.asObservable();

  constructor(
    private http: HttpClient,
    snackBar: MatSnackBar,
    private authService: AuthService,
    private cartWishlistService: CartWishlistService
  ) {
    super(snackBar);
    this.setCurrentUser();
  }

  async setCurrentUser() {
    await this.authService.getUser();
    this.authService.data$.subscribe(async (data) => {
      this.data.value.isUserExist = data.isUserExist;
      this.data.value.user_id = data.sessionUser.user_id;
      this.data.value.email = data.sessionUser.email;
      if (data.isUserExist) {
        const { data: orders } = await this.getOrders();
        if (orders?.length == 0) {
          this.createOrders(data.sessionUser.user_id, data.sessionUser.email);
        }
      }
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
            this.cartWishlistService.clearCart();
            this.saveNewOrder(data);
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

  async createOrders(user_id: string, email: string) {
    const { data, error } = await this.supabase
      .from('user_orders')
      .insert([{ user_id, email, orders: [] }]);
    if (error) {
      if (error.code === '23505') {
        this.handleError(error, 'Record already exists for this user.');
      } else {
        this.handleError(error, error.message);
      }
    }
    return { data, error };
  }

  async getOrders() {
    if (this.data.value.isUserExist) {
      const { data, error } = await this.supabase
        .from('user_orders')
        .select('*');
      if (error) this.handleError(error, error.message);
      return { data, error };
    }
    return { data: null, error: null };
  }

  async saveNewOrder(data: any) {
    if (this.data.value.isUserExist) {
      const order = {
        amount: data.session.amount_total / 100,
        status: data.session.status,
        session_id: data.session.id,
        payment_intent: data.session.payment_intent,
      };
      await this.saveOrder(order);
    }
  }

  async saveOrder(order: any) {
    const { data: orders } = await this.getOrders();
    const previousOrders = orders
      ? orders[0].orders.filter((o: any) => o.session_id !== order.session_id)
      : [];
    const { data, error } = await this.supabase
      .from('user_orders')
      .update({
        orders: [...previousOrders, order],
      })
      .eq('user_id', this.data.value.user_id)
      .select('*');
    if (error) this.handleError(error, error.message);
    return { data, error };
  }

  async cancelOrder(order: any) {
    this.http
      .post<any>(
        `${environment.SERVER_URL}/api/cancel-order`,
        JSON.stringify({ payment_intent: order.payment_intent })
      )
      .subscribe(async (response) => {
        try {
          if (response) {
            const refundSession = {
              amount: order.amount,
              status:
                response.session.status == 'succeeded'
                  ? 'canceled'
                  : 'complete',
              session_id: order.session_id,
              payment_intent: order.payment_intent,
            };
            const { data, error } = await this.saveOrder(refundSession);
            if (error) this.handleError(error, error.message);
            if (data && data[0].orders.length) {
              this.openSnackBar(
                '✔ Order canceled and refunded successfully!',
                'Close',
                'snackbar-success'
              );
            }
          }
        } catch (error: any) {
          this.openSnackBar(error.message, 'Close', 'snackbar-error');
        }
      });
  }
}
