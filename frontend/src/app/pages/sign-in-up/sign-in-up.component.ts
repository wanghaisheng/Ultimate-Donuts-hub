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
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CartWishlistService } from '../../shared/services/cart-wishlist.service';

@Component({
  selector: 'app-sign-in-up',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    FormsModule,
    RouterModule,
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

  constructor(
    private authService: AuthService,
    private cartWishlistService: CartWishlistService,
    private router: Router
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    this.signUpForm = this.router.url == '/sign-in' ? false : true;
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

  async handleSignUp(form: NgForm) {
    if (form.valid) {
      const { data } = await this.authService.signUp(
        this.email.value!,
        form.form.value.password,
        form.form.value.name
      );
      if (data.user) {
        const { error } = await this.cartWishlistService.createUserDonuts(
          data.user.id,
          data.user.email!
        );
        if (!error) window.location.replace('/profile');
      }
    } else {
      form.form.markAllAsTouched();
    }
  }

  async handleSignIn(form: NgForm) {
    if (form.valid) {
      await this.authService.signIn(
        this.email.value!,
        form.form.value.password
      );
    } else {
      form.form.markAllAsTouched();
    }
  }
}
