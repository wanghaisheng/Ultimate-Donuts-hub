import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DonutDialogComponent } from '../donut-dialog/donut-dialog.component';
import { CartWishlistService } from '../../../../shared/services/cart-wishlist.service';
import { Donut } from '../../../../shared/types/donut.model';

@Component({
  selector: 'app-donut-action-buttons',
  standalone: true,
  imports: [NgIf, MatButtonModule, MatIconModule],
  templateUrl: './donut-action-buttons.component.html',
  styleUrl: './donut-action-buttons.component.scss',
})
export class DonutActionButtonsComponent implements OnInit {
  @Input() donut!: Donut;
  readonly dialog = inject(MatDialog);

  constructor(private cartWishlistService: CartWishlistService) {}

  ngOnInit(): void {
    this.updateCardState();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DonutDialogComponent, {
      data: { donut: this.donut, successPayment: undefined },
      width: '828px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  updateCardState() {
    this.cartWishlistService.data$.subscribe((value) => {
      const donut = value.donuts.find((d) => d.id == this.donut.id);
      this.donut.isAddedToWishlist = donut!?.isAddedToWishlist;
      this.donut.isAddedToCart = donut!?.isAddedToCart;
    });
  }

  async updateWishlist(donut: Donut) {
    await this.cartWishlistService.updateWishlist(donut);
  }

  async updateCart(donut: Donut) {
    await this.cartWishlistService.updateCart(donut);
  }
}
