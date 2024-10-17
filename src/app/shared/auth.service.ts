import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(snackBar: MatSnackBar) {
    super(snackBar);
  }

  async signUp(email: string, password: string, name: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    this.handleAuthError(error);
    return { data, error };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    this.handleAuthError(error);
    return { data, error };
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    this.handleAuthError(error);
    return { error };
  }

  async getUser() {
    const {
      data: { session },
      error,
    } = await this.supabase.auth.getSession();
    this.handleAuthError(error);
    return { session, error };
  }
}
