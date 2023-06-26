import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../interfaces/Auth/LoginRequest';
import { LoginResponse } from '../interfaces/Auth/LoginResponse';
import { RegisterRequest } from '../interfaces/Auth/RegisterRequest';
import { RefreshService } from '../services/refresh.service';
import { ToastrService } from 'ngx-toastr';

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
    private refreshService: RefreshService,
    private toastr: ToastrService
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
              this.refreshService.triggerRefresh();
              this.router.navigate(['/']);
              this.toastr.success('Registration successful!');
            },
            error: (response) => {
              this.toastr.error('Registration failed', response.message);
            },
          });
        },
        error: (response) => {
          this.toastr.error('Registration failed', response.message);
        },
      });
    } catch (response) {
      this.toastr.error('Registration failed');
    }
  }
}
