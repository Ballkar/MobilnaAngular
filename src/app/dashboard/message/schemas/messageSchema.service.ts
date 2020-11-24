import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { environment } from 'src/environments/environment';
import { MessageSchemaModel, SCHEMABODYTYPES } from '../message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageSchemaService {

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
  ) { }

  getSchemas(pagination: PaginationEvent, query: string): Observable<DataResponse<MessageSchemaModel>> {
    let params = new HttpParams();
    params = this.helperService.returnParamsWithPaginationAdded(pagination, params);
    params = query ? params.set('query', query) : params;
    return this.http.get<ResponseModel<DataResponse<MessageSchemaModel>>>(`${environment.apiUrl}/messages/schemas`, {params}).pipe(
      map(res => res.data),
      tap(res => res.items.forEach(item => this.mapSchemaFromApi(item))),
    );
  }

  getSchema(id: number): Observable<MessageSchemaModel> {
    return this.http.get<ResponseModel<MessageSchemaModel>>(`${environment.apiUrl}/messages/schemas/${id}`).pipe(
      map(data => data.data),
    );
  }

  saveSchema(schema: MessageSchemaModel): Observable<MessageSchemaModel> {
    return this.http.post<ResponseModel<MessageSchemaModel>>(`${environment.apiUrl}/messages/schemas`, schema).pipe(
      map(data => data.data),
    );
  }

  updateSchema(schema: MessageSchemaModel): Observable<MessageSchemaModel> {
    return this.http.put<ResponseModel<MessageSchemaModel>>(`${environment.apiUrl}/messages/schemas/${schema.id}`, schema).pipe(
      map(data => data.data),
    );
  }

  deleteSchema(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/messages/schemas/${id}`).pipe(
    );
  }

  getPreview(customerId: number, schema: MessageSchemaModel): Observable<string> {
    return this.http.post<ResponseModel<string>>(`${environment.apiUrl}/messages/schemas/preview`, { customer_id: customerId, schema })
    .pipe(
      map(res => res.data)
    );
  }

  private mapSchemaFromApi(schema: MessageSchemaModel) {
    schema.body.forEach(bodyEl => bodyEl.type = bodyEl.text ? SCHEMABODYTYPES.TEXT : SCHEMABODYTYPES.VARIABLE);
  }
}
