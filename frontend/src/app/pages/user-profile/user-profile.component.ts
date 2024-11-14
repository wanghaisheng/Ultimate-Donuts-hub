import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { PaymentService } from '../../shared/services/payment.service';
import { ContainerComponent } from '../../components/container/container.component';
import { TableComponent } from './components/table/table.component';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgIf, MatProgressSpinner, ContainerComponent, TableComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  orders: any[] = [];
  user: any;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.paymentService.data$.subscribe((value) => {
      this.orders = value.userOrders;
      this.user = value.email;
      this.isLoading = false;
    });
  }

  async cancelOrder(order: any) {
    await this.paymentService.cancelOrder(order);
  }

  async handleSignOut() {
    await this.authService.signOut();
  }
}
