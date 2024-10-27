import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface PayloadType {
  pagination?: { page: number; pageSize: number };
  filter?: string;
  search?: { field: string; value: string };
}

@Injectable({
  providedIn: 'root',
})
export class DonutService extends BaseService {
  constructor(snackBar: MatSnackBar) {
    super(snackBar);
  }

  async read(payload: PayloadType) {
    let query = this.supabase.from('donuts').select('*', { count: 'exact' });
    if (payload.pagination) {
      const { page, pageSize } = payload.pagination;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);
    }
    if (payload.filter) {
      query = query.eq(payload.filter, true);
    }
    if (payload.search) {
      const { field, value } = payload.search;
      query = query.ilike(field, `%${value}%`);
    }
    const { data, error, count } = await query;
    this.handleError(error, 'Error fetching donuts:', {
      data: [],
      total: 0,
    });
    return { data, total: count || 0 };
  }
}
