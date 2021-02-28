import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { environment } from 'src/environments/environment';
import { MessagePlan } from '../message.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  constructor(
    private http: HttpClient,
    private helperService: HelperService,
  ) { }

  getPlans(pagination: PaginationEvent): Observable<DataResponse<MessagePlan>> {
    let params = new HttpParams();
    params = this.helperService.returnParamsWithPaginationAdded(pagination, params);
    // params = query ? params.set('query', query) : params;
    return this.http.get<ResponseModel<DataResponse<MessagePlan>>>(`${environment.apiUrl}/messages/plans`, {params}).pipe(
      map(res => res.data),
    );
  }

  add(plan: MessagePlan): Observable<MessagePlan> {
    return this.http.post<ResponseModel<MessagePlan>>(`${environment.apiUrl}/messages/plans`, {
      ...plan, schema_id: plan.schema.id, time_type: plan.timeType
    }).pipe(
      map(res => res.data),
    );
  }

  updatePlan(plan: MessagePlan): Observable<MessagePlan> {
    return this.http.put<ResponseModel<MessagePlan>>(`${environment.apiUrl}/messages/plans/${plan.id}`, {
      ...plan, time_type: plan.timeType
    }).pipe(
      map(data => data.data),
    );
  }

  deletePlan(plan: MessagePlan): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/messages/plans/${plan.id}`).pipe(
    );
  }
}
