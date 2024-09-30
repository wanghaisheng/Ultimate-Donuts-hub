import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavListComponent } from '../nav-list/nav-list.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    NavListComponent,
  ],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.scss',
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
export class MobileNavComponent {
  isVisible = false;

  toggleMenu() {
    this.isVisible = !this.isVisible;
  }
}
