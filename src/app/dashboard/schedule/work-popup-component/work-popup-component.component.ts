import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { WorkModel } from '../work.model';

@Component({
  selector: 'app-work-popup-component',
  templateUrl: './work-popup-component.component.html',
  styleUrls: ['./work-popup-component.component.scss']
})
export class WorkPopupComponentComponent implements OnInit {

  isOldWork = false;
  constructor(
    public dialogRef: MatDialogRef<WorkPopupComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkModel,
  ) { }

  ngOnInit() {
    if(this.data) {
      this.isOldWork = moment(this.data.start, 'YYYY-MM-DD HH:mm:ss').isBefore();
    }
  }

  close(work: WorkModel, state: 'delete' | 'edit' | 'add') {
    this.dialogRef.close({work, state});
  }
}
