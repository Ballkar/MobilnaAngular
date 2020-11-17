import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { environment } from 'src/environments/environment';
import { MessagePlans } from '../message.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  constructor(
    private http: HttpClient,
    private helperService: HelperService,
  ) { }

  getPlans(pagination: PaginationEvent): Observable<DataResponse<MessagePlans>> {
    let params = new HttpParams();
    params = this.helperService.returnParamsWithPaginationAdded(pagination, params);
    // params = query ? params.set('query', query) : params;
    return this.http.get<ResponseModel<DataResponse<MessagePlans>>>(`${environment.apiUrl}/messages/plans`, {params}).pipe(
      map(res => res.data),
    );
  }
}
