import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerModel } from '../customer.model';

@Component({
  selector: 'app-customer-popup',
  templateUrl: './customer-popup.component.html',
  styleUrls: ['./customer-popup.component.scss']
})
export class CustomerPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CustomerPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: CustomerModel,
  ) { }

  ngOnInit() {
  }

  catchCustomer(customer: CustomerModel) {
    this.dialogRef.close(customer);
  }

  close() {
    this.dialogRef.close(true);
  }
}
