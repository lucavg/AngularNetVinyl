import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../interfaces/Auth/LoginRequest';
import { LoginResponse } from '../interfaces/Auth/LoginResponse';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

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
          localStorage.setItem('collectionId', response.collectionId);
          this.cdRef.detectChanges();
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
