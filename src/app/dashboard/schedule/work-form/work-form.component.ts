import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { AddCustomerPopupComponent } from '../../customers/add-customer-popup/add-customer-popup.component';
import { CustomerModel } from '../../customers/customer.model';
import { CustomersService } from '../../customers/customers.service';
import { WorkModel } from '../work.model';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.scss']
})
export class WorkFormComponent implements OnInit {

  state: 'add' | 'edit';
  actualDate: Date = new Date();
  form: FormGroup;
  filteredCustomers: Observable<CustomerModel[]>;
  customers: CustomerModel[] = [];
  get startCtrl() { return this.form.get('start') as FormControl; }
  get stopCtrl() { return this.form.get('stop') as FormControl; }
  get customerCtrl() { return this.form.get('customer') as FormControl; }
  @Input() work: WorkModel;
  @Input() ableToRemove: boolean;
  @Output() workSubmitted: EventEmitter<WorkModel> = new EventEmitter();
  @Output() workRemoved: EventEmitter<void> = new EventEmitter();
  constructor(
    private customerService: CustomersService,
    private workService: WorkService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.state = this.work.stop && this.work.customer ? 'edit' : 'add';
    this.work.stop = this.work.stop ? this.work.stop : moment(this.work.start, 'YYYY-M-D H:m:s').add(2, 'hours').format('YYYY-M-D H:m:s');
    this.form = new FormGroup({
      start: new FormControl(this.work ? moment(this.work.start, 'YYYY-M-D H:m:s').toDate() : this.actualDate, Validators.required),
      stop: new FormControl(this.work ? moment(this.work.stop, 'YYYY-M-D H:m:s').toDate() : '', Validators.required),
      customer: new FormControl(this.work ? this.work.customer : null, Validators.required),
    });
    this.customerService.getCustomers({pageIndex: 0, pageSize: 999}).subscribe(customers => this.customers = customers.items);
    this.filteredCustomers = this.customerCtrl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.customers.slice())
    );
  }

  displayFn(customer: CustomerModel): string {
    return customer && customer.name ? `${customer.name} ${customer.surname} (${customer.phone})` : '';
  }

  private _filter(name: string): CustomerModel[] {
    const filterValue = name.toLowerCase();
    return this.customers.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  newCustomer(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const ref = this.dialog.open(AddCustomerPopupComponent, {});
    ref.afterClosed().pipe(
      filter((customer: CustomerModel) => !!customer)
    ).subscribe(customer => this.customerCtrl.setValue(customer));
  }

  remove() {
    this.workService.removeWork(this.work).subscribe(() => this.workRemoved.emit());
  }

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }
    const work: WorkModel = {
      id: this.work ? this.work.id : null,
      start: moment(this.startCtrl.value).format('YYYY-M-D H:m:s'),
      stop: moment(this.stopCtrl.value).format('YYYY-M-D H:m:s'),
      customer: this.customerCtrl.value,
    };

    if (this.state === 'add') {
      this.workService.saveWork(work).subscribe(res => this.workSubmitted.emit(res));
    } else {
      this.workService.editWork(work).subscribe(res => this.workSubmitted.emit(res));
    }
  }
}
