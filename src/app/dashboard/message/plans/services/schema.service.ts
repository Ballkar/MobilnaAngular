import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';
import { RemindPlanModel } from '../remind-plan/models/remindPlan.model';
import { PlanSchema, PLANTYPES, SCHEMABODYTYPES } from "../models/PlanSchema.model";

export interface SchemaResponse {
  remindPlan: RemindPlanModel,
}

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  schemas: PlanSchema[];

  constructor(
    private http: HttpClient,
  ) { }

  returnSchemasById(id: number): PlanSchema {
    const filtered = this.schemas.filter(schema => schema.id === id);
    return filtered ? filtered[0] : null;
  }

  returnSchemasForType(type: PLANTYPES): PlanSchema[] {
    return this.schemas.filter(schema => schema.type === type);
  }

  getSchemas(): Observable<PlanSchema[]> {
    return this.http.get<ResponseModel<DataResponse<PlanSchema>>>(`${environment.apiUrl}/messages/plans/schemas`).pipe(
      map(res => res.data.items),
      tap(schemas => this.mapSchemasFromApi(schemas)),
      tap(schemas => this.schemas = schemas),
    );
  }

  private mapSchemasFromApi(schemas: PlanSchema[]) {
    schemas.forEach(schema => {
      schema.body.forEach(bodyEl => bodyEl.type = bodyEl.text ? SCHEMABODYTYPES.TEXT : SCHEMABODYTYPES.VARIABLE);
    });
  }
}
