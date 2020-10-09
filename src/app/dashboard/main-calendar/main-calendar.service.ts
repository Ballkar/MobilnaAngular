import { Injectable } from '@angular/core';
import { DAYS_OF_WEEK } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class MainCalendarService {

  baseConfig: BaseConfigInterface = {
    dayStartHour: 8,
    dayStartMinute: 0,
    hourSegments: 4,
    dayEndHour: 19,
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
