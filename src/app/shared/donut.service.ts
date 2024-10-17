import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class DonutService extends BaseService {
  constructor(snackBar: MatSnackBar) {
    super(snackBar);
  }

  async read() {
    const { data, error } = await this.supabase.from('donuts').select('*');
    this.handleAuthError(error);
    return { data, error };
  }
}
