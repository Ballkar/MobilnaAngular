import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageSchemaModel } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageSchemaService {

  constructor(
    private http: HttpClient,
  ) { }

  getSchemas(): Observable<MessageSchemaModel> {
    return this.http.get<MessageSchemaModel>(`${environment.apiUrl}/messageSchemas`);
  }

  getSchema(id: number): Observable<MessageSchemaModel> {
    return this.http.get<MessageSchemaModel>(`${environment.apiUrl}/messageSchemas/${id}`);
  }

  saveSchema(schema: MessageSchemaModel): Observable<MessageSchemaModel> {
    return this.http.post<MessageSchemaModel>(`${environment.apiUrl}/messageSchemas`, schema);
  }

  deleteSchema(id: number): Observable<MessageSchemaModel> {
    return this.http.delete<MessageSchemaModel>(`${environment.apiUrl}/messageSchemas/${id}`);
  }
}
