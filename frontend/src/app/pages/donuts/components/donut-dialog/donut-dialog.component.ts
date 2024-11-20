import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { DonutFullCardComponent } from '../donut-full-card/donut-full-card.component';
import { Donut } from '../../../../shared/types/donut.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { fadeInUp } from '../../../../shared/animations/animations';

interface DialogData {
  donut: Donut;
  paymentSessionDetails: any;
  successPayment: boolean;
}

@Component({
  selector: 'app-donut-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    DonutFullCardComponent,
    MatDialogActions,
    MatButtonModule,
  ],
  templateUrl: './donut-dialog.component.html',
  styleUrl: './donut-dialog.component.scss',
  animations: [fadeInUp],
})
export class DonutDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DonutDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly donut = model(this.data.donut);
  readonly paymentSessionDetails = model(this.data.paymentSessionDetails);
  readonly successPayment = model(this.data.successPayment);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
