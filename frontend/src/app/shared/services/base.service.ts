import { Injectable } from '@angular/core';
import { AuthError, createClient, PostgrestError } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StripeError } from '@stripe/stripe-js';

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
    error: AuthError | PostgrestError | StripeError | null,
    consoleErrorMessage: string,
    returnValue?: {}
  ) {
    if (error) {
      console.error(consoleErrorMessage, error);
      this.openSnackBar(error.message!, 'Close', 'snackbar-error');
      return returnValue;
    }
    return;
  }

  protected openSnackBar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      duration: 3000 * 1,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: panelClass,
    });
  }
}
