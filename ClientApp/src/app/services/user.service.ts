import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'userId';

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  getUser(): Observable<User[]> {
    var userId = localStorage.getItem(this.localStorageKey)!;
    return this.getUserAsync(userId).pipe(
      switchMap((response) => {
        console.log(response);
        return of(response);
      })
    );
  }

  getUserAsync(id: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseUrl + 'api/v1/authenticate/users/' + id,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
