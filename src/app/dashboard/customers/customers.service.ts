import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { environment } from 'src/environments/environment';
import { CustomerModel } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
  ) { }

  getCustomers(pagination?: PaginationEvent): Observable<DataResponse<CustomerModel>> {
    let params = new HttpParams();
    params = this.helperService.returnParamsWithPaginationAdded(pagination, params);
    return this.http.get<ResponseModel<CustomerModel>>(`${environment.apiUrl}/customers`, {params}).pipe(
      map(res => res.data),
    );
  }

  getCustomer(id: number): Observable<CustomerModel> {
    return this.http.get<ResponseModel<CustomerModel>>(`${environment.apiUrl}/customers/${id}`).pipe(
      map(data => data.data.item),
    );
  }

  saveCustomer(customer: CustomerModel): Observable<CustomerModel> {
    // tslint:disable-next-line: no-string-literal
    customer['additional_info'] = customer.additionalInfo;
    return this.http.post<ResponseModel<CustomerModel>>(`${environment.apiUrl}/customers`, customer).pipe(
      map(res => res.data.item),
    );
  }

  editCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.put<ResponseModel<CustomerModel>>(`${environment.apiUrl}/customers/${customer.id}`, customer).pipe(
      map(res => res.data.item),
    );
  }

  deleteCustomer(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/customers/${id}`);
  }

  private mapCustomer(customer: CustomerModel) {
    // tslint:disable-next-line: no-string-literal
    customer.additionalInfo = customer['additional_info'];
  }
}
