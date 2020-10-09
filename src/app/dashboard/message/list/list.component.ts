import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, filter, debounceTime } from 'rxjs/operators';
import { AddCustomerPopupComponent } from '../../customers/add-customer-popup/add-customer-popup.component';
import { EditCustomerPopupComponent } from '../../customers/edit-customer-popup/edit-customer-popup.component';
import { CreateMessagePopupComponent } from '../create-message-popup/create-message-popup.component';
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
  messages$: Observable<MessageModel[]>;
  constructor(
    private dialog: MatDialog,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getMessages();
    this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(console.log);
  }

  getMessages(pagination?: PaginationEvent) {
    this.isLoading$.next(true);
    pagination = pagination ? pagination : this.initPagination;
    this.pagination = pagination;
    this.messages$ = this.messageService.getMessages(pagination).pipe(
      tap(() => this.isLoading$.next(false)),
    );
  }

  initChat(message: MessageModel) {

  }

  select(message: MessageModel) {

  }

  edit(message: MessageModel) {
    const ref = this.dialog.open(CreateMessagePopupComponent, {data: message});
    ref.afterClosed().pipe(
      filter((messageEditted: MessageModel) => !!messageEditted)
    ).subscribe(() => this.getMessages());
  }

  remove(message: MessageModel) {

  }

  add() {
    const ref = this.dialog.open(CreateMessagePopupComponent, {});
    ref.afterClosed().pipe(
      filter((message: MessageModel) => !!message)
    ).subscribe(() => this.getMessages());
  }

  changePage(event: PaginationEvent) {
    this.getMessages(event);
  }
}
