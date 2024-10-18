import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface DrawerType {
  isMobileDrawer: boolean;
  isCartDrawer: boolean;
  isWishlistDrawer: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private isOpen = new BehaviorSubject<boolean>(false);
  private activeDrawer = new BehaviorSubject<DrawerType>({
    isMobileDrawer: false,
    isCartDrawer: false,
    isWishlistDrawer: false,
  });

  isOpen$ = this.isOpen.asObservable();
  activeDrawer$ = this.activeDrawer.asObservable();

  toggleDrawer() {
    this.isOpen.next(!this.isOpen.value);
    if (this.isOpen.value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeDrawer() {
    this.isOpen.next(false);
    document.body.style.overflow = 'auto';
  }

  setActiveDrawer(activeDrawer: string | null) {
    this.toggleDrawer();
    this.activeDrawer.next({
      isMobileDrawer: activeDrawer == 'MOBILE_DRAWER' ? true : false,
      isCartDrawer: activeDrawer == 'CART_DRAWER' ? true : false,
      isWishlistDrawer: activeDrawer == 'WISHLIST_DRAWER' ? true : false,
    });
  }
}
