import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/auth/login']);
        }

        return !!user;
      })
    );
  }
}
