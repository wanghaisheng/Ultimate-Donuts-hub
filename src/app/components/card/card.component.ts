import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartWishlistService } from '../../shared/services/cart-wishlist.service';
import { Donut, DonutWithDetails } from '../../shared/types/donut.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, MatCardModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  fullCard!: boolean;
  @Input() showHeader!: boolean;
  @Input() showFooter!: boolean;
  @Input() donut!: DonutWithDetails;

  constructor(
    private cartWishlistService: CartWishlistService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fullCard = this.showHeader && this.showFooter;
    this.updateCardState();
  }

  updateCardState() {
    this.cartWishlistService.data$.subscribe((value) => {
      const foundInWishlist = value.wishlistDonuts.find(
        (d: { id: number }) => d.id == this.donut.id
      );
      this.donut.isAddedToWishlist = foundInWishlist ? true : false;
      const foundInCart = value.cartDonuts.find(
        (d: { id: number }) => d.id == this.donut.id
      );
      this.donut.isAddedToCart = foundInCart ? true : false;
      this.cdr.detectChanges();
    });
  }

  async updateWishlist(donut: Donut | any) {
    await this.cartWishlistService.updateWishlist(donut);
  }

  async updateCart(donut: Donut | any) {
    await this.cartWishlistService.updateCart(donut);
  }
}
