import { Component, HostListener } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ContainerComponent } from '../../components/container/container.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavListComponent } from './components/nav-list/nav-list.component';
import { HeaderButtonsComponent } from './components/header-buttons/header-buttons.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    ContainerComponent,
    LogoComponent,
    NavListComponent,
    HeaderButtonsComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  scroll = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    this.scroll = window.scrollY > 550 ? true : false;
  }
}
