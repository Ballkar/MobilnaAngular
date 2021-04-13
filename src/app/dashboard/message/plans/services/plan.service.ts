import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseModel } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';
import { RemindPlanModel } from '../remind-plan/models/remindPlan.model';
import { SchemaService } from './schema.service';

export interface PlansResponse {
  remindPlan: RemindPlanModel,
}

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private http: HttpClient,
    private schemaService: SchemaService,
  ) { }

  getPlans(): Observable<PlansResponse> {
    return this.http.get<ResponseModel<PlansResponse>>(`${environment.apiUrl}/messages/plans`).pipe(
      map(res => res.data),
      tap(res => res.remindPlan.schema = this.schemaService.returnSchemasById(res.remindPlan.schema_id)),
    );
  }
}
