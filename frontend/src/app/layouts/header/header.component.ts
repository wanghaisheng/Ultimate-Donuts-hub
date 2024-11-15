import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ContainerComponent } from '../../components/container/container.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavListComponent } from './components/nav-list/nav-list.component';
import { HeaderButtonsComponent } from './components/header-buttons/header-buttons.component';
import { SmoothScrollService } from '../../shared/services/smooth-scroll.service';
import { NavigationEnd, Router } from '@angular/router';

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
export class HeaderComponent implements OnInit {
  scroll = false;

  constructor(
    private router: Router,
    private smoothScrollService: SmoothScrollService
  ) {}

  ngOnInit() {
    this.smoothScrollService.data$.subscribe((data) => {
      this.scroll = data.isScrollDown;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.smoothScrollService.scrollToTop();
      }
    });
  }
}
