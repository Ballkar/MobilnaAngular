import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';
import { LabelModel } from './label.model';
import { WorkModel } from './work.model';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  getWorks(startDate: Date, endDate: Date, labels: LabelModel[] = []): Observable<WorkModel[]> {
    const start = moment(startDate).format('YYYY-M-D H:m:s');
    const stop = moment(endDate).format('YYYY-M-D H:m:s');
    // tslint:disable-next-line: variable-name
    const label_ids = labels.map(label => label.id);
    const params = { start, stop, label_ids };
    return this.httpClient.post<ResponseModel<DataResponse<WorkModel>>>(`${environment.apiUrl}/calendar/works/calendar`, params).pipe(
      map(res => res.data.items),
    );
  }

  editWork(work: WorkModel): Observable<WorkModel> {
    return this.httpClient.put<ResponseModel<WorkModel>>(`${environment.apiUrl}/calendar/works/${work.id}`, {
      ...work,
      customer_id: work.customer.id,
      label_id: work.label ? work.label.id : null,
    }).pipe(
      map(res => res.data)
    );
  }

  saveWork(work: WorkModel): Observable<WorkModel> {
    return this.httpClient.post<ResponseModel<WorkModel>>(`${environment.apiUrl}/calendar/works`, {
      ...work,
      customer_id: work.customer.id,
      label_id: work.label ? work.label.id : null,
    }).pipe(
      map(res => res.data)
    );
  }

  saveManyWorks(works: WorkModel[]): Observable<WorkModel[]> {
    works.forEach(work => work.customer_id = work.customer.id);
    works.forEach(work => work.label_id = work.label ? work.label.id : null);
    works.forEach(work => delete work.customer);
    works.forEach(work => delete work.label);
    return this.httpClient.post<ResponseModel<WorkModel[]>>(`${environment.apiUrl}/calendar/works/mass-update`, {works}).pipe(
      map(res => res.data)
    );
  }

  removeWork(work: WorkModel): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/calendar/works/${work.id}`).pipe(
    );
  }
}
