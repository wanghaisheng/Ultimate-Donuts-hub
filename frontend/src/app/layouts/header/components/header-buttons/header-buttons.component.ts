import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DrawerService } from '../../../../shared/services/drawer.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header-buttons',
  standalone: true,
  imports: [NgIf, MatButtonModule, MatIconModule],
  templateUrl: './header-buttons.component.html',
  styleUrl: './header-buttons.component.scss',
})
export class HeaderButtonsComponent implements OnInit {
  isUserExist!: boolean;
  sessionUser!: { name: string; email: string };

  constructor(
    private drawerService: DrawerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.data$.subscribe((data) => {
      this.isUserExist = data.isUserExist;
      this.sessionUser = data.sessionUser;
    });
  }

  toggleDrawer(activeDrawer: string) {
    this.drawerService.setActiveDrawer(activeDrawer);
  }

  goToPage(page: string) {
    this.router.navigate([page]);
  }
}
