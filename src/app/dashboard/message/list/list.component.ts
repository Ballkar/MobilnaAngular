import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, filter, debounceTime } from 'rxjs/operators';
import { DataResponse } from 'src/app/shared/model/response.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { DisplayMessageComponent } from '../display-message/display-message.component';
import { InitMessageComponent } from '../init-message/init-message.component';
import { MessageModel } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  searchCtrl: FormControl = new FormControl();
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
    private messageService: MessageService,
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

    this.messages$ = this.messageService.getMessages(pagination, query).pipe(
      tap(() => this.isLoading$.next(false)),
      tap(res => this.pagination = this.helperService.mapApiPaginationToMaterialEvent(res.pagination)),
    );
  }

  initChat(message: MessageModel) {

    const ref = this.dialog.open(InitMessageComponent, {});
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
