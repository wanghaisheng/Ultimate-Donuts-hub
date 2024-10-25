import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DonutDialogComponent } from '../donut-dialog/donut-dialog.component';
import { DonutActionButtonsComponent } from '../donut-action-buttons/donut-action-buttons.component';
import { Donut } from '../../../../shared/types/donut.model';

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
  @Input() donut!: Donut;
}
