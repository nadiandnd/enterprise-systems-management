import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private authService: AuthService = inject(AuthService);

  canActivate(): boolean {
    if (!this.authService.getToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
