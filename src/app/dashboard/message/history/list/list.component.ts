import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, filter, debounceTime } from 'rxjs/operators';
import { PaginationEvent } from 'src/app/shared/model/paginationEvent.model';
import { DataResponse } from 'src/app/shared/model/response.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { InitMessagePopupComponent } from '../../init-message-popup/init-message-popup.component';
import { MessageModel } from '../../message.model';
import { DisplayMessageComponent } from '../display-message/display-message.component';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl()
  });
  get searchCtrl() { return this.searchForm.get('search') as FormControl; }
  initPagination: PaginationEvent = {
    length: 5,
    pageIndex: 0,
    pageSize: 3,
    previousPageIndex: null
  };
  pagination: PaginationEvent;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  messages$: Observable<DataResponse<MessageModel>>;
  constructor(
    private dialog: MatDialog,
    private historyService: HistoryService,
    private helperService: HelperService,
  ) { }

  ngOnInit() {
    this.getMessages();
    this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(query => this.getMessages(null, query));
  }

  getMessages(pagination?: PaginationEvent, query?: string) {
    this.isLoading$.next(true);

    this.messages$ = this.historyService.getMessages(pagination, query).pipe(
      tap(() => this.isLoading$.next(false)),
      tap(res => this.pagination = this.helperService.mapApiPaginationToMaterialEvent(res.pagination)),
    );
  }

  initChat() {

    const ref = this.dialog.open(InitMessagePopupComponent, {data: {}});
    ref.afterClosed().pipe(
      filter((data: MessageModel) => !!data)
    ).subscribe(() => this.getMessages());
  }

  select(message: MessageModel) {
    this.dialog.open(DisplayMessageComponent, {data: message});
  }

  changePage(event: PaginationEvent) {
    this.getMessages(event);
  }
}
