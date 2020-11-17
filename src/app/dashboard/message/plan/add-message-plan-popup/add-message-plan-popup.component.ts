import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-message-plan-popup',
  templateUrl: './add-message-plan-popup.component.html',
  styleUrls: ['./add-message-plan-popup.component.scss']
})
export class AddMessagePlanPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddMessagePlanPopupComponent>,
    // @Inject(MAT_DIALOG_DATA) public message: MessageModel,
  ) { }

  ngOnInit() {
  }

  close(data) {
    this.dialogRef.close(data);
  }
}
