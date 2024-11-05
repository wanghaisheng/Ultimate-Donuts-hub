import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartWishlistService } from '../../../../shared/services/cart-wishlist.service';
import { Donut } from '../../../../shared/types/donut.model';

@Component({
  selector: 'app-drawer-card',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  templateUrl: './drawer-card.component.html',
  styleUrl: './drawer-card.component.scss',
})
export class DrawerCardComponent {
  @Input() donut!: Donut;

  constructor(private cartWishlistService: CartWishlistService) {}

  async updateWishlist(donut: Donut) {
    await this.cartWishlistService.updateWishlist(donut);
  }

  async updateCart(donut: Donut) {
    await this.cartWishlistService.updateCart(donut);
  }

  async updateDonutQuantity(donut: Donut, flag: boolean) {
    await this.cartWishlistService.updateDonutQuantity(donut, flag);
  }
}
