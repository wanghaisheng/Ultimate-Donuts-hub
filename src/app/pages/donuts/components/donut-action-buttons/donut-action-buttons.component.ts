import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DonutDialogComponent } from '../donut-dialog/donut-dialog.component';

@Component({
  selector: 'app-donut-action-buttons',
  standalone: true,
  imports: [NgIf, MatButtonModule, MatIconModule],
  templateUrl: './donut-action-buttons.component.html',
  styleUrl: './donut-action-buttons.component.scss',
})
export class DonutActionButtonsComponent {
  @Input() donut!: {
    name: string;
    description: string;
    price: number;
    quantity: number;
    isAddedToWishlist: boolean;
    isAddedToCart: boolean;
    image: string;
  };
  readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DonutDialogComponent, {
      data: { donut: this.donut },
      width: '828px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
