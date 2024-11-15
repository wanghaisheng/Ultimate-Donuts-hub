import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SmoothScrollService } from './smooth-scroll.service';

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

  constructor(private smoothScrollService: SmoothScrollService) {}

  toggleDrawer() {
    this.isOpen.next(!this.isOpen.value);
    if (this.isOpen.value) {
      this.smoothScrollService.destroyScroll(true);
    } else {
      this.smoothScrollService.destroyScroll(false);
    }
  }

  closeDrawer() {
    this.isOpen.next(false);
    this.smoothScrollService.destroyScroll(false);
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
