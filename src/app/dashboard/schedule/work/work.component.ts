import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Data } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';
import { DateInMainCalendar } from '../../main-calendar/DateInMainCalendar';
import { EventMainCalendar } from '../../main-calendar/eventMainCalendar.model';
import { WorkPopupComponentComponent } from '../work-popup-component/work-popup-component.component';
import { WorkModel } from '../work.model';
import { WorkService } from '../work.service';
import { cloneDeep } from 'lodash';
import { LabelModel } from '../label.model';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  dataHaveBeenChanged = false;
  dateFormat = 'YYYY-M-D H:m:s';
  workEvents: EventMainCalendar<WorkModel>[];
  date: DateInMainCalendar;
  isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  labelsChosen: LabelModel[] = [];
  private worksFromApi: WorkModel[];
  constructor(
    private labelService: LabelService,
    private workService: WorkService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.date = {
      startDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toDate(),
      endDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add(7, 'days').toDate(),
    };
    this.getWorks();
  }

  getWorks() {
    this.isUpdating$.next(true);
    this.workService.getWorks(this.date.startDate, this.date.endDate, this.labelsChosen).pipe(
      tap((works) => this.worksFromApi = cloneDeep(works)),
      tap(() => this.dataHaveBeenChanged = false),
      map(works => works.map(work => this.mapWorkToEvent(work))),
      tap(() => this.isUpdating$.next(false)),
    ).subscribe(res => this.workEvents = res);
  }

  addWorkOnDate(startDate: Data) {
    const work = this.labelsChosen.length === 1 ? { label: this.labelsChosen[0] } : null;
    const ref = this.dialog.open(WorkPopupComponentComponent, { data: { startDate, work } });
    ref.afterClosed().pipe(
      filter(data => !!data),
    ).subscribe(() => this.getWorks());
  }

  workClicked(event: EventMainCalendar<WorkModel>) {
    const work: WorkModel = event.data;
    const ref = this.dialog.open(WorkPopupComponentComponent, { data: { work } });
    ref.afterClosed().pipe(
      filter(data => !!data),
      tap(edittedWork => this.replaceElement(edittedWork)),
    ).subscribe();
  }

  catchChangeLabels(labels: LabelModel[]) {
    this.labelsChosen = labels;
    this.getWorks();
  }

  changeTimeOfWork(event: EventMainCalendar<WorkModel>) {
    const { data: work } = event;
    work.start = event.start;
    work.stop = event.stop;
    this.replaceElement(work);
  }

  saveActualWorks() {
    this.isUpdating$.next(true);
    const works: WorkModel[] = this.workEvents.map(event => event.data);
    this.workService.saveManyWorks(works).pipe(
      // tap(edittedWork => this.replaceElement(edittedWork)),
    ).subscribe(() => this.getWorks());
  }

  resetActualWorks() {
    this.dataHaveBeenChanged = false;
    const worksEventsRemembered = this.worksFromApi.map(work => this.mapWorkToEvent(work));
    this.workEvents = cloneDeep(worksEventsRemembered);
  }

  changeDate(data: DateInMainCalendar) {
    this.date = data;
    this.getWorks();
  }

  private replaceElement(newWork: WorkModel) {
    this.dataHaveBeenChanged = true;
    const index = this.workEvents.map(e => e.data.id).indexOf(newWork.id);

    if (index !== -1) {
      this.workEvents[index] = this.mapWorkToEvent(newWork);
      this.workEvents = [...this.workEvents];
    }
  }

  private removeElement(workToRemove: WorkModel) {
    const index = this.workEvents.map(e => e.data.id).indexOf(workToRemove.id);

    if (index !== -1) {
      this.workEvents.splice(index, 1);
    }
  }

  private mapWorkToEvent(work: WorkModel): EventMainCalendar<WorkModel> {
    const event: EventMainCalendar<WorkModel> = {
      start: work.start,
      stop: work.stop,
      // tslint:disable-next-line: max-line-length
      title: `${work.customer.name} ${work.customer.surname} <br> ${moment(work.start, this.dateFormat).format('H:mm')}-${moment(work.stop, this.dateFormat).format('H:mm')}`,
      color: work.label ? work.label.color : this.labelService.voidLabelColor,
      data: work,
    };

    return event;
  }
}
