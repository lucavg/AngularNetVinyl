import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoginRequest } from '../interfaces/Auth/LoginRequest';
import jwt_decode from 'jwt-decode';
import { LoginResponse } from '../interfaces/Auth/LoginResponse';
import { RegisterRequest } from '../interfaces/Auth/RegisterRequest';
import { RegisterResponse } from '../interfaces/Auth/RegisterResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.isAuthenticated = this.checkTokenValidity();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  cleanStorage(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('collectionId');
  }

  getUsername(): string {
    return localStorage.getItem('username')!;
  }

  register(registerData: RegisterRequest): Observable<RegisterResponse> {
    this.cleanStorage();
    return this.registerAsync(registerData).pipe(
      switchMap((response: RegisterResponse) => {
        return of(response);
      })
    );
  }

  registerAsync(registerData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      this.baseUrl + 'api/v1/authenticate/register',
      JSON.stringify(registerData),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    this.cleanStorage();
    return this.loginAsync(loginData).pipe(
      switchMap((response: LoginResponse) => {
        return of(response);
      })
    );
  }

  loginAsync(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.baseUrl + 'api/v1/authenticate/login',
      JSON.stringify(loginData),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  logout() {
    this.cleanStorage();
    this.isAuthenticated = false;
  }

  private checkTokenValidity(): boolean {
    const token = localStorage.getItem('jwt');

    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        const expirationDate = new Date(decodedToken.exp * 1000);
        const currentDate = new Date();
        if (expirationDate > currentDate) {
          return true;
        }
      } catch (error) {
        console.log('Invalid token:', error);
      }
    }

    return false;
  }
}
