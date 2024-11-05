import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from './base.service';
import { BehaviorSubject } from 'rxjs';

interface AuthType {
  isUserExist: boolean;
  sessionUser: {
    user_id: string;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private data = new BehaviorSubject<AuthType>({
    isUserExist: false,
    sessionUser: {
      user_id: '',
      name: '',
      email: '',
    },
  });

  data$ = this.data.asObservable();

  constructor(snackBar: MatSnackBar) {
    super(snackBar);
    this.getUser();
  }

  async getUser() {
    const {
      data: { session },
      error,
    } = await this.supabase.auth.getSession();
    this.data.next({
      isUserExist: session ? true : false,
      sessionUser: {
        user_id: session?.user.id!,
        name: session?.user.user_metadata['name'],
        email: session?.user.user_metadata['email'],
      },
    });
    this.handleError(error, 'Error getting user', { session });
    return { session, error };
  }

  async signUp(email: string, password: string, name: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    this.handleError(error, 'Error signing up the user!');
    return { data, error };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.session) window.location.replace('/profile');
    this.handleError(error, 'Error signing in the user!');
    return { data, error };
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (!error) window.location.replace('/');
    this.handleError(error, 'Error signing out the user!');
    return { error };
  }
}
