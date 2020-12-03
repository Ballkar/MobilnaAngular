import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerModel } from '../../customers/customer.model';
import { MessageModel, MessageSchemaModel } from '../message.model';

@Component({
  selector: 'app-init-message-popup',
  templateUrl: './init-message-popup.component.html',
  styleUrls: ['./init-message-popup.component.scss']
})
export class InitMessagePopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InitMessagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {schema?: MessageSchemaModel, customer?: CustomerModel},
  ) { }

  ngOnInit() {
  }

  close(message: MessageModel) {
    this.dialogRef.close(message);
  }
}
