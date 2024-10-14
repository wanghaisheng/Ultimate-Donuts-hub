import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DonutDialogComponent } from '../donut-dialog/donut-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DonutActionButtonsComponent } from '../donut-action-buttons/donut-action-buttons.component';

@Component({
  selector: 'app-donut-flavoured-card',
  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    DonutActionButtonsComponent,
  ],
  templateUrl: './donut-flavoured-card.component.html',
  styleUrl: './donut-flavoured-card.component.scss',
})
export class DonutFlavouredCardComponent {
  @Input() donut!: {
    name: string;
    description: string;
    price: number;
    quantity: number;
    isAddedToWishlist: boolean;
    isAddedToCart: boolean;
    image: string;
  };
}
