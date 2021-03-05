import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';
import { RemindPlanModel } from '../models/remindPlan.model';

@Injectable({
  providedIn: 'root'
})
export class RemindPlanService {
  constructor(
    private http: HttpClient,
  ) { }

  getPlan(): Observable<RemindPlanModel> {
    return this.http.get<ResponseModel<RemindPlanModel>>(`${environment.apiUrl}/messages/plans`).pipe(
      map(res => res.data),
    );
  }

  updatePlan(plan: RemindPlanModel): Observable<RemindPlanModel> {
    return this.http.put<ResponseModel<RemindPlanModel>>(`${environment.apiUrl}/messages/plans/remind`, plan).pipe(
      map(res => res.data),
    );

  }
}
