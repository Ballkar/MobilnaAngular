import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';
import { StateModel } from '../main-calendar/state.model';
import { MessageSchemaModel } from '../message/message.model';
import { WorkModel } from './work.model';

@Injectable({
  providedIn: 'root'
})
export class WorkService {


  clientState: StateModel = {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  };
  constructor(
    private httpClient: HttpClient,
  ) { }

  getWorks(startDate: Date, endDate: Date): Observable<DataResponse<WorkModel>> {
    return this.httpClient.get<ResponseModel<DataResponse<WorkModel>>>(`${environment.apiUrl}/calendarWorks`).pipe(
      map(res => res.data)
    );
  }

  editWork(work: WorkModel): Observable<WorkModel> {
    return this.httpClient.put<ResponseModel<WorkModel>>(`${environment.apiUrl}/calendarWorks/${work.id}`, work).pipe(
      map(res => res.data)
    );
  }

  saveWork(work: WorkModel): Observable<WorkModel> {
    return this.httpClient.post<ResponseModel<WorkModel>>(`${environment.apiUrl}/calendarWorks`, work).pipe(
      map(res => res.data)
    );
  }

  removeWork(work: WorkModel): Observable<WorkModel> {
    return this.httpClient.delete<ResponseModel<WorkModel>>(`${environment.apiUrl}/calendarWorks/${work.id}`).pipe(
      map(res => res.data)
    );
  }
}
