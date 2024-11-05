import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { DrawerService } from '../../../../shared/services/drawer.service';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, MatIconModule, MatListModule, NgIf],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss',
})
export class NavListComponent {
  @Input() isDesktop!: boolean;
  list = [
    { label: 'Home', path: '', icon: 'home' },
    { label: 'Donuts', path: '/donuts', icon: 'cookie' },
    { label: 'About', path: '/about', icon: 'bookmark_manager' },
    { label: 'Contact', path: '/contact', icon: 'contact_page' },
  ];

  constructor(private drawerService: DrawerService) {}

  closeDrawer() {
    this.drawerService.closeDrawer();
  }
}
