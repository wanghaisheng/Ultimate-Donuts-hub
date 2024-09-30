import { Component, Input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ContainerComponent } from '../../components/container/container.component';
import {
  FormControl,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { merge } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in-up',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ContainerComponent,
  ],
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.scss',
})
export class SignInUpComponent {
  @Input() signUpForm: boolean = true;
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Please enter your email address.');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set(
        'Please enter a valid email address (e.g., user@example.com).”'
      );
    } else {
      this.errorMessage.set('');
    }
  }

  handleSignUp(form: NgForm) {
    if (form.valid) {
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleSignIn(form: NgForm) {
    if (form.valid) {
    } else {
      form.form.markAllAsTouched();
    }
  }
}
