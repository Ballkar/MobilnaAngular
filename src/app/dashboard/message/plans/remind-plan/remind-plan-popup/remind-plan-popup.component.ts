import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RemindPlanModel } from '../../models/remindPlan.model';

@Component({
  selector: 'app-remind-plan-popup',
  templateUrl: './remind-plan-popup.component.html',
  styleUrls: ['./remind-plan-popup.component.scss']
})
export class RemindPlanPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RemindPlanPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RemindPlanModel,
  ) { }

  ngOnInit() {
  }

  catchPlan(plan: RemindPlanModel) {
    this.dialogRef.close(plan);
  }
}
