import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.scss',
})
export class MobileNavComponent {
  isVisible = false;
  list = [
    { label: 'Home', icon: 'home' },
    { label: 'Donuts', icon: 'cookie' },
    { label: 'About', icon: 'bookmark_manager' },
    { label: 'Contact', icon: 'contact_page' },
  ];

  toggleMenu() {
    debugger;
    this.isVisible = !this.isVisible;
  }
}
