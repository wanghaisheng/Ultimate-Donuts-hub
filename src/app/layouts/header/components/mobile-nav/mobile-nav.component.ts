import { Component, ViewChild } from '@angular/core';
import { NavListComponent } from '../nav-list/nav-list.component';
import { DrawerComponent } from '../../../../components/drawer/drawer.component';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [NavListComponent, DrawerComponent],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.scss',
})
export class MobileNavComponent {
  @ViewChild(DrawerComponent) drawerComponent!: DrawerComponent;

  toggleMenu() {
    this.drawerComponent.toggleDrawer();
  }
}
