import { Injectable } from '@angular/core';
import { AuthError, createClient, PostgrestError } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';
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

  protected handleError(
    error: AuthError | PostgrestError | null,
    consoleErrorMessage: string,
    returnValue?: {}
  ) {
    if (error) {
      console.error(consoleErrorMessage, error);
      this.openSnackBar(error.message, 'Close', 'snackbar-error');
      return returnValue;
    }
    return;
  }

  protected openSnackBar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      duration: 3000 * 1,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: panelClass,
    });
  }
}
