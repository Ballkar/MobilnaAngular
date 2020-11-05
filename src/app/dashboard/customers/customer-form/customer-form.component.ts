import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomerModel } from '../customer.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  state: 'add' | 'edit';
  form: FormGroup;

  customers: CustomerModel[] = [];
  get nameCtrl() { return this.form.get('name') as FormControl; }
  get surnameCtrl() { return this.form.get('surname') as FormControl; }
  get phoneCtrl() { return this.form.get('phone') as FormControl; }
  get additionalInfoCtrl() { return this.form.get('additionalInfo') as FormControl; }

  @Input() customer: CustomerModel;
  @Input() ableToRemove: boolean;
  @Output() customerEmitted: EventEmitter<CustomerModel> = new EventEmitter();
  constructor(
    private customerService: CustomersService,
  ) { }

  ngOnInit() {
    this.state = this.customer && this.customer.id ? 'edit' : 'add';
    this.form  = new FormGroup({
      name: new FormControl(this.customer ? this.customer.name : '', Validators.required),
      surname: new FormControl(this.customer ? this.customer.surname : '', Validators.required),
      phone: new FormControl(this.customer ? this.customer.phone : '', Validators.required),
      additionalInfo: new FormControl(this.customer ? this.customer.additionalInfo : ''),
    });
  }

  remove() {

  }

  onSubmit() {
    if (this.form.invalid) {  return false; }

    if (this.state === 'add') {
      this.customerService.saveCustomer({...this.form.value})
        .subscribe(customer => this.customerEmitted.emit(customer));
    } else {
      this.customerService.editCustomer({...this.form.value, id: this.customer.id})
        .subscribe(customer => this.customerEmitted.emit(customer));
    }
  }
}
