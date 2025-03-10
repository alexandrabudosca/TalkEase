import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  fail: boolean = false;

  constructor(private authService: AuthService) {}

  signup() {
    this.authService.signup(this.name, this.email, this.password).subscribe(
      response => {
        console.log('User created:', response);
        this.fail = false;
        this.authService.login(this.email, this.password).subscribe(
          response => {
            console.log('User logged:', response);
          },
          error => {
            console.error('Logged error:', error);
          }
        );
      },
      error => {
        this.fail = true;
        console.error('Signup error:', error);
      }
    );
  }
}
