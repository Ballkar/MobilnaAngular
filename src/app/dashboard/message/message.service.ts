import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseModel } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';
import { MessageModel } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient,
  ) { }

  initMessage(customerId: number, schemaId?: number, text?: string): Observable<MessageModel> {
    let body: {customer_id: number, schema_id?: number, text?: string} = { customer_id: customerId };
    body = schemaId ? {...body, schema_id: schemaId} : body;
    body = text ? {...body, text} : body;
    return this.http.post<ResponseModel<MessageModel>>(`${environment.apiUrl}/messages/init`, body).pipe(
      map(res => res.data),
    );
  }
}
