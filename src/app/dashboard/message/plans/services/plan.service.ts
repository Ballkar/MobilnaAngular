import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseModel } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';
import { PlanBodyModel, PLANBODYTYPES, RemindPlanModel } from '../remind-plan/models/remindPlan.model';

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
      tap(res => this.mapBodyFromApi(res.remindPlan.body)),
      tap(res => console.log(res.remindPlan.body)),
    );
  }

  private mapBodyFromApi(body: PlanBodyModel[]) {
    body.forEach(bodyEl => bodyEl.type = bodyEl.text ? PLANBODYTYPES.TEXT : PLANBODYTYPES.VARIABLE);
  }
}
