import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';
import { RemindPlanModel } from '../models/remindPlan.model';

export interface PlansResponse {
  remindPlan: RemindPlanModel,
}

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private http: HttpClient,
  ) { }

  getPlans(): Observable<PlansResponse> {
    return this.http.get<ResponseModel<PlansResponse>>(`${environment.apiUrl}/messages/plans`).pipe(
      map(res => res.data),
    );
  }
}
