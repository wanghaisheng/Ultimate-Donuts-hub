import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DonutActionButtonsComponent } from '../donut-action-buttons/donut-action-buttons.component';
import { Donut } from '../../../../shared/types/donut.model';

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
  @Input() donut!: Donut;
}
