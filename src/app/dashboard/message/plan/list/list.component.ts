import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataResponse } from 'src/app/shared/model/response.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { DisplayMessageComponent } from '../../history/display-message/display-message.component';
import { MessageModel, MessagePlan } from '../../message.model';
import { PlanPopupComponent } from '../plan-popup/plan-popup.component';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  initPagination: PaginationEvent = {
    length: 5,
    pageIndex: 0,
    pageSize: 3,
    previousPageIndex: null
  };
  pagination: PaginationEvent;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  plans$: Observable<DataResponse<MessagePlan>>;
  constructor(
    private dialog: MatDialog,
    private planService: PlanService,
    private helperService: HelperService,
  ) { }

  ngOnInit() {
    this.getPlans();
  }

  getPlans(pagination?: PaginationEvent) {
    this.isLoading$.next(true);

    this.plans$ = this.planService.getPlans(pagination).pipe(
      tap(() => this.isLoading$.next(false)),
      tap(res => this.pagination = this.helperService.mapApiPaginationToMaterialEvent(res.pagination)),
    );
  }

  addPlan() {

    // const ref = this.dialog.open(InitMessagePopupComponent, {});
    // ref.afterClosed().pipe(
    //   filter((data: MessageModel) => !!data)
    // ).subscribe(() => this.getPlans());
  }

  select(plan: MessagePlan) {
    this.dialog.open(PlanPopupComponent, {data: plan});
  }

  changePage(event: PaginationEvent) {
    this.getPlans(event);
  }
}
