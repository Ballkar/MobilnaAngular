import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CustomerModel } from '../customer.model';

@Component({
  selector: 'app-add-customer-popup',
  templateUrl: './add-customer-popup.component.html',
  styleUrls: ['./add-customer-popup.component.scss']
})
export class AddCustomerPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddCustomerPopupComponent>,
  ) { }

  ngOnInit() {
  }

  close(customer: CustomerModel) {
    this.dialogRef.close(customer);
  }
}
