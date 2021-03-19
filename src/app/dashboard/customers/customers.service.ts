import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PaginationEvent } from 'src/app/shared/model/paginationEvent.model';
import { DataResponse, ResponseModel } from 'src/app/shared/model/response.model';
import { PhonePipe } from 'src/app/shared/pipes/phone.pipe';
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

  getCustomers(pagination?: PaginationEvent, query?: string): Observable<DataResponse<CustomerModel>> {
    let params = new HttpParams();
    params = this.helperService.returnParamsWithPaginationAdded(pagination, params);
    params = query ? params.set('query', query) : params;
    return this.http.get<ResponseModel<DataResponse<CustomerModel>>>(`${environment.apiUrl}/customers`, {params}).pipe(
      map(res => res.data),
      tap(data => data.items.forEach(customer => this.mapCustomerFromApi(customer))),
    );
  }

  getCustomer(id: number): Observable<CustomerModel> {
    return this.http.get<ResponseModel<CustomerModel>>(`${environment.apiUrl}/customers/${id}`).pipe(
      map(data => data.data),
      tap(customer => this.mapCustomerFromApi(customer)),
    );
  }

  saveCustomer(customer: CustomerModel): Observable<CustomerModel> {
    this.mapCustomerForApi(customer);
    return this.http.post<ResponseModel<CustomerModel>>(`${environment.apiUrl}/customers`, customer).pipe(
      map(res => res.data),
      tap(res => this.mapCustomerFromApi(res)),
    );
  }

  editCustomer(customer: CustomerModel): Observable<CustomerModel> {
    this.mapCustomerForApi(customer);
    return this.http.put<ResponseModel<CustomerModel>>(`${environment.apiUrl}/customers/${customer.id}`, customer).pipe(
      map(res => res.data),
      tap(res => this.mapCustomerFromApi(res)),
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/customers/${id}`);
  }

  private mapCustomerForApi(customer: CustomerModel) {
    // tslint:disable-next-line: no-string-literal
    customer['additional_info'] = customer.additionalInfo;
    customer.phone = customer.phone.replace(/-+/ig, '');
  }

  private mapCustomerFromApi(customer: CustomerModel) {
    const phonePipe = new PhonePipe();
    customer.phone = phonePipe.transform(customer.phone);
    // tslint:disable-next-line: no-string-literal
    customer.additionalInfo = customer['additional_info'];

  }
}
