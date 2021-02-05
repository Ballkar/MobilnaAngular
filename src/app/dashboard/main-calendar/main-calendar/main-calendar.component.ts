import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectorRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { BaseConfigInterface, MainCalendarService } from '../main-calendar.service';
import { EventMainCalendar } from '../eventMainCalendar.model';
import { ItemModel } from '../item.model';
import { DateInMainCalendar } from '../DateInMainCalendar';
@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss'],
})
export class MainCalendarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  daysInWeek: number;
  configData: BaseConfigInterface = this.calendarService.baseConfig;
  events: CalendarEvent<ItemModel>[];

  @Input() updatingState$: Observable<boolean>;
  @Input() set eventsData(data: EventMainCalendar<ItemModel>[]) {
    if (!data) { return; }
    this.events = data.map(el => (this.calendarService.mapEventsToInnerModel(el)));
  }

  @Output() dateDisplayedChanged: EventEmitter<DateInMainCalendar> = new EventEmitter();

  @Output() emptyHourClicked: EventEmitter<Date> = new EventEmitter();
  @Output() eventClicked: EventEmitter<EventMainCalendar<ItemModel>> = new EventEmitter();
  @Output() eventTimeChanged: EventEmitter<EventMainCalendar<ItemModel>> = new EventEmitter();
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

  changeDateDisplayed() {
    this.dateDisplayedChanged.emit({
      startDate: moment(this.configData.actualDate, this.calendarService.dateFormat)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toDate(),
      endDate: moment(this.configData.actualDate, this.calendarService.dateFormat)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .add(this.daysInWeek, 'days')
        .toDate()
    });
  }

  onEmptyHourClicked(data: { date: Date }) {
    this.emptyHourClicked.emit(data.date);
  }

  onEventClicked(data: { event: CalendarEvent<ItemModel>, sourceEvent: any }) {
    this.eventClicked.emit(this.calendarService.mapEventsToOutputModel(data.event));
  }

  onChangeEventTime(timeChanged: CalendarEventTimesChangedEvent<ItemModel>): void {
    const start = timeChanged.newStart;
    const end = timeChanged.newEnd;
    const eventAfterChange: CalendarEvent<ItemModel> = {...timeChanged.event, end, start };

    const eventToEmit: EventMainCalendar<ItemModel> = this.calendarService.mapEventsToOutputModel(eventAfterChange);
    this.eventTimeChanged.next(eventToEmit);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
