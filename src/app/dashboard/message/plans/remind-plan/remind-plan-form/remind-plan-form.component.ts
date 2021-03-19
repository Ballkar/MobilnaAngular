import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { RemindPlanPreviewComponent } from '../remind-plan-preview/remind-plan-preview.component';
import { RemindPlanModel, TIMETYPES } from '../models/remindPlan.model';
import { filter, map, tap } from 'rxjs/operators';
import { CustomerModel } from 'src/app/dashboard/customers/customer.model';
import { UserService } from 'src/app/dashboard/user/user.service';
import { TutorialService } from 'src/app/dashboard/services/tutorial.service';

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
  private customerSelected: CustomerModel;

  constructor(
    private notificationService: SnotifyService,
    private dialog: MatDialog,
    private authService: UserService,
    private tutorialService: TutorialService,
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

    if(!this.authService.loggedUser.tutorials.includes(this.tutorialService.messageDetailTour.tourId)) {
      setTimeout(() => this.tutorialService.startMessageDetailTutorial(), 800);
    }
  }

  preview() {
    if (this.form.invalid) {
      this.notificationService.error('Błąd w formularzu');
      return;
    }
    const ref = this.dialog.open(RemindPlanPreviewComponent, { data: { plan: {...this.form.value}, customer: this.customerSelected } });

    ref.afterClosed().pipe(
      map(() => ref.componentInstance.customerCtrl.value),
    ).subscribe((customer) => this.customerSelected = customer);
  }

  onSubmit() {
    if(this.form.invalid) {
      this.notificationService.error('Błąd w formularzu');
      return;
    }

    this.emitPlan.emit(this.form.value);

  }
}
