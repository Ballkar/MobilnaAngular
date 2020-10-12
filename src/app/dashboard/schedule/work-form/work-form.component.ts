import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { CustomerModel } from '../../customers/customer.model';
import { CustomersService } from '../../customers/customers.service';
import { WorkModel } from '../work.model';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.scss']
})
export class WorkFormComponent implements OnInit {

  actualDate: Date = new Date();
  form: FormGroup;
  filteredCustomers: Observable<CustomerModel[]>;
  customers: CustomerModel[] = [];
  get startCtrl() { return this.form.get('start') as FormControl; }
  get stopCtrl() { return this.form.get('stop') as FormControl; }
  get customerCtrl() { return this.form.get('customer') as FormControl; }
  @Input() work: WorkModel;
  @Output() workSubmitted: EventEmitter<WorkModel> = new EventEmitter();
  constructor(
    private customerService: CustomersService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      start: new FormControl(this.work ? moment(this.work.start, 'YYYY-M-D H:m:s').toDate() : this.actualDate, Validators.required),
      stop: new FormControl(this.work ? moment(this.work.stop, 'YYYY-M-D H:m:s').toDate() : '', Validators.required),
      customer: new FormControl(this.work ? this.work.customer : null, Validators.required),
    });
    console.log(this.form);
    this.customerService.getCustomers({pageIndex: 0, pageSize: 999}).subscribe(customers => this.customers = customers);
    this.filteredCustomers = this.customerCtrl.valueChanges.pipe(
      tap(console.log),
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.customers.slice())
    );
  }

  displayFn(customer: CustomerModel): string {
    return customer && customer.name ? `${customer.name} ${customer.name} (${customer.phone})` : '';
  }

  private _filter(name: string): CustomerModel[] {
    const filterValue = name.toLowerCase();
    return this.customers.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }
    this.workSubmitted.emit(this.form.value);
  }
}
