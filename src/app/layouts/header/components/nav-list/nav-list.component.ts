import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatListModule, NgIf],
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
}
