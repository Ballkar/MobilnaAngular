import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, delay, filter, map, tap } from 'rxjs/operators';
import { AddCustomerPopupComponent } from 'src/app/dashboard/customers/add-customer-popup/add-customer-popup.component';
import { HelperService } from 'src/app/shared/service/helper.service';
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
  initPagination: PaginationEvent;
  pagination: PaginationEvent;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  customers$: Observable<CustomerModel[]>;
  constructor(
    private customerService: CustomersService,
    private helperService: HelperService,
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
    this.customers$ = this.customerService.getCustomers(pagination).pipe(
      tap(data => this.pagination = this.helperService.mapApiPaginationToMaterialEvent(data.pagination)),
      map(data => data.items),
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
