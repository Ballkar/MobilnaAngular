import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageModel } from '../message.model';

@Component({
  selector: 'app-create-message-popup',
  templateUrl: './create-message-popup.component.html',
  styleUrls: ['./create-message-popup.component.scss']
})
export class CreateMessagePopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateMessagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public message: MessageModel,
  ) { }

  ngOnInit() {
  }

  close(message: MessageModel) {
    this.dialogRef.close(message);
  }
}
