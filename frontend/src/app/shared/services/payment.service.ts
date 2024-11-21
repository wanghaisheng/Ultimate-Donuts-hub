import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadStripe } from '@stripe/stripe-js';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Donut } from '../types/donut.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartWishlistService } from './cart-wishlist.service';

interface PaymentType {
  isUserExist: boolean;
  user_id: string;
  email: string;
  userOrders: any[];
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseService {
  private data = new BehaviorSubject<PaymentType>({
    isUserExist: false,
    user_id: '',
    email: '',
    userOrders: [],
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
    this.authService.data$.subscribe(async (data) => {
      this.data.next({
        ...this.data.value,
        isUserExist: data.isUserExist,
        user_id: data.sessionUser.user_id,
        email: data.sessionUser.email,
      });
      this.getOrders();
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
        .select('*')
        .eq('user_id', this.data.value.user_id);
      if (error) this.handleError(error, error.message);
      if (data?.length) {
        this.data.next({ ...this.data.value, userOrders: data[0].orders });
      } else {
        this.createOrders(this.data.value.user_id, this.data.value.email);
      }
      return { data, error };
    }
    return { data: null, error: null };
  }

  async saveNewOrder(data: any) {
    if (this.data.value.isUserExist) {
      const order = {
        amount: data.session.amount_total / 100,
        status: data.session.status + 'd',
        session_id: data.session.id,
        payment_intent: data.session.payment_intent,
        created: data.session.created,
        expires_at: data.session.expires_at,
      };
      await this.saveOrder(order);
    }
  }

  async saveOrder(order: any) {
    const { data: ordersData } = await this.getOrders();
    const orders = ordersData ? ordersData[0].orders : [];
    const orderIndex = orders.findIndex(
      (o: any) => o.session_id === order.session_id
    );
    if (orderIndex !== -1) {
      orders[orderIndex] = order;
    } else {
      orders.push(order);
    }
    const { data, error } = await this.supabase
      .from('user_orders')
      .update({
        orders,
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
                response.refund.status == 'succeeded'
                  ? 'canceled'
                  : 'completed',
              session_id: order.session_id,
              payment_intent: order.payment_intent,
              created: order.created,
              canceledAt: response.refund.created,
            };
            const { data, error } = await this.saveOrder(refundSession);
            if (error) this.handleError(error, error.message);
            if (data && data[0].orders.length) {
              this.data.next({
                ...this.data.value,
                userOrders: data[0].orders,
              });
              this.openSnackBar(
                '✔ Order canceled and refunded successfully!',
                'Close',
                'snackbar-error'
              );
            }
          }
        } catch (error: any) {
          this.openSnackBar(error.message, 'Close', 'snackbar-error');
        }
      });
  }
}
