import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { DateInMainCalendar } from '../../main-calendar/DateInMainCalendar';
import { EventMainCalendar } from '../../main-calendar/eventMainCalendar.model';
import { WorkPopupComponentComponent } from '../work-popup-component/work-popup-component.component';
import { WorkModel } from '../work.model';
import { WorkService } from '../work.service';
import { cloneDeep, differenceWith, isEqual } from 'lodash';
import { WorkerModel } from '../../workers/worker.model';
import { SnotifyService } from 'ng-snotify';
import { TutorialService } from '../../services/tutorial.service';
import { UserService } from '../../user/user.service';
import { SidebarService } from '../../services/sidebar.service';
import { WorkerChooseComponent } from '../../workers/worker-choose/worker-choose.component';
import { WorkerService } from '../../workers/worker.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  @ViewChild('workerChoose') workerChooseComponent: WorkerChooseComponent;
  dataHaveBeenChanged = false;
  dateFormat = 'YYYY-M-D H:m:s';
  workEvents: EventMainCalendar<WorkModel>[];
  date: DateInMainCalendar;
  isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  workersChosen: WorkerModel[] = [];
  private worksFromApi: WorkModel[];
  constructor(
    private notifyService: SnotifyService,
    private workerService: WorkerService,
    private workService: WorkService,
    private dialog: MatDialog,
    private authService: UserService,
    private tutorialService: TutorialService,
    private sidebarService: SidebarService,
  ) { }

  ngOnInit() {
    this.date = {
      startDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toDate(),
      endDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add(7, 'days').toDate(),
    };
    this.workersChosen = this.workerService.workers$.getValue();

    if(!this.authService.loggedUser.tutorials.includes(this.tutorialService.scheduleTour.tourId)) {
      setTimeout(() => this.sidebarService.open ? this.sidebarService.toggle() : null, 100);
      setTimeout(() => this.tutorialService.startScheduleTutorial(), 800);
    }
  }

  getWorks(workers: WorkerModel[]) {
    this.isUpdating$.next(true);
    this.workService.getWorks(this.date.startDate, this.date.endDate, workers).pipe(
      tap((works) => this.worksFromApi = cloneDeep(works)),
      tap(() => this.dataHaveBeenChanged = false),
      map(works => works.map(work => this.mapWorkToEvent(work))),
      tap(() => this.isUpdating$.next(false)),
    ).subscribe(res => this.workEvents = res);
  }

  addWorkOnDate(startDate: Data) {
    if(moment(startDate).isBefore()) {
      this.notifyService.error('Wizyta musi odbyć się w przyszłości');
      return;
    }
    const work = {
      start: startDate,
      worker: this.workersChosen.length === 1 ? this.workersChosen[0] : null,
    };
    const ref = this.dialog.open(WorkPopupComponentComponent, { data: work });
    ref.afterClosed().pipe(
      filter(data => !!data),
      switchMap(data => this.reactOnWorkFormClosed(data.work, data.state)),
    ).subscribe();
  }

  workClicked(event: EventMainCalendar<WorkModel>) {
    const work: WorkModel = event.data;
    const ref = this.dialog.open(WorkPopupComponentComponent, { data: work });
    ref.afterClosed().pipe(
      filter(data => !!data),
      switchMap(data => this.reactOnWorkFormClosed(data.work, data.state)),
    ).subscribe();
  }

  catchChangeWorkers(workers: WorkerModel[]) {
    this.workersChosen = workers;
    this.getWorks(this.workersChosen);
  }

  changeTimeOfWork(event: EventMainCalendar<WorkModel>) {
    const { data: work } = event;
    if(moment(event.start).isBefore()) {
      this.notifyService.error('Wizyta musi odbyć się w przyszłości!');
      return;
    }

    work.start = event.start;
    work.stop = event.stop;
    this.replaceElement(work);
  }

  saveActualWorks() {
    this.isUpdating$.next(true);
    const works: WorkModel[] = this.workEvents.map(event => event.data);
    const changedWorks = differenceWith(works, this.worksFromApi, isEqual);

    this.workService.saveManyWorks(changedWorks).pipe(
      tap(() => this.notifyService.success('Kalendarz został zaaktualizowany!')),
    ).subscribe(() => this.getWorks(this.workersChosen));
  }

  resetActualWorks() {
    this.dataHaveBeenChanged = false;
    const worksEventsRemembered = this.worksFromApi.map(work => this.mapWorkToEvent(work));
    this.workEvents = cloneDeep(worksEventsRemembered);
  }

  changeDateDisplayed(data: DateInMainCalendar) {
    this.date = data;
    this.getWorks(this.workersChosen);
  }

  private reactOnWorkFormClosed(work: WorkModel, state: 'add' | 'edit' | 'delete'): Observable<WorkModel> {
    this.isUpdating$.next(true);
    if(state === 'edit') {
      this.replaceElement(work);
      return of(work).pipe(
        tap(() => this.isUpdating$.next(false)),
      );
    } else if(state === 'delete') {
      return this.workService.removeWork(work).pipe(
        map(() => work),
        tap(() => this.getWorks(this.workersChosen)),
        tap(() => this.notifyService.success('Wizyta została usunięta!')),
      );
    } else if(state === 'add') {
      return this.workService.saveWork(work).pipe(
        tap(() => this.getWorks(this.workersChosen)),
        tap(() => this.notifyService.success('Wizyta została dodana!')),
      );
    }
  }

  private replaceElement(newWork: WorkModel) {
    this.dataHaveBeenChanged = true;
    const index = this.workEvents.map(e => e.data.id).indexOf(newWork.id);

    if (index !== -1) {
      this.workEvents[index] = this.mapWorkToEvent(newWork);
      this.workEvents = [...this.workEvents];
    }
  }

  private mapWorkToEvent(work: WorkModel): EventMainCalendar<WorkModel> {
    const event: EventMainCalendar<WorkModel> = {
      start: work.start,
      stop: work.stop,
      // tslint:disable-next-line: max-line-length
      title: `${work.customer.name} ${work.customer.surname} <br> ${moment(work.start, this.dateFormat).format('H:mm')}-${moment(work.stop, this.dateFormat).format('H:mm')}`,
      color: work.worker ? work.worker.color : this.workerService.voidWorkerColor,
      data: work,
      draggable: moment(work.start, this.dateFormat).isAfter()
    };

    return event;
  }
}
