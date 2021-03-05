import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RemindPlanModel, TIMETYPES } from '../../models/remindPlan.model';

@Component({
  selector: 'app-remind-plan-form',
  templateUrl: './remind-plan-form.component.html',
  styleUrls: ['./remind-plan-form.component.scss']
})
export class RemindPlanFormComponent implements OnInit {

  @Input() plan: RemindPlanModel;
  isLocked = false;
  TIMETYPES = TIMETYPES;
  form: FormGroup;
  get bodyCtrl() { return this.form.get('body') as FormControl; }
  get clearDiacriticsCtrl() { return this.form.get('clearDiacritics') as FormControl; }
  get timeTypeCtrl() { return this.form.get('timeType') as FormControl; }
  get activeCtrl() { return this.form.get('active') as FormControl; }
  get hourCtrl() { return this.form.get('hour') as FormControl; }
  get minuteCtrl() { return this.form.get('minute') as FormControl; }
  constructor() { }

  ngOnInit() {
    console.log(this.plan);

    this.form = new FormGroup({
      body: new FormControl(this.plan.body, Validators.required),
      clearDiacritics: new FormControl(this.plan.clearDiacritics, Validators.required),
      timeType: new FormControl(this.plan.timeType, Validators.required),
      active: new FormControl(this.plan.active, Validators.required),
      hour: new FormControl(this.plan.hour, Validators.required),
      minute: new FormControl(this.plan.minute, Validators.required),

    });
  }

  onSubmit() {

  }
}
