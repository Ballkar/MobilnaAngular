import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessagePlan } from '../../message.model';

@Component({
  selector: 'app-plan-popup',
  templateUrl: './plan-popup.component.html',
  styleUrls: ['./plan-popup.component.scss']
})
export class PlanPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PlanPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {plan: MessagePlan, ableToRemove: boolean},
  ) { }

  ngOnInit() {
  }

  close(plan: MessagePlan) {
    this.dialogRef.close(plan);
  }
}
