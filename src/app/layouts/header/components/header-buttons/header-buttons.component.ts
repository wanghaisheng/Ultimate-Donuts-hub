import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-buttons',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './header-buttons.component.html',
  styleUrl: './header-buttons.component.scss',
})
export class HeaderButtonsComponent {
  @Output() toggleMobileMenu = new EventEmitter();

  toggleMenu() {
    this.toggleMobileMenu.emit();
  }
}
