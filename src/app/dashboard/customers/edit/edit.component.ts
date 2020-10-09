import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerModel } from '../customer.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() customer: CustomerModel;
  form: FormGroup;
  get nameCtrl() { return this.form.get('name') as FormControl; }
  get surnameCtrl() { return this.form.get('surname') as FormControl; }
  get phoneCtrl() { return this.form.get('phone') as FormControl; }
  get infoCtrl() { return this.form.get('info') as FormControl; }

  @Output() customerEditted = new EventEmitter<CustomerModel>();
  constructor(
    private customerService: CustomersService,
  ) { }

  ngOnInit() {
    this.form  = new FormGroup({
      name: new FormControl(this.customer.name, Validators.required),
      surname: new FormControl(this.customer.surname, Validators.required),
      phone: new FormControl(this.customer.phone, Validators.required),
      info: new FormControl(this.customer.info),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.customerService.editCustomer({...this.form.value, id: this.customer.id})
        .subscribe(customer => this.customerEditted.next(customer));
    }
  }
}
