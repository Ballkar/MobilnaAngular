import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseModel } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';
import { RemindPlanModel } from './models/remindPlan.model';
import { RemindPlanPreviewModel } from './models/remindPlanPreviewModel.model';

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

  getPreview(customerId: number, plan: RemindPlanModel): Observable<RemindPlanPreviewModel> {
    const { clear_diacritics, body } = plan;
    return this.http.post<ResponseModel<RemindPlanPreviewModel>>(`${environment.apiUrl}/messages/plans/remind/preview`,
    { customer_id: customerId, body, clear_diacritics }).pipe(
        map(res => res.data),
        tap(res => res.letterCount = res['letter_count']),
        tap(res => res.smsCount = res['sms_count']),
        tap(res => res.letterNextLimit = res['letter_next_limit']),
    );
  }
}
