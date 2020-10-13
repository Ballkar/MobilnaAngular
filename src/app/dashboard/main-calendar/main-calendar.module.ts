import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCalendarComponent } from './main-calendar/main-calendar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { registerLocaleData } from '@angular/common';
import localePL from '@angular/common/locales/pl';


registerLocaleData(localePL);

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

export class CustomDateFormatter extends CalendarNativeDateFormatter {
  dayViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric'}).format(date);
  }
}

@NgModule({
  declarations: [
    MainCalendarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter, useFactory: momentAdapterFactory
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CustomDateFormatter
      },
    }),
  ],
  exports: [
    MainCalendarComponent,
  ],
})
export class MainCalendarModule { }
