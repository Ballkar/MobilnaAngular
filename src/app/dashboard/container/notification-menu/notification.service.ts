import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel, DataResponse } from 'src/app/shared/model/response.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { environment } from 'src/environments/environment';
import { NotificationModel } from './NotificationModel.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
  ) { }

  getNotifications(pagination: PaginationEvent): Observable<DataResponse<NotificationModel>> {
    let params = new HttpParams();
    params = this.helperService.returnParamsWithPaginationAdded(pagination, params);
    return this.http.get<ResponseModel<DataResponse<NotificationModel>>>(`${environment.apiUrl}/notifications`, {params}).pipe(
      map(res => res.data),
    );
  }
}

