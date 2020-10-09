import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, delay, filter, tap } from 'rxjs/operators';
import { AddCustomerPopupComponent } from 'src/app/dashboard/customers/add-customer-popup/add-customer-popup.component';
import { CustomerModel } from '../customer.model';
import { CustomersService } from '../customers.service';
import { EditCustomerPopupComponent } from '../edit-customer-popup/edit-customer-popup.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  searchCtrl: FormControl = new FormControl();
  initPagination: PaginationEvent = {
    length: 5,
    pageIndex: 0,
    pageSize: 3,
    previousPageIndex: null
  };
  pagination: PaginationEvent;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  customers$: Observable<CustomerModel[]>;
  constructor(
    private customerService: CustomersService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getCustomers();
    this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(console.log);
  }

  getCustomers(pagination?: PaginationEvent) {
    this.isLoading$.next(true);
    pagination = pagination ? pagination : this.initPagination;
    this.pagination = pagination;
    this.customers$ = this.customerService.getCustomers(pagination).pipe(
      tap(() => this.isLoading$.next(false)),
    );
  }

  initChat(customer: CustomerModel) {

  }

  select(customer: CustomerModel) {

  }

  edit(customer: CustomerModel) {
    const ref = this.dialog.open(EditCustomerPopupComponent, {data: customer});
    ref.afterClosed().pipe(
      filter((customerEditted: CustomerModel) => !!customerEditted)
    ).subscribe(() => this.getCustomers());
  }

  remove(customer: CustomerModel) {

  }

  add() {
    const ref = this.dialog.open(AddCustomerPopupComponent, {});
    ref.afterClosed().pipe(
      filter((customer: CustomerModel) => !!customer)
    ).subscribe(() => this.getCustomers());
  }

  changePage(event: PaginationEvent) {
    this.getCustomers(event);
  }
}
