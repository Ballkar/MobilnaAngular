import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { BaseConfigInterface, MainCalendarService } from '../main-calendar.service';
import { EventModel } from '../event.model';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss']
})
export class MainCalendarComponent implements OnInit, OnDestroy {
  private dateFormat = 'YYYY-M-D H:m:s';
  private destroy$ = new Subject();
  daysInWeek: number;
  configData: BaseConfigInterface = this.calendarService.baseConfig;
  events: CalendarEvent<{id: number}>[];

  @Input() set eventsData(data: EventModel<{id: number}>[]) {
    this.events = data.map(el => ({
      start: moment(el.start, this.dateFormat).toDate(),
      end: moment(el.stop, this.dateFormat).toDate(),
      title: el.title,
      meta: el.data,
      color: el.state,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }));
  }
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
