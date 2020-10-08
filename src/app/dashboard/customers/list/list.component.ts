import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../customer.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  customers$ = this.customerService.getCustomers();
  constructor(
    private customerService: CustomersService,
  ) { }

  ngOnInit() {
  }

  select(customer: CustomerModel) {

  }

  edit(customer: CustomerModel) {

  }

  remove(customer: CustomerModel) {

  }

}
