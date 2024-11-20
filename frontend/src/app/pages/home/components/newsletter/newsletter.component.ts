import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContainerComponent } from '../../../../components/container/container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';
import { fadeInUp } from '../../../../shared/animations/animations';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ContainerComponent,
    InViewDirective,
  ],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
  animations: [fadeInUp],
})
export class NewsletterComponent {
  @ViewChild('emailInput') emailInputRef!: ElementRef;
  inView = false;
  hasAnimated = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    protected snackBar: MatSnackBar
  ) {}

  subscribe() {
    const email = this.emailInputRef.nativeElement.value;
    const options: MatSnackBarConfig<any> = {
      duration: 3000 * 1,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: 'snackbar-success',
    };

    if (email.length) {
      email.trim().includes('@')
        ? this.snackBar.open('✔ You successfully subscribed!', 'Close', options)
        : this.snackBar.open('✘ Enter a valid email!', 'Close', {
            ...options,
            panelClass: 'snackbar-error',
          });
    }

    this.emailInputRef.nativeElement.value = '';
  }

  onElementVisible(): void {
    if (!this.hasAnimated) {
      this.inView = true;
      this.hasAnimated = true;
      this.cdRef.detectChanges();
    }
  }
}
