import { Component } from '@angular/core';
import { DrawerService } from '../../shared/drawer.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cart-wishlist',
  standalone: true,
  imports: [NgIf],
  templateUrl: './cart-wishlist.component.html',
  styleUrl: './cart-wishlist.component.scss',
})
export class CartWishlistComponent {
  isCartDrawer = false;
  isWishlistDrawer = false;

  constructor(private drawerService: DrawerService) {
    this.drawerService.activeDrawer$.subscribe((activeDrawer) => {
      this.isCartDrawer = activeDrawer.isCartDrawer;
      this.isWishlistDrawer = activeDrawer.isWishlistDrawer;
    });
  }
}
