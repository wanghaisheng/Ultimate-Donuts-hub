import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ContainerComponent } from '../container/container.component';
import { LogoComponent } from './components/logo/logo.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { NavListComponent } from "./components/nav-list/nav-list.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ContainerComponent,
    LogoComponent,
    MobileNavComponent,
    NavListComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild(MobileNavComponent) mobileNavComponent!: MobileNavComponent;

  toggleMobileNavMenu() {
    this.mobileNavComponent.toggleMenu();
  }
}
