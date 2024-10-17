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
import { SupabaseService } from '../../shared/supabase.service';

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
  sessionUser: { name: string; email: string } = { name: '', email: '' };
  @Input() signUpForm: boolean = true;
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  constructor(private auth: SupabaseService) {
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

  async handleSignUp(form: NgForm) {
    debugger;
    if (form.valid) {
      const { data, error } = await this.auth.signUp(
        this.email.value!,
        form.form.value.password,
        form.form.value.name
      );
      console.log('data: ', data);
      console.log('error: ', error);
    } else {
      form.form.markAllAsTouched();
    }
  }

  async getUser() {
    const { session, error } = await this.auth.getUser();
    //if(session) // session.user.user_metadata.email
    // session.user.user_metadata.name
    this.sessionUser.name = session?.user.user_metadata['name'];
    this.sessionUser.email = session?.user.user_metadata['email'];
    console.log('session: ', session);
    console.log('error: ', error);
  }

  async signOut() {
    const { error } = await this.auth.signOut();
    console.log('error: ', error);
  }

  async handleSignIn(form: NgForm) {
    if (form.valid) {
      const { data, error } = await this.auth.signIn(
        this.email.value!,
        form.form.value.password
      );
      console.log('data: ', data);
      console.log('error: ', error);
    } else {
      form.form.markAllAsTouched();
    }
  }
}
