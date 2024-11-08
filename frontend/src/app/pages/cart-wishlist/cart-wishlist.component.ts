import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { TableComponent } from './components/table/table.component';
import { Router } from '@angular/router';
import { CartWishlistService } from '../../shared/services/cart-wishlist.service';
import { Donut } from '../../shared/types/donut.model';
import { PaymentService } from '../../shared/services/payment.service';

@Component({
  selector: 'app-cart-wishlist',
  standalone: true,
  imports: [ContainerComponent, TableComponent],
  templateUrl: './cart-wishlist.component.html',
  styleUrl: './cart-wishlist.component.scss',
})
export class CartWishlistComponent implements OnInit {
  isCart = false;
  isWishlist = false;
  wishlistDonuts: Donut[] = [];
  cartDonuts: Donut[] = [];

  constructor(
    private router: Router,
    private cartWishlistService: CartWishlistService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.isCart = this.router.url == '/shopping-cart' ? true : false;
    this.isWishlist = this.router.url == '/wishlist' ? true : false;
    this.getDonuts();
  }

  getDonuts() {
    this.cartWishlistService.data$.subscribe((value) => {
      this.wishlistDonuts = value.donuts.filter(
        (donut) => donut.isAddedToWishlist
      );
      this.cartDonuts = value.donuts.filter((donut) => donut.isAddedToCart);
    });
  }

  createCheckoutSession() {
    this.paymentService.createCheckoutSession(this.cartDonuts);
  }
}
