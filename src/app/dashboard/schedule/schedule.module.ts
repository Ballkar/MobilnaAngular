import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { WorkComponent } from './work/work.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'angular-calendar';


@NgModule({
  declarations: [
    WorkComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule,
    CalendarModule,
  ]
})
export class ScheduleModule { }
