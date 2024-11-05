import { Component } from '@angular/core';
import { DrawerService } from '../../shared/services/drawer.service';
import { NgFor, NgIf } from '@angular/common';
import { DrawerCardComponent } from './components/drawer-card/drawer-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { Router, RouterModule } from '@angular/router';
import { CartWishlistService } from '../../shared/services/cart-wishlist.service';
import { Donut } from '../../shared/types/donut.model';

@Component({
  selector: 'app-cart-wishlist',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatBadgeModule,
    DrawerCardComponent,
  ],
  templateUrl: './cart-wishlist.component.html',
  styleUrl: './cart-wishlist.component.scss',
})
export class CartWishlistComponent {
  isCartDrawer = false;
  isWishlistDrawer = false;
  cartDonuts: Donut[] = [];
  wishlistDonuts: Donut[] = [];

  constructor(
    private drawerService: DrawerService,
    private cartWishlistService: CartWishlistService,
    private router: Router
  ) {
    this.drawerService.activeDrawer$.subscribe((activeDrawer) => {
      this.isCartDrawer = activeDrawer.isCartDrawer;
      this.isWishlistDrawer = activeDrawer.isWishlistDrawer;
    });
    this.cartWishlistService.data$.subscribe((value) => {
      this.wishlistDonuts = value.donuts.filter(
        (donut) => donut.isAddedToWishlist
      );
      this.cartDonuts = value.donuts.filter((donut) => donut.isAddedToCart);
    });
  }

  calculateCartTotal() {
    return this.cartDonuts.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  navigateToPage(page: string) {
    this.router.navigate([page]);
    this.drawerService.toggleDrawer();
  }

  async addAllToCart() {
    await this.cartWishlistService.addAllToCart();
  }
}
