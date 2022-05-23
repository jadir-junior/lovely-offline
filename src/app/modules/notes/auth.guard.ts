import { CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { FirebaseAuthService } from '../core/firebase-auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private auth: FirebaseAuthService, private router: Router) {}

  canLoad(): Observable<boolean> {
    if (!this.auth.authenticated) {
      this.router.navigate(['/user']);
      return of(false);
    }
    return of(true);
  }
}
