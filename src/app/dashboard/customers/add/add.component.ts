import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { CustomerModel } from '../customer.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    info: new FormControl(''),
  });
  get nameCtrl() { return this.form.get('name') as FormControl; }
  get surnameCtrl() { return this.form.get('surname') as FormControl; }
  get phoneCtrl() { return this.form.get('phone') as FormControl; }
  get infoCtrl() { return this.form.get('info') as FormControl; }

  @Output() customerAdded = new EventEmitter<CustomerModel>();
  constructor(
    private customerService: CustomersService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.customerService.saveCustomer(this.form.value).subscribe(customer => this.customerAdded.next(customer));
    }
  }
}
