import { Injectable } from '@angular/core';
import { AuthError, createClient, PostgrestError } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  constructor(protected snackBar: MatSnackBar) {}

  protected handleAuthError(error: AuthError | PostgrestError | null) {
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
