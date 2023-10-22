import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private inactivityTimeout: any;

  constructor(private router: Router, private angularAuth: AngularFireAuth) {}

  canActivate(): Observable<boolean> {
    return this.angularAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          if (this.inactivityTimeout) {
            clearTimeout(this.inactivityTimeout);
          }

          this.inactivityTimeout = setTimeout(() => {
            this.angularAuth.signOut().then(() => {
              this.router.navigate(['/login']);
            });
          }, 40000);

          return [true];
        } else {
          this.router.navigate(['/login']);
          return [false];
        }
      }),
      take(1)
    );
  }
}
