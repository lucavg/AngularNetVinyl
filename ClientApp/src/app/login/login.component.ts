import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../interfaces/Auth/LoginRequest';
import { LoginResponse } from '../interfaces/Auth/LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    const loginData: LoginRequest = {
      email: this.email,
      password: this.password,
    };

    try {
      this.authService.login(loginData).subscribe({
        next: (response: LoginResponse) => {
          localStorage.setItem('jwt', response.accessToken);
          localStorage.setItem('username', response.username);
          localStorage.setItem('userId', response.userId);
          this.router.navigate(['/']);
        },
        error: (response) => {
          console.log('Login failed: ' + response.message);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
