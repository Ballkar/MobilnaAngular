import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';
import { LabelModel } from './label.model';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  voidLabelColor = '#d1e8ff';

  constructor(
    private httpClient: HttpClient,
  ) { }

  getLabels(): Observable<LabelModel[]> {
    return this.httpClient.get<ResponseModel<DataResponse<LabelModel>>>(`${environment.apiUrl}/calendar/labels`).pipe(
      map(res => res.data.items),
    );
  }

  getLabel(id: number): Observable<LabelModel[]> {
    return this.httpClient.get<ResponseModel<DataResponse<LabelModel>>>(`${environment.apiUrl}/calendar/labels/${id}`).pipe(
      map(res => res.data.items),
    );
  }

  editLabel(label: LabelModel): Observable<LabelModel> {
    return this.httpClient.put<ResponseModel<LabelModel>>(`${environment.apiUrl}/calendar/labels/${label.id}`, label).pipe(
      map(res => res.data)
    );
  }

  saveWork(label: LabelModel): Observable<LabelModel> {
    return this.httpClient.post<ResponseModel<LabelModel>>(`${environment.apiUrl}/calendar/labels`, label).pipe(
      map(res => res.data)
    );
  }

  removeWork(label: LabelModel): Observable<LabelModel> {
    return this.httpClient.delete<ResponseModel<LabelModel>>(`${environment.apiUrl}/calendar/labels/${label.id}`).pipe(
      map(res => res.data)
    );
  }
}
