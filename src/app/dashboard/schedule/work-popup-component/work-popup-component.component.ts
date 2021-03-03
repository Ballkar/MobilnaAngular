import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { WorkModel } from '../work.model';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-popup-component',
  templateUrl: './work-popup-component.component.html',
  styleUrls: ['./work-popup-component.component.scss']
})
export class WorkPopupComponentComponent implements OnInit {
  isOldWork = false;
  constructor(
    public workService: WorkService,
    public dialogRef: MatDialogRef<WorkPopupComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkModel,
  ) { }

  ngOnInit() {
    if(this.data) {
      this.isOldWork = moment(this.data.start, 'YYYY-MM-DD HH:mm:ss').isBefore();
    }
  }

  catchWorkEmitted(work: WorkModel) {
    const state = this.data && this.data.id ? 'edit' : 'add';
    this.dialogRef.close({work, state });
  }

  catchRemove() {
    this.dialogRef.close({work: this.data, state: 'delete'});
  }
}
