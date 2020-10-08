import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, delay, tap } from 'rxjs/operators';
import { CustomerModel } from '../customer.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  searchCtrl: FormControl = new FormControl();
  pagination: PaginationEvent = {
    length: 5,
    pageIndex: 0,
    pageSize: 3,
    previousPageIndex: null
  };
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  customers$: Observable<CustomerModel[]>;
  constructor(
    private customerService: CustomersService,
  ) { }

  ngOnInit() {
    this.getCustomers();
    this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(console.log);
  }

  getCustomers() {
    this.isLoading$.next(true);
    this.customers$ = this.customerService.getCustomers(this.pagination).pipe(
      tap(() => this.isLoading$.next(false)),
    );
  }

  initChat(customer: CustomerModel) {

  }

  select(customer: CustomerModel) {

  }

  edit(customer: CustomerModel) {

  }

  remove(customer: CustomerModel) {

  }

  add() {

  }

  changePage(event: PaginationEvent) {
    this.pagination = event;
    this.getCustomers();
  }
}
