import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerModel } from '../customer.model';

@Component({
  selector: 'app-edit-customer-popup',
  templateUrl: './edit-customer-popup.component.html',
  styleUrls: ['./edit-customer-popup.component.scss']
})
export class EditCustomerPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditCustomerPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: CustomerModel,
  ) { }

  ngOnInit() {
  }

  close(customer: CustomerModel) {
    this.dialogRef.close(customer);
  }
}
