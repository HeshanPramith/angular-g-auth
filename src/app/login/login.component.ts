import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  user$ = this.angularAuth.authState.pipe(map((user) => user));

  constructor(private angularAuth: AngularFireAuth, private router: Router) {}

  onSignIn() {
    this.angularAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
