import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Donut, DonutWithDetails } from '../types/donut.model';

interface CartWishlistType {
  donuts: Donut[];
  cartDonuts: Donut[];
  wishlistDonuts: Donut[];
}

@Injectable({
  providedIn: 'root',
})
export class CartWishlistService extends BaseService {
  private data = new BehaviorSubject<CartWishlistType>({
    donuts: [],
    cartDonuts: [],
    wishlistDonuts: [],
  });

  data$ = this.data.asObservable();

  constructor(snackBar: MatSnackBar) {
    super(snackBar);
    this.setWishlist();
  }

  setWishlist(
    wishlistDonuts: Donut[] = JSON.parse(
      localStorage.getItem('wishlistDonuts') || '[]'
    )
  ) {
    if (!this.isUserExist) {
      localStorage.setItem('wishlistDonuts', JSON.stringify(wishlistDonuts));
      this.data.next({
        ...this.data.value,
        wishlistDonuts,
      });
    }
  }

  async addToWishlist(donut: Donut) {
    if (!this.isUserExist) {
      donut.isAddedToWishlist = true;
      donut.isAddedToCart = false;
      const wishlistDonuts = [...this.data.value.wishlistDonuts, donut];
      this.setWishlist(wishlistDonuts);
      this.openSnackBar(
        donut.name + ' has been added to wishlist!',
        'Close',
        'snackbar-success'
      );
    }
  }

  async updateWishlist(donut: Donut) {
    if (this.isUserExist) {
    }
    if (!this.isUserExist) {
      const foundDonut = this.data.value.wishlistDonuts.find(
        (d: { id: number }) => d.id == donut.id
      );
      foundDonut ? this.deleteFromWishlist(donut) : this.addToWishlist(donut);
    }
  }

  async deleteFromWishlist(donut: Donut) {
    if (!this.isUserExist) {
      donut.isAddedToWishlist = false;
      const wishlistDonuts = this.data.value.wishlistDonuts.filter(
        (d: { id: number }) => d.id !== donut.id
      );
      this.setWishlist(wishlistDonuts);
      this.openSnackBar(
        donut.name + ' has been removed from wishlist!',
        'Close',
        'snackbar-error'
      );
    }
  }
}
