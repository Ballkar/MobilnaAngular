import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { PaginationEvent } from 'src/app/shared/model/paginationEvent.model';
import { ResponseModel, DataResponse } from 'src/app/shared/model/response.model';
import { UserModel } from 'src/app/shared/model/user.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { environment } from 'src/environments/environment';
import { WalletTransaction, WalletTransactionTypes } from './WalletTransaction';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser: UserModel;
  constructor(
    private http: HttpClient,
    private helperService: HelperService,
    public authService: AuthService,
  ) { }

  user(): Observable<UserModel> {
    return this.http.get<ResponseModel<UserModel>>(`${environment.apiUrl}/user`).pipe(
      map(res => res.data),
      tap(user => this.loggedUser = user),
      tap(user => this.authService.authUser$.next(user)),
    );
  }

  getWalletHistory(pagination: PaginationEvent): Observable<DataResponse<WalletTransaction>> {
    let params = new HttpParams();
    params = this.helperService.returnParamsWithPaginationAdded(pagination, params);
    return this.http.get<ResponseModel<DataResponse<WalletTransaction>>>(`${environment.apiUrl}/user/wallet`, {params}).pipe(
      map(res => res.data),
    );
  }

  addWalletTransaction(money: number, userId: number): Observable<WalletTransaction> {
    return this.http.post<ResponseModel<WalletTransaction>>(`${environment.apiUrl}/admin/wallet`, {money: money * 100, type: WalletTransactionTypes.ADD, user_id: userId}).pipe(
      map(res => res.data),
    );
  }

  updateProfile(value: any): Observable<UserModel> {
    return this.http.post<ResponseModel<UserModel>>(`${environment.apiUrl}/user`, value).pipe(
      map(res => res.data),
      tap(user => this.loggedUser = user),
    );
  }

  changePassword(value: any): Observable<void> {
    return this.http.post<ResponseModel<void>>(`${environment.apiUrl}/user/password`, value).pipe(
      map(res => res.data),
    );
  }

}

