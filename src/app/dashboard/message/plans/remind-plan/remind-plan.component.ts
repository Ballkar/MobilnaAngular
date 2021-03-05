import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SnotifyService } from 'ng-snotify';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { RemindPlanModel } from '../models/remindPlan.model';
import { RemindPlanPopupComponent } from './remind-plan-popup/remind-plan-popup.component';
import { RemindPlanService } from './remind-plan.service';

@Component({
  selector: 'app-remind-plan',
  templateUrl: './remind-plan.component.html',
  styleUrls: ['./remind-plan.component.scss']
})
export class RemindPlanComponent implements OnInit {
  @Input() plan: RemindPlanModel;
  isLoading = false;
  constructor(
    private remindPlanService: RemindPlanService,
    private notifierService: SnotifyService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  openDetails() {
    const ref = this.dialog.open(RemindPlanPopupComponent, { data: this.plan });
    ref.afterClosed().pipe(
      filter((plan: RemindPlanModel) => !!plan)
    ).subscribe((plan) => console.log(plan));
  }

  changeActivness() {
    this.plan.active = !this.plan.active;
    const notification = this.plan.active ? 'Plan aktywowany' : 'Plan wyłączony';
    this.isLoading = true;
    this.remindPlanService.updatePlan(this.plan).pipe(
      tap(console.log),
      tap({ complete: () => this.isLoading = false }),
    ).subscribe(
      () => this.notifierService.success(notification),
      () => this.notifierService.error('Błąd podczas zmiany w planie')
    );
  }
}
