import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../shared/model/user.model';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUser: UserModel;
  authUser$ = new Subject<UserModel>();
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

    this.authUser$.subscribe(
      user => localStorage.setItem('user', JSON.stringify(user))
    );
  }


  register(email: string, password: string, name: string, regs: boolean) {

  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<{data: {token: string}}>(`${environment.apiUrl}/login`, {email, password, acc_type: 2}).pipe(
      map(res => res.data.token),
    );
  }

  logout() {

  }
}
