import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
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
  isVisible = false;

  toggleDrawer() {
    this.isVisible = !this.isVisible;
  }
}
