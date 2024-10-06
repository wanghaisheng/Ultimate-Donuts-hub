import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DrawerService } from '../../../../shared/drawer.service';

@Component({
  selector: 'app-header-buttons',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './header-buttons.component.html',
  styleUrl: './header-buttons.component.scss',
})
export class HeaderButtonsComponent {
  constructor(private drawerService: DrawerService) {}

  toggleDrawer(activeDrawer: string) {
    this.drawerService.setActiveDrawer(activeDrawer);
  }
}
