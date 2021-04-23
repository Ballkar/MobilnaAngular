import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { userRoleTypes } from 'src/app/shared/enum/userRoleTypes';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { UserModel } from 'src/app/shared/model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private http: HttpClient,
  ) { }

  usersList(page: number, perPage: number): Observable<DataResponse<UserModel>> {
    let params = new HttpParams();
    params = page ? params.set('page', page.toString()) : params;
    params = perPage ? params.set('limit', perPage.toString()) : params;
    return this.http.get<ResponseModel<DataResponse<UserModel>>>(`${environment.apiUrl}/admin/users`, { params }).pipe(
      map(res => res.data),
    );
  }


  addUser(user: UserModel): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/admin/users`, {...user, acc_type: userRoleTypes.user, reg: true}).pipe(
    );
  }
}

