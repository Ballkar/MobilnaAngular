import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StateModel } from '../main-calendar/state.model';
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

  getWorks(startDate: Date, endDate: Date): Observable<WorkModel[]> {
    console.log(moment(startDate).format('YYYY-M-D'));
    console.log(moment(endDate).format('YYYY-M-D'));
    return this.httpClient.get<WorkModel[]>(`${environment.apiUrl}/works`);
  }

  editWork(work: WorkModel): Observable<WorkModel> {
    return this.httpClient.put<WorkModel>(`${environment.apiUrl}/works/${work.id}`, work);
  }

  saveWork(work: WorkModel): Observable<WorkModel> {
    return this.httpClient.post<WorkModel>(`${environment.apiUrl}/works`, work);
  }

  removeWork(work: WorkModel): Observable<WorkModel> {
    return this.httpClient.delete<WorkModel>(`${environment.apiUrl}/works/${work.id}`);
  }
}
