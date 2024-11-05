import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DonutFullCardComponent } from '../donut-full-card/donut-full-card.component';
import { Donut } from '../../../../shared/types/donut.model';

interface DialogData {
  donut: Donut;
}

@Component({
  selector: 'app-donut-dialog',
  standalone: true,
  imports: [DonutFullCardComponent],
  templateUrl: './donut-dialog.component.html',
  styleUrl: './donut-dialog.component.scss',
})
export class DonutDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DonutDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly donut = model(this.data.donut);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
