import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  fail: boolean = false;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        this.fail = false;
        console.log('User logged:', response);
      },
      error => {
        this.fail = true;
        console.error('Logged error:', error);
      }
    );
  }
}
