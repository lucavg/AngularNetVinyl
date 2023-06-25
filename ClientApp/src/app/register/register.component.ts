import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../interfaces/Auth/LoginRequest';
import { LoginResponse } from '../interfaces/Auth/LoginResponse';
import { RegisterRequest } from '../interfaces/Auth/RegisterRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  register() {
    if (this.password !== this.confirmPassword) {
      console.log("Passwords don't match");
      return;
    }

    const registerData: RegisterRequest = {
      email: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    try {
      this.authService.register(registerData).subscribe({
        next: () => {
          const loginData: LoginRequest = {
            email: this.email,
            password: this.password,
          };
          this.authService.login(loginData).subscribe({
            next: (response: LoginResponse) => {
              localStorage.setItem('jwt', response.accessToken);
              localStorage.setItem('username', response.username);
              localStorage.setItem('userId', response.userId);
              localStorage.setItem('collectionId', response.collectionId);
              this.cdRef.detectChanges();
              this.router.navigate(['/']);
            },
            error: () => {
              console.log('Login failed');
            },
          });
        },
        error: () => {
          console.log('Registration failed');
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
