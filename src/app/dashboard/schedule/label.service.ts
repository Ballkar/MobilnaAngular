import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';
import { LabelModel } from './label.model';

@Injectable({
  providedIn: 'root'
})
export class LabelService implements OnDestroy {
  voidLabelColor = '#d1e8ff';
  labels$: BehaviorSubject<LabelModel[]> = new BehaviorSubject([]);
  onDestroy$: Subject<void> = new Subject();

  constructor(
    private httpClient: HttpClient,
  ) { }

  getLabels(): Observable<LabelModel[]> {
    return this.httpClient.get<ResponseModel<DataResponse<LabelModel>>>(`${environment.apiUrl}/calendar/labels`).pipe(
      map(res => res.data.items),
      map(labels => [{color: this.voidLabelColor, id: null, name: 'Brak', active: false}, ...labels]),
      tap(labels => this.labels$.next(labels)),
    );
  }

  getLabel(id: number): Observable<LabelModel[]> {
    return this.httpClient.get<ResponseModel<DataResponse<LabelModel>>>(`${environment.apiUrl}/calendar/labels/${id}`).pipe(
      map(res => res.data.items),
    );
  }

  editLabel(label: LabelModel): Observable<LabelModel> {
    return this.httpClient.put<ResponseModel<LabelModel>>(`${environment.apiUrl}/calendar/labels/${label.id}`, label).pipe(
      map(res => res.data),
    );
  }

  massEditLabel(labels: LabelModel[]): Observable<LabelModel[]> {
    return this.httpClient.post<ResponseModel<LabelModel[]>>(`${environment.apiUrl}/calendar/labels/mass-update`, {labels}).pipe(
      map(res => res.data),
      map(labels => [{color: this.voidLabelColor, id: null, name: 'Brak', active: false}, ...labels]),
      tap(labels => this.labels$.next(labels)),
    );
  }

  saveLabel(label: LabelModel): Observable<LabelModel> {
    return this.httpClient.post<ResponseModel<LabelModel>>(`${environment.apiUrl}/calendar/labels`, label).pipe(
      map(res => res.data),
      tap(label => this.labels$.next([...this.labels$.getValue(), label])),
    );
  }

  removeLabel(label: LabelModel): Observable<any> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/calendar/labels/${label.id}`).pipe(
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
