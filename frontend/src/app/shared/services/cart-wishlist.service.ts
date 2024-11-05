import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Donut } from '../types/donut.model';
import { AuthService } from './auth.service';

interface CartWishlistType {
  donuts: Donut[];
  isUserExist: boolean;
  user_id: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartWishlistService extends BaseService {
  private data = new BehaviorSubject<CartWishlistType>({
    donuts: [],
    isUserExist: false,
    user_id: '',
    email: '',
  });

  data$ = this.data.asObservable();

  constructor(snackBar: MatSnackBar, private authService: AuthService) {
    super(snackBar);
    this.setCurrentUser();
  }

  async setCurrentUser() {
    await this.authService.getUser();
    this.authService.data$.subscribe((data) => {
      this.data.value.isUserExist = data.isUserExist;
      this.data.value.user_id = data.sessionUser.user_id;
      this.data.value.email = data.sessionUser.email;
      this.readDonuts();
    });
  }

  async createUserDonuts(user_id: string, email: string) {
    const { data, error } = await this.supabase
      .from('user_donuts')
      .insert([{ user_id, email, donuts: [] }]);
    if (error) {
      if (error.code === '23505') {
        this.handleError(error, 'Record already exists for this user.');
      } else {
        this.handleError(error, error.message);
      }
    }
    return { data, error };
  }

  async readDonuts() {
    let donuts;
    if (this.data.value.isUserExist) {
      const { data, error } = await this.supabase
        .from('user_donuts')
        .select('*');
      if (error) this.handleError(error, error.message);
      if (data) donuts = data[0].donuts;
    }
    if (!this.data.value.isUserExist) {
      donuts = JSON.parse(localStorage.getItem('donuts') || '[]');
    }
    await this.saveDonuts(donuts);
    return donuts;
  }

  async saveDonuts(donuts: Donut[]) {
    if (this.data.value.isUserExist) {
      const { data, error } = await this.supabase
        .from('user_donuts')
        .update({
          donuts,
        })
        .eq('user_id', this.data.value.user_id)
        .select('*');
      if (error) this.handleError(error, error.message);
      if (data && data.length) this.updateDonutsStatus(donuts);
    }
    if (!this.data.value.isUserExist) {
      localStorage.setItem('donuts', JSON.stringify(donuts));
      this.updateDonutsStatus(donuts);
    }
  }

  updateDonutsStatus(donuts: Donut[]) {
    this.data.next({
      ...this.data.value,
      donuts,
    });
  }

  async deleteDonut(donut: Donut, target: string) {
    const donuts = await this.readDonuts();
    const updatedDonuts = donuts.filter((d: Donut) => d.id !== donut.id);
    await this.saveDonuts(updatedDonuts);
    this.openSnackBar(
      donut.name + ` has been removed from ${target}!`,
      'Close',
      'snackbar-error'
    );
  }

  async replaceDonut(newDonut: Donut) {
    const donuts = await this.readDonuts();
    const index = donuts.findIndex((d: Donut) => d.id === newDonut.id);
    if (index !== -1)
      return donuts.map((d: Donut) => (d.id == newDonut.id ? newDonut : d));
    else return [...donuts, newDonut];
  }

  async updateWishlist(donut: Donut) {
    const donuts = await this.readDonuts();
    const foundDonut = donuts.find((d: Donut) => d.id == donut.id);
    foundDonut?.isAddedToWishlist
      ? this.deleteDonut(donut, 'wishlist')
      : this.addToWishlist(donut);
  }

  async addToWishlist(donut: Donut) {
    const newDonut = {
      ...donut,
      isAddedToWishlist: true,
      isAddedToCart: false,
    };
    const donuts = await this.readDonuts();
    const updatedDonuts = [...donuts, newDonut];
    await this.saveDonuts(updatedDonuts);
    this.openSnackBar(
      donut.name + ' has been added to wishlist!',
      'Close',
      'snackbar-success'
    );
  }

  async updateCart(donut: Donut) {
    const donuts = await this.readDonuts();
    const foundDonut = donuts.find((d: Donut) => d.id == donut.id);
    foundDonut?.isAddedToCart
      ? this.deleteDonut(donut, 'cart')
      : this.addToCart(donut);
  }

  async addToCart(donut: Donut) {
    const newDonut = {
      ...donut,
      isAddedToCart: true,
      isAddedToWishlist: false,
      quantity: 1,
    };
    const updatedDonuts = await this.replaceDonut(newDonut);
    await this.saveDonuts(updatedDonuts);
    this.openSnackBar(
      donut.name + ' has been added to cart!',
      'Close',
      'snackbar-success'
    );
  }

  async addAllToCart() {
    const donuts = await this.readDonuts();
    const cartDonuts = donuts.filter((donut: Donut) => donut.isAddedToCart);
    const wishlistDonuts = donuts.filter(
      (donut: Donut) => donut.isAddedToWishlist
    );
    const newCartDonuts = wishlistDonuts.map((donut: Donut) => {
      donut.isAddedToCart = true;
      donut.isAddedToWishlist = false;
      donut.quantity = 1;
      return donut;
    });
    const allDonuts = [...cartDonuts, ...newCartDonuts];
    if (this.data.value.isUserExist) {
      const { data, error } = await this.supabase
        .from('user_donuts')
        .update({
          donuts: allDonuts,
        })
        .eq('user_id', this.data.value.user_id)
        .select('*');
      if (data && data.length) {
        this.updateDonutsStatus(allDonuts);
        this.openSnackBar(
          'All donuts have been added to cart!',
          'Close',
          'snackbar-success'
        );
      }
      if (error) this.handleError(error, error.message);
    }
    if (!this.data.value.isUserExist) {
      await this.saveDonuts(allDonuts);
      this.openSnackBar(
        'All donuts have been added to cart!',
        'Close',
        'snackbar-success'
      );
    }
  }

  async updateDonutQuantity(donut: Donut, flag: boolean) {
    const newDonut = { ...donut };
    flag ? (newDonut.quantity += 1) : (newDonut.quantity -= 1);
    if (newDonut.quantity < 1) newDonut.quantity = 1;
    const updatedDonuts = await this.replaceDonut(newDonut);
    await this.saveDonuts(updatedDonuts);
  }
}
