import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  signup(name: string, email: string, password: string) {
    // this.router.navigate(['/']);
    return this.http.post("http://localhost:3000/api/signup", { name, email, password });
  }

  login(email: string, password: string) {
    return this.http.post<{token: string}>("http://localhost:3000/api/login", { email, password })
    .pipe(
      tap(response => {
        // Assuming the response object has a token in the 'token' property
        if (response.token) {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
