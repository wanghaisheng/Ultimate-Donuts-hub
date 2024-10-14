import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-donut-full-card',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './donut-full-card.component.html',
  styleUrl: './donut-full-card.component.scss',
})
export class DonutFullCardComponent {
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
