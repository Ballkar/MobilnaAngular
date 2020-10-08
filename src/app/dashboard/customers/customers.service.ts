import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerModel } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private http: HttpClient,
  ) { }

  getCustomers(pagination: PaginationEvent): Observable<CustomerModel[]> {
    const {pageIndex, pageSize} = pagination;
    return this.http.get<CustomerModel[]>(`${environment.apiUrl}/customers?_page=${pageIndex + 1}&_limit=${pageSize}`);
  }

  getCustomer(id: number): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(`${environment.apiUrl}/customers/${id}`);
  }

  saveCustomer(Customer: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(`${environment.apiUrl}/customers`, Customer);
  }

  deleteCustomer(id: number): Observable<CustomerModel> {
    return this.http.delete<CustomerModel>(`${environment.apiUrl}/customers/${id}`);
  }
}
