import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseModel, DataResponse } from 'src/app/shared/model/response.model';
import { UserModel } from 'src/app/shared/model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser: UserModel;
  constructor(
    private http: HttpClient,
  ) { }

  user(): Observable<UserModel> {
    return this.http.get<ResponseModel<UserModel>>(`${environment.apiUrl}/user`).pipe(
      map(res => res.data),
      tap(user => this.loggedUser = user),
    );
  }

}
