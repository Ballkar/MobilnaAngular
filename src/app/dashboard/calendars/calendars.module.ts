import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarsRoutingModule } from './calendars-routing.module';
import { DisplayComponent } from './display/display.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { ExampleComponent } from './example/example.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

class CustomDateFormatter extends CalendarNativeDateFormatter {
  public dayViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric'}).format(date);
  }

}
@NgModule({
  declarations: [
    DisplayComponent,
    ExampleComponent
  ],
  imports: [
    CommonModule,
    CalendarsRoutingModule,
    SharedModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter, useFactory: momentAdapterFactory
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CustomDateFormatter
      }
    }),
  ],
  entryComponents: [

  ]
})
export class CalendarsModule { }
