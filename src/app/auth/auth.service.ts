import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { UserModel } from '../shared/model/user.model';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { userRoleTypes } from '../shared/enum/userRoleTypes';

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

    this.authUser$.pipe(
      tap(user => this.authUser = user),
    ).subscribe(
      user => localStorage.setItem('user', JSON.stringify(user))
    );
  }


  register(email: string, password: string, name: string, reg: boolean) {
    return this.http.post<void>(`${environment.apiUrl}/register`, {email, password, acc_type: userRoleTypes.user, reg, name}).pipe(
    );
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<{data: {token: string}}>(`${environment.apiUrl}/login`, { email, password }).pipe(
      map(res => res.data.token),
    );
  }

  confirmEmail(token: string): Observable<void> {
    return this.http.get<void>(`${environment.apiUrl}/email/verify?token=${token}`).pipe();
  }

  resendConfirmEmail(email: string): Observable<void> {
    return this.http.get<void>(`${environment.apiUrl}/email/resend?email=${email}`).pipe();
  }

  sendPasswordEmail(email: string, phone: string): Observable<void> {
    let params = new HttpParams();
    if(email) {
      params = params.append('email', email);
    }
    if(phone) {
      params = params.append('phone', phone);
    }
    return this.http.get<void>(`${environment.apiUrl}/password/resend`, {params}).pipe();
  }

  changePassword(password: string, token: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/password/reset`, {
      password,
      'password_confirmation': password,
      token,
    }).pipe();
  }

  logout() {

  }
}
