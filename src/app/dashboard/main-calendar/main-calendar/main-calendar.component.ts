import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectorRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { BaseConfigInterface, MainCalendarService } from '../main-calendar.service';
import { EventModel } from '../event.model';
import { ItemModel } from '../item.model';

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
  @Input() set eventsData(data: EventModel<ItemModel>[]) {
    this.events = data.map(el => (this.calendarService.mapEventsToInnerModel(el)));
  }

  @Output() changeDate: EventEmitter<{ startDate: Date, endDate: Date }> = new EventEmitter();
  @Output() emptyHourClicked: EventEmitter<Date> = new EventEmitter();
  @Output() eventClicked: EventEmitter<EventModel<ItemModel>> = new EventEmitter();
  @Output() eventTimeChanged: EventEmitter<{ data: ItemModel, start: Date, end: Date }> = new EventEmitter();
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
    this.changeDate.emit({
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

  onChangeEventTime(eventTimeChange: CalendarEventTimesChangedEvent<ItemModel>): void {
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
