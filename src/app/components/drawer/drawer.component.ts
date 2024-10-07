import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DrawerService } from '../../shared/drawer.service';
import { NgIf } from '@angular/common';
import { NavListComponent } from '../../layouts/header/components/nav-list/nav-list.component';
import { CartWishlistComponent } from '../cart/cart-wishlist.component';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatIconModule,
    NavListComponent,
    CartWishlistComponent,
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  animations: [
    trigger('drawerState', [
      state(
        'open',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class DrawerComponent {
  isOpen!: boolean;
  isMobileDrawer!: boolean;
  isCartDrawer!: boolean;
  isWishlistDrawer!: boolean;

  constructor(private drawerService: DrawerService) {
    this.drawerService.isOpen$.subscribe((value) => {
      this.isOpen = value;
    });
    this.drawerService.activeDrawer$.subscribe((activeDrawer) => {
      this.isCartDrawer = activeDrawer.isCartDrawer;
      this.isWishlistDrawer = activeDrawer.isWishlistDrawer;
      this.isMobileDrawer = activeDrawer.isMobileDrawer;
    });
  }

  toggleDrawer() {
    this.drawerService.toggleDrawer();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    const width = (event.target as Window).innerWidth;
    if (this.isMobileDrawer && width >= 1024) {
      this.drawerService.setActiveDrawer(null);
      this.drawerService.closeDrawer();
    }
  }
}
