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
    @Inject(MAT_DIALOG_DATA) public data: { work?: WorkModel, startDate?: Date },
  ) { }

  ngOnInit() {
  }

}
