import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Donut } from '../types/donut.model';

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
    this.setCart();
  }

  setCart(
    cartDonuts: Donut[] = JSON.parse(localStorage.getItem('cartDonuts') || '[]')
  ) {
    if (!this.isUserExist) {
      localStorage.setItem('cartDonuts', JSON.stringify(cartDonuts));
      this.data.next({
        ...this.data.value,
        cartDonuts,
      });
    }
  }

  async updateCart(donut: Donut) {
    if (!this.isUserExist) {
      const foundDonut = this.data.value.cartDonuts.find(
        (d: { id: number }) => d.id == donut.id
      );
      foundDonut ? this.deleteFromCart(donut) : this.addToCart(donut);
    }
  }

  async addToCart(donut: Donut) {
    if (!this.isUserExist) {
      this.deleteFromWishlist(donut);
      donut.isAddedToCart = true;
      donut.quantity = 1;
      const cartDonuts = [...this.data.value.cartDonuts, donut];
      this.setCart(cartDonuts);
      this.openSnackBar(
        donut.name + ' has been added to cart!',
        'Close',
        'snackbar-success'
      );
    }
  }

  async deleteFromCart(donut: Donut) {
    if (!this.isUserExist) {
      this.deleteFromWishlist(donut);
      donut.isAddedToCart = false;
      const cartDonuts = this.data.value.cartDonuts.filter(
        (d: { id: number }) => d.id !== donut.id
      );
      this.setCart(cartDonuts);
      this.openSnackBar(
        donut.name + ' has been removed from cart!',
        'Close',
        'snackbar-error'
      );
    }
  }

  async updateDonutQuantity(donut: Donut, flag: boolean) {
    if (!this.isUserExist) {
      flag ? (donut.quantity += 1) : (donut.quantity -= 1);
      if (donut.quantity < 1) donut.quantity = 1;
      const cartDonuts = this.data.value.cartDonuts.map((d) =>
        d.id == donut.id ? donut : d
      );
      this.setCart(cartDonuts);
    }
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

  async updateWishlist(donut: Donut) {
    if (!this.isUserExist) {
      const foundDonut = this.data.value.wishlistDonuts.find(
        (d: { id: number }) => d.id == donut.id
      );
      foundDonut ? this.deleteFromWishlist(donut) : this.addToWishlist(donut);
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

  async deleteFromWishlist(donut: Donut) {
    if (!this.isUserExist) {
      donut.isAddedToWishlist = false;
      donut.isAddedToCart = false;
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
