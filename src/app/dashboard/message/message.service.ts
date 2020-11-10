import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
      tap(console.log)
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

  initMessage(customerId: number, schemaId?: number, text?: string): Observable<MessageModel> {
    let body: {customer_id: number, schema_id?: number, text?: string} = { customer_id: customerId };
    body = schemaId ? {...body, schema_id: schemaId} : body;
    body = text ? {...body, text} : body;
    return this.http.post<ResponseModel<MessageModel>>(`${environment.apiUrl}/messages`, body).pipe(
      map(res => res.data),
    );
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/messages/${id}`).pipe(
    );
  }

  smsCounter(text: string, isUnicode = false) {
    // const ascii: [160, 306, 459];
    // const unicode: [70, 134, 201];
    let smsLength = 0;
    let smsCount = -1;
    let charsLeft = 0;

    for (let charPos = 0; charPos < text.length; charPos++) {
      const char = text[charPos];
      switch (char) {
          case '\n':
          case '[':
          case ']':
          case '\\':
          case '^':
          case '{':
          case '}':
          case '|':
          case '€':
              smsLength += 2;
              break;

          default:
              smsLength += 1;
      }


      if (text.charCodeAt(charPos) > 127 && text[charPos] !== '€') {
        console.log('unicode?');
      }
    }

    // for (let sCount = 0; sCount < s.maxSmsNum; sCount++) {

    //     cutStrLength = smsType[sCount];
    //     if (smsLength <= smsType[sCount]) {

    //         smsCount = sCount + 1;
    //         charsLeft = smsType[sCount] - smsLength;
    //         break;
    //     }
    // }

    // if (s.cut) { e.val(text.substring(0, cutStrLength)); }
    // smsCount == -1 && (smsCount = s.maxSmsNum, charsLeft = 0);


  }

}
