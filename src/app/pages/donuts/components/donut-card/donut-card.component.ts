import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DonutDialogComponent } from '../donut-dialog/donut-dialog.component';
import { DonutActionButtonsComponent } from '../donut-action-buttons/donut-action-buttons.component';

@Component({
  selector: 'app-donut-card',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DonutDialogComponent,
    DonutActionButtonsComponent,
  ],
  templateUrl: './donut-card.component.html',
  styleUrl: './donut-card.component.scss',
})
export class DonutCardComponent {
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
