import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PaginationEvent } from 'src/app/shared/model/paginationEvent.model';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user/user.service';
import { MessageModel } from '../message.model';
import { MessageSettings } from '../MessageSettings.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private helperService: HelperService,
  ) { }

  getMessages(pagination: PaginationEvent, query: string): Observable<DataResponse<MessageModel>> {
    let params = new HttpParams();
    params = this.helperService.returnParamsWithPaginationAdded(pagination, params);
    params = query ? params.set('query', query) : params;
    return this.http.get<ResponseModel<DataResponse<MessageModel>>>(`${environment.apiUrl}/messages/history`, {params}).pipe(
      map(res => res.data),
    );
  }

  getMessage(id: number): Observable<MessageModel> {
    return this.http.get<ResponseModel<MessageModel>>(`${environment.apiUrl}/messages/history/${id}`).pipe(
      map(res => res.data),
    );
  }

  editMessage(message: MessageModel): Observable<MessageModel> {
    return this.http.put<ResponseModel<MessageModel>>(`${environment.apiUrl}/messages/history/${message.id}`, message).pipe(
      map(res => res.data),
    );
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/messages/history/${id}`).pipe(
    );
  }

  getMessagesSettings(): Observable<MessageSettings> {
    console.log(this.userService.loggedUser);
    const id = this.userService.loggedUser.messageSettings.id;
    return this.http.get<ResponseModel<DataResponse<MessageSettings>>>(`${environment.apiUrl}/messages/setting/${id}`).pipe(
      map(res => res.data.item),
    );
  }

}
