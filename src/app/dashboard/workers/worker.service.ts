import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';
import { WorkerModel } from './worker.model';

@Injectable({
  providedIn: 'root'
})
export class WorkerService implements OnDestroy {
  voidWorkerColor = '#d1e8ff';
  workers$: BehaviorSubject<WorkerModel[]> = new BehaviorSubject([]);
  onDestroy$: Subject<void> = new Subject();

  constructor(
    private httpClient: HttpClient,
  ) { }

  getWorkers(): Observable<WorkerModel[]> {
    return this.httpClient.get<ResponseModel<DataResponse<WorkerModel>>>(`${environment.apiUrl}/workers`).pipe(
      map(res => res.data.items),
      map(workers => [{color: this.voidWorkerColor, id: null, name: 'Brak', active: false}, ...workers]),
      tap(workers => this.workers$.next(workers)),
    );
  }

  getWorker(id: number): Observable<WorkerModel[]> {
    return this.httpClient.get<ResponseModel<DataResponse<WorkerModel>>>(`${environment.apiUrl}/workers/${id}`).pipe(
      map(res => res.data.items),
    );
  }

  editWorker(worker: WorkerModel): Observable<WorkerModel> {
    return this.httpClient.put<ResponseModel<WorkerModel>>(`${environment.apiUrl}/workers/${worker.id}`, worker).pipe(
      map(res => res.data),
    );
  }

  massEditWorker(workers: WorkerModel[]): Observable<WorkerModel[]> {
    return this.httpClient.post<ResponseModel<WorkerModel[]>>(`${environment.apiUrl}/workers/mass-update`, {workers}).pipe(
      map(res => res.data),
      map(workers => [{color: this.voidWorkerColor, id: null, name: 'Brak', active: false}, ...workers]),
      tap(workers => this.workers$.next(workers)),
    );
  }

  saveWorker(worker: WorkerModel): Observable<WorkerModel> {
    return this.httpClient.post<ResponseModel<WorkerModel>>(`${environment.apiUrl}/workers`, worker).pipe(
      map(res => res.data),
      tap(worker => this.workers$.next([...this.workers$.getValue(), worker])),
    );
  }

  removeWorker(worker: WorkerModel): Observable<any> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/workers/${worker.id}`).pipe(
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
