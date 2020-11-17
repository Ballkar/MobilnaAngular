import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.scss']
})
export class SettingsPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SettingsPopupComponent>,
    // @Inject(MAT_DIALOG_DATA) public message: MessageModel,
  ) { }

  ngOnInit() {
  }

  close(data) {
    this.dialogRef.close(data);
  }
}
