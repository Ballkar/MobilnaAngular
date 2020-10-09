import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Data } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { EventModel } from '../../main-calendar/event.model';
import { WorkPopupComponentComponent } from '../work-popup-component/work-popup-component.component';
import { WorkModel } from '../work.model';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  events: EventModel<WorkModel>[];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private workService: WorkService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.isLoading$.next(true);
    this.workService.getWorks(moment().toDate(), moment().add(3, 'days').toDate()).pipe(
      map(works => works.map(work => this.mapWorkToEvent(work))),
      tap(() => this.isLoading$.next(false)),
    ).subscribe(res => this.events = res);
  }

  addWorkOnDate(startDate: Data) {
    this.dialog.open(WorkPopupComponentComponent, { data: {startDate} });
  }

  workClicked(work: WorkModel) {
    this.dialog.open(WorkPopupComponentComponent, { data: {work} });
  }

  changeTimeOfWork(event: {
    start: Date,
    end: Date,
    data: WorkModel,
  }) {
    this.isUpdating$.next(true);
    const { data } = event;
    const startDate = moment(event.start).format('YYYY-M-D H:m:s');
    const endDate = moment(event.end).format('YYYY-M-D H:m:s');
    this.workService.editWork({...data, start: startDate, stop: endDate}).pipe(
      delay(5000),
      tap(() => this.isUpdating$.next(false)),
    ).subscribe(edittedWork => this.replaceElement(edittedWork));
  }

  private replaceElement(newWork: WorkModel) {
    const index = this.events.map(e => e.data.id).indexOf(newWork.id);

    if (index !== -1) {
      this.events[index] = this.mapWorkToEvent(newWork);
      this.events = this.events;
    }
  }

  private mapWorkToEvent(work: WorkModel): EventModel<WorkModel> {
    const event: EventModel<WorkModel> = {
      start: work.start,
      stop: work.stop,
      title: `${work.customer.name} ${work.customer.surname}`,
      state: this.workService.clientState,
      data: work,
    };

    return event;
  }
}
