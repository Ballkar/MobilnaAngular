import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmPopupComponentData {
  text: string;
  subtitle: string;
  confirm?: string;
  cancel?: string;
}

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmPopupComponentData,
  ) { }

  ngOnInit() {
    this.data.confirm = this.data.confirm ? this.data.confirm : 'Tak';
    this.data.cancel = this.data.cancel ? this.data.cancel : 'Nie';
  }

  agree() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
