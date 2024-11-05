import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    this.authService.data$.subscribe((data) => {
      if (!data.isUserExist) {
        this.router.navigate(['/sign-in']);
      }
      return false;
    });
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class SignInUpGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    this.authService.data$.subscribe((data) => {
      if (data.isUserExist) {
        this.router.navigate(['/profile']);
      }
      return false;
    });
    return true;
  }
}
