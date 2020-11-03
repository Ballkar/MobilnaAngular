import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { environment } from 'src/environments/environment';
import { MessageModel } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
  ) { }

  getMessages(pagination: PaginationEvent, query: string): Observable<DataResponse<MessageModel>> {
    let params = new HttpParams();
    params = this.helperService.returnParamsWithPaginationAdded(pagination, params);
    params = query ? params.set('query', query) : params;
    return this.http.get<ResponseModel<DataResponse<MessageModel>>>(`${environment.apiUrl}/messages`, {params}).pipe(
      map(res => res.data),
    );
  }

  getMessage(id: number): Observable<MessageModel> {
    return this.http.get<ResponseModel<MessageModel>>(`${environment.apiUrl}/messages/${id}`).pipe(
      map(res => res.data),
    );
  }

  editMessage(message: MessageModel): Observable<MessageModel> {
    return this.http.put<ResponseModel<MessageModel>>(`${environment.apiUrl}/messages/${message.id}`, message).pipe(
      map(res => res.data),
    );
  }

  saveMessage(message: MessageModel): Observable<MessageModel> {
    return this.http.post<ResponseModel<MessageModel>>(`${environment.apiUrl}/messages`, message).pipe(
      map(res => res.data),
    );
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/messages/${id}`).pipe(
    );
  }

}
