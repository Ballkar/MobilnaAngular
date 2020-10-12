import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectorRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { BaseConfigInterface, MainCalendarService } from '../main-calendar.service';
import { EventModel } from '../event.model';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss'],
})
export class MainCalendarComponent implements OnInit, OnDestroy {
  private dateFormat = 'YYYY-M-D H:m:s';
  private destroy$ = new Subject();
  daysInWeek: number;
  configData: BaseConfigInterface = this.calendarService.baseConfig;
  events: CalendarEvent<{id: number}>[];

  @Input() updatingState$: Observable<boolean>;
  @Input() set eventsData(data: EventModel<{id: number}>[]) {
    this.events = data.map(el => ({
      start: moment(el.start, this.dateFormat).toDate(),
      end: moment(el.stop, this.dateFormat).toDate(),
      title: `${el.title} <br> ${moment(el.start, this.dateFormat).format('H:mm')}-${moment(el.stop, this.dateFormat).format('H:mm')}`,
      meta: el.data,
      color: el.state,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }));
  }

  @Output() emptyHourClicked: EventEmitter<Date> = new EventEmitter();
  @Output() eventClicked: EventEmitter<EventModel<{id: number}>> = new EventEmitter();
  @Output() eventTimeChanged: EventEmitter<{data: {id: number}, start: Date, end: Date}> = new EventEmitter();
  constructor(
    private calendarService: MainCalendarService,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.breakpointObserver.observe(Object.values(this.calendarService.responsives).map(({ breakpoint }) => breakpoint))
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(this.calendarService.responsives).find(
          ({ breakpoint }) => !!state.breakpoints[breakpoint]
        );
        if (foundBreakpoint) {
          this.daysInWeek = foundBreakpoint.daysInWeek;
        } else {
          this.daysInWeek = 7;
        }
        this.cd.markForCheck();
      }
    );
  }

  log(data) {
    console.log(data);
  }

  onEmptyHourClicked(data: {date: Date}) {
    this.emptyHourClicked.emit(data.date);
  }

  onEventClicked(data: { event: EventModel<{id: number}>, sourceEvent: any }) {
    // tslint:disable-next-line: no-string-literal
    this.eventClicked.emit(data.event['meta']);
  }

  onChangeEventTime(eventTimeChange: CalendarEventTimesChangedEvent<{id: number}>): void {
    const { event, newStart, newEnd } = eventTimeChange;
    this.eventTimeChanged.next({
      start: newStart,
      end: newEnd,
      data: event.meta,
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
