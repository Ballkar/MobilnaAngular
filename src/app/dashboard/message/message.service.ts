import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageModel } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient,
  ) { }

  getMessages(): Observable<MessageModel> {
    return this.http.get<MessageModel>(`${environment.apiUrl}/messages`);
  }

  getMessage(id: number): Observable<MessageModel> {
    return this.http.get<MessageModel>(`${environment.apiUrl}/messages/${id}`);
  }

  saveMessage(message: MessageModel): Observable<MessageModel> {
    return this.http.post<MessageModel>(`${environment.apiUrl}/messages`, message);
  }

  deleteMessage(id: number): Observable<MessageModel> {
    return this.http.delete<MessageModel>(`${environment.apiUrl}/messages/${id}`);
  }

}
