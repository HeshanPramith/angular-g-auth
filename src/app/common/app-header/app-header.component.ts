import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.sass']
})
export class AppHeaderComponent {
  user$ = this.angularAuth.authState.pipe(map((user) => user));

  constructor(private angularAuth: AngularFireAuth, private router: Router) {}

  onSignOut() {
    this.angularAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
