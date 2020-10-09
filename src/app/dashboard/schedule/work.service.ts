import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.httpClient.get<WorkModel[]>(`${environment.apiUrl}/works`);
  }

  editWork(work: WorkModel): Observable<WorkModel> {
    console.log(work);
    return this.httpClient.put<WorkModel>(`${environment.apiUrl}/works/${work.id}`, work);
  }

  saveWork(work: WorkModel): Observable<WorkModel> {
    return this.httpClient.post<WorkModel>(`${environment.apiUrl}/works`, work);
  }
}
