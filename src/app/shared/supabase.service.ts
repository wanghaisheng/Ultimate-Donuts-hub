import { Injectable } from '@angular/core';
import { AuthError, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  constructor(private snackBar: MatSnackBar) {}

  async signUp(email: string, password: string, name: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    return { data, error: this.handleAuthError(error) };
  }

  async getUser() {
    const {
      data: { session },
      error,
    } = await this.supabase.auth.getSession();
    return { session, error: this.handleAuthError(error) };
  }

  private handleAuthError(error: AuthError | null) {
    if (error) {
      this.openSnackBar(error.message, 'Close', 'snackbar-error');
      return error.message;
    }
    return null;
  }

  private openSnackBar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      duration: 3000 * 1,
      verticalPosition: 'top',
      panelClass: panelClass,
    });
  }
}
