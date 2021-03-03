import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { DataResponse } from 'src/app/shared/model/response.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { NotificationService } from './notification.service';
import { NotificationModel } from './NotificationModel.model';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.scss']
})
export class NotificationMenuComponent implements OnInit {

  pagination: PaginationEvent;
  notifications: NotificationModel[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor(
    private notificationService: NotificationService,
    private helperService: HelperService,
  ) { }

  ngOnInit() {
    this.getNotification();
  }

  getNotification(pagination?: PaginationEvent) {
    this.isLoading$.next(true);
    this.notificationService.getNotifications(pagination).pipe(
      tap(() => this.isLoading$.next(false)),
      tap(res => this.pagination = this.helperService.mapApiPaginationToMaterialEvent(res.pagination)),
    ).subscribe(res => this.notifications = [...this.notifications, ...res.items]);
  }
}
