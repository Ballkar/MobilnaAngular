import { Injectable } from '@angular/core';
import { CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import * as moment from 'moment';
import { EventMainCalendar } from './eventMainCalendar.model';
import { ItemModel } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class MainCalendarService {
  dateFormat = 'YYYY-MM-DD HH:mm:ss';

  baseConfig: BaseConfigInterface = {
    dayStartHour: 7,
    dayStartMinute: 0,
    hourSegments: 4,
    dayEndHour: 24,
    dayEndMinute: 0,
    locale: 'pl',
    actualDate: new Date(),
    weekStartsOn: DAYS_OF_WEEK.MONDAY,
    precision: 'minutes',
  };

  responsives = {
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

  constructor() { }

  mapEventsToInnerModel(event: EventMainCalendar<ItemModel>): CalendarEvent<ItemModel> {
    return {
      start: moment(event.start, this.dateFormat).toDate(),
      end: moment(event.stop, this.dateFormat).toDate(),
      title: event.title,
      meta: event.data,
      color: event.state,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    };
  }

  mapEventsToOutputModel(event: CalendarEvent<ItemModel>): EventMainCalendar<ItemModel> {
    const start = moment(event.start, this.dateFormat).format(this.dateFormat);
    const end = moment(event.end, this.dateFormat).format(this.dateFormat);

    return {
      data: event.meta,
      start,
      stop: end,
      title: event.title,
      state: event.color,
    };
  }
}

export interface BaseConfigInterface {
  dayStartHour: number;
  dayStartMinute: number;
  hourSegments: number;
  dayEndHour: number;
  dayEndMinute: number;
  locale: string;
  actualDate: Date;
  weekStartsOn: DAYS_OF_WEEK;
  precision: 'minutes';
}
