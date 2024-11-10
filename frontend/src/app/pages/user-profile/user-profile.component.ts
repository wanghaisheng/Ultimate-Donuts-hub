import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { PaymentService } from '../../shared/services/payment.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  constructor(
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  async handleSignOut() {
    await this.authService.signOut();
  }

  cancelOrder(order: any) {
    this.paymentService.cancelOrder(order);
  }
}
