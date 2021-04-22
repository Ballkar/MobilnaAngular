import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  usersList(): Observable<UserModel[]> {
    return this.http.get<ResponseModel<DataResponse<UserModel>>>(`${environment.apiUrl}/admin/users`).pipe(
      map(res => res.data.items),
      tap(console.log),
    );
  }


  addUser(user: UserModel): Observable<UserModel> {
    return this.http.post<ResponseModel<UserModel>>(`${environment.apiUrl}/admin/users`, user).pipe(
      map(res => res.data),
    );
  }
}

