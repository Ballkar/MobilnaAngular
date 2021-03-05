import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SnotifyService } from 'ng-snotify';
import { filter } from 'rxjs/operators';
import { MessageSchemaModel } from '../../../message.model';
import { RemindPlanPreviewComponent } from '../remind-plan-preview/remind-plan-preview.component';
import { RemindPlanModel, TIMETYPES } from '../../models/remindPlan.model';

@Component({
  selector: 'app-remind-plan-form',
  templateUrl: './remind-plan-form.component.html',
  styleUrls: ['./remind-plan-form.component.scss']
})
export class RemindPlanFormComponent implements OnInit {

  @Input() plan: RemindPlanModel;
  @Output() emitPlan: EventEmitter<RemindPlanModel> = new EventEmitter();
  isLocked = false;
  TIMETYPES = TIMETYPES;
  form: FormGroup;
  get bodyCtrl() { return this.form.get('body') as FormControl; }
  get clearDiacriticsCtrl() { return this.form.get('clear_diacritics') as FormControl; }
  get timeTypeCtrl() { return this.form.get('time_type') as FormControl; }
  get activeCtrl() { return this.form.get('active') as FormControl; }
  get hourCtrl() { return this.form.get('hour') as FormControl; }
  get minuteCtrl() { return this.form.get('minute') as FormControl; }

  constructor(
    private notificationService: SnotifyService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      body: new FormControl(this.plan.body, Validators.required),
      clear_diacritics: new FormControl(this.plan.clear_diacritics || true, Validators.required),
      time_type: new FormControl(this.plan.time_type, Validators.required),
      active: new FormControl(this.plan.active, Validators.required),
      hour: new FormControl(this.plan.hour, Validators.required),
      minute: new FormControl(this.plan.minute, Validators.required),

    });
  }

  preview() {
    this.dialog.open(RemindPlanPreviewComponent, { data: {...this.form.value} });
  }

  onSubmit() {
    if(this.form.invalid) {
      this.notificationService.error('Błąd w formularzu');
      return;
    }

    this.emitPlan.emit(this.form.value);

  }
}
