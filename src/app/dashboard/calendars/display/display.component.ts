import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import localePL from '@angular/common/locales/pl';
import * as moment from 'moment';

registerLocaleData(localePL);
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  daysInWeek: number;
  locale = 'pl';
  private destroy$ = new Subject();
  dayStartHour = 8;
  dayStartMinute = 0;
  hourSegments = 4;
  dayEndHour = 19;
  dayEndMinute = 0;
  precision = 'minutes';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  colors: any = {
    client: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
  };
  private dateFormat = 'YYYY-M-D H:m:s';
  events: CalendarEvent<{id: number}>[] = [
    {
      start: moment('2020-10-9 10:00:00', this.dateFormat).toDate(),
      end: moment('2020-10-9 10:00:00', this.dateFormat).add(90, 'minutes').toDate(),
      title: 'Klientka',
      color: this.colors.client,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      meta: {id: 0}
    },
  ];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 576px)',
        daysInWeek: 2,
      },
      medium: {
        breakpoint: '(max-width: 768px)',
        daysInWeek: 3,
      },
      large: {
        breakpoint: '(max-width: 960px)',
        daysInWeek: 5,
      },
    };
    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({ breakpoint }) => breakpoint)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
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

  handleEvent(action: string, event: CalendarEvent): void {
    console.log({action, event});
  }

  log(data) {
    console.log(data);
  }

  eventTimesChanged(eventTimeChange: CalendarEventTimesChangedEvent): void {
    const { event, newStart, newEnd } = eventTimeChange;
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.log('zmiana godziny');
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
