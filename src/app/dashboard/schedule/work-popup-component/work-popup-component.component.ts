import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WorkModel } from '../work.model';

@Component({
  selector: 'app-work-popup-component',
  templateUrl: './work-popup-component.component.html',
  styleUrls: ['./work-popup-component.component.scss']
})
export class WorkPopupComponentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WorkPopupComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkModel,
  ) { }

  ngOnInit() {
    console.log(this.data);

  }

  close(work: WorkModel, state: 'delete' | 'edit' | 'add') {
    this.dialogRef.close({work, state});
  }
}
